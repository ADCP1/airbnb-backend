import { RequestDtos, ResponseDtos } from '@application/dtos';
import {
  Experience,
  ExperienceType,
  IExperienceRepository,
} from '@domain/experience';
import { IPropertyRepository, Property } from '@domain/property';
import {
  IReservationRepository,
  ReservableType,
  Reservation,
  ReservationStatus,
} from '@domain/reservation';
import { User } from '@domain/user';
import { experienceRepository } from '@infra/experience';
import { propertyRepository } from '@infra/property';
import { reservationRepository } from '@infra/reservation';
import {
  DomainException,
  NotFoundException,
  UnauthorizedException,
} from '@shared';

import { ReservationFactory } from './reservation.factory';
import { IUserService, userService } from './user.service';

interface IReservationService {
  createForProperty(
    reservationDto: RequestDtos.CreatePropertyReservationDto,
    guestEmail: string,
  ): Promise<ResponseDtos.ReservationDto>;
  createForExperience(
    reservationDto: RequestDtos.CreateExperienceReservationDto,
    guestEmail: string,
  ): Promise<ResponseDtos.ReservationDto>;
  getAvailability(
    propertyDto: RequestDtos.GetAvailabilityDto,
  ): Promise<ResponseDtos.AvailabilityDto>;
  getGuestReservations(
    guestEmail: string,
    status: string[],
    reservableType: ReservableType,
  ): Promise<ResponseDtos.ReservationDto[]>;
  getHostReservations(
    hostEmail: string,
    status: string[],
    reservableType: ReservableType,
  ): Promise<ResponseDtos.ReservationDto[]>;
  confirmHostReservation(
    reservationId: string,
    hostEmail: string,
  ): Promise<void>;
  cancelGuestReservation(id: string, email: string): Promise<void>;
  cancelHostReservation(id: string, email: string): Promise<void>;
}

class ReservationService implements IReservationService {
  private reservationRepository: IReservationRepository;
  private propertyRepository: IPropertyRepository;
  private experienceRepository: IExperienceRepository;
  private userService: IUserService;

  constructor(
    reservationRepository: IReservationRepository,
    propertyRepository: IPropertyRepository,
    experienceRepository: IExperienceRepository,
    userService: IUserService,
  ) {
    this.reservationRepository = reservationRepository;
    this.propertyRepository = propertyRepository;
    this.experienceRepository = experienceRepository;
    this.userService = userService;
  }

  public async createForProperty(
    reservationDto: RequestDtos.CreatePropertyReservationDto,
    guestEmail: string,
  ): Promise<ResponseDtos.ReservationDto> {
    const guest = await this.getUserFromEmail(guestEmail, 'Guest');
    const property = await this.getPropertyById(reservationDto.propertyId);
    if (reservationDto.amountOfGuests > property.capacity) {
      throw new DomainException(
        `Maximum property capacity is ${property.capacity}`,
      );
    }
    const reservation = new Reservation({
      ...reservationDto,
      status: ReservationStatus.Pending,
      guestId: guest.id!,
      reservableId: property.id,
      reservableType: ReservableType.Property,
    });
    await this.reservationRepository.validatePropertyAvailability(reservation);
    await this.reservationRepository.save(reservation);
    return ReservationFactory.toDto(reservation, ReservableType.Property);
  }

  public async createForExperience(
    reservationDto: RequestDtos.CreateExperienceReservationDto,
    guestEmail: string,
  ): Promise<ResponseDtos.ReservationDto> {
    const guest = await this.getUserFromEmail(guestEmail, 'Guest');
    const experience = await this.getExperienceById(
      reservationDto.experienceId,
    );
    if (
      experience.type == ExperienceType.InPlace &&
      !reservationDto.amountOfGuests
    ) {
      throw new DomainException(
        'amount_of_guests required for an in place experience',
      );
    }
    const totalAmountOfGuestsReserved =
      await this.reservationRepository.getTotalGuestAmountForReservationWithReservableId(
        reservationDto.experienceId,
      );
    const remainingExperienceCapacity =
      experience.capacity - totalAmountOfGuestsReserved;
    if (
      experience.type == ExperienceType.InPlace &&
      reservationDto.amountOfGuests! > remainingExperienceCapacity
    ) {
      throw new DomainException(`No more capacity left for this experience`);
    }

    const reservation = new Reservation({
      ...reservationDto,
      status: ReservationStatus.Pending,
      guestId: guest.id!,
      amountOfGuests: reservationDto.amountOfGuests ?? -1,
      reservableId: experience.id,
      reservableType: ReservableType.Experience,
    });
    await this.reservationRepository.save(reservation);
    return ReservationFactory.toDto(reservation, ReservableType.Experience);
  }

  public async getAvailability(
    reservationDto: RequestDtos.GetAvailabilityDto,
  ): Promise<ResponseDtos.AvailabilityDto> {
    const reservations = await this.reservationRepository.getManyByReservableId(
      reservationDto.reservableId,
      reservationDto.from,
      reservationDto.to,
    );
    const availableDates = this.parseReservationsToAvailableDates(
      reservations,
      reservationDto.from,
      reservationDto.to,
    );
    return {
      dates: availableDates,
    };
  }

  public async getGuestReservations(
    guestEmail: string,
    status: string[],
    reservableType: ReservableType,
  ): Promise<ResponseDtos.ReservationDto[]> {
    const guest = await this.getUserFromEmail(guestEmail, 'Guest');
    const reservations = await this.reservationRepository.getGuestReservations(
      guest.id!,
      status,
      reservableType,
    );

    // I'm ashamed of this code and the amount of queries it produces, but beggars cant be choosers
    return reservations.map((reservation: any) =>
      ReservationFactory.toDto(reservation, reservableType),
    );
  }

  public async getHostReservations(
    hostEmail: string,
    status: string[],
    reservableType: ReservableType,
  ): Promise<ResponseDtos.ReservationDto[]> {
    const host = await this.getUserFromEmail(hostEmail, 'Host');
    const reservables =
      reservableType === ReservableType.Property
        ? await this.propertyRepository.findByOwnerId(host.id!)
        : await this.experienceRepository.findByOwnerId(host.id!);

    const reservations = await this.reservationRepository.getReservations(
      reservables.map((reservable) => reservable.id!),
      status,
      reservableType,
    );
    return reservations.map((reservation) =>
      ReservationFactory.toDto(reservation, reservableType),
    );
  }

  public async confirmHostReservation(
    reservationId: string,
    hostEmail: string,
  ): Promise<void> {
    const reservation = await this.findById(reservationId);
    if (reservation.status !== ReservationStatus.Pending) {
      throw new DomainException(
        `Cannot confirm a reservation with status ${reservation.status}`,
      );
    }
    const host = await this.getUserFromEmail(hostEmail, 'Host');
    const reservable =
      (await this.propertyRepository.findById(reservation.reservableId)) ??
      (await this.experienceRepository.findById(reservation.reservableId));
    if (!reservable) {
      throw new NotFoundException(
        'Failed to find a property or experience for the given reservation',
      );
    }
    if (reservable.ownerId !== host.id) {
      throw new UnauthorizedException(
        'You are not the owner of the reservation reservable',
      );
    }
    await this.reservationRepository.confirm(reservation.id!);
    await this.reservationRepository.cancelPendingReservationsInBetweenDates(
      reservation.reservableId,
      reservation.startDate,
      reservation.endDate,
    );
  }

  public async cancelGuestReservation(
    id: string,
    email: string,
  ): Promise<void> {
    const reservation = await this.findById(id);
    const guest = await this.getUserFromEmail(email, 'Guest');
    if (reservation.guestId !== guest.id) {
      throw new UnauthorizedException(
        'You are not allowed to cancel this reservation',
      );
    }
    await this.reservationRepository.cancel(reservation.id!);
  }

  public async cancelHostReservation(id: string, email: string): Promise<void> {
    const reservation = await this.findById(id);
    const host = await this.getUserFromEmail(email, 'Host');
    const reservable =
      (await this.propertyRepository.findById(reservation.reservableId)) ??
      (await this.experienceRepository.findById(reservation.reservableId));
    if (!reservable) {
      throw new NotFoundException(
        'Failed to find a property or experience for the given reservation',
      );
    }
    if (reservable.ownerId !== host.id) {
      throw new UnauthorizedException(
        'You are not allowed to cancel this reservation',
      );
    }
    await this.reservationRepository.cancel(reservation.id!);
  }

  private parseReservationsToAvailableDates(
    reservations: Reservation[],
    from: Date,
    to: Date,
  ): Date[] {
    const unavailableDates = reservations.map((reservation) => {
      const dates = [];
      const currentDate = new Date(reservation.startDate);
      const lastDate = new Date(reservation.endDate);
      while (currentDate < lastDate) {
        if (currentDate >= from && currentDate <= to) {
          dates.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    });
    const availableDates = [];
    const currentDate = new Date(from);
    const lastDate = new Date(to);
    while (currentDate <= lastDate) {
      const isAvailable = unavailableDates.every((unavailableDate) => {
        return !unavailableDate.some(
          (date) => date.getTime() === currentDate.getTime(),
        );
      });
      if (isAvailable) {
        availableDates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return availableDates;
  }

  private async getUserFromEmail(
    email: string,
    userType: string,
  ): Promise<User> {
    const user = await this.userService.findFromEmail(email);
    if (!user) {
      throw new NotFoundException(`${userType} does not exist`);
    }
    return user;
  }

  private async getPropertyById(id: string): Promise<Property> {
    const property = await this.propertyRepository.findById(id);
    if (!property) {
      throw new NotFoundException('The property to be reserved does not exist');
    }
    return property;
  }

  private async getExperienceById(id: string): Promise<Experience> {
    const experience = await this.experienceRepository.findById(id);
    if (!experience) {
      throw new NotFoundException(
        'The experience to be reserved does not exist',
      );
    }
    return experience;
  }

  private async findById(id: string): Promise<Reservation> {
    const reservation = await this.reservationRepository.findById(id);
    if (!reservation) {
      throw new NotFoundException('The reservation does not exist');
    }
    return reservation;
  }
}

const reservationService: IReservationService = new ReservationService(
  reservationRepository,
  propertyRepository,
  experienceRepository,
  userService,
);

export { IReservationService, reservationService };
