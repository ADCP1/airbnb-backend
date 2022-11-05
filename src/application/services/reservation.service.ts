import { RequestDtos, ResponseDtos } from '@application/dtos';
import { IPropertyRepository } from '@domain/property';
import { IReservationRepository, Reservation } from '@domain/reservation';
import { User } from '@domain/user';
import { propertyRepository } from '@infra/property';
import { reservationRepository } from '@infra/reservation';
import { NotFoundException } from '@shared';

import { ReservationFactory } from './reservation.factory';
import { IUserService, userService } from './user.service';

interface IReservationService {
  create(
    propertyDto: RequestDtos.CreateReservationDto,
    guestEmail: string,
  ): Promise<ResponseDtos.ReservationDto>;
  getPropertyAvailability(
    propertyDto: RequestDtos.GetPropertyAvailabilityDto,
  ): Promise<ResponseDtos.PropertyAvailabilityDto>;
}

class ReservationService implements IReservationService {
  private reservationRepository: IReservationRepository;
  private propertyRepository: IPropertyRepository;
  private userService: IUserService;

  constructor(
    reservationRepository: IReservationRepository,
    propertyRepository: IPropertyRepository,
    userService: IUserService,
  ) {
    this.reservationRepository = reservationRepository;
    this.propertyRepository = propertyRepository;
    this.userService = userService;
  }

  public async create(
    reservationDto: RequestDtos.CreateReservationDto,
    guestEmail: string,
  ): Promise<ResponseDtos.ReservationDto> {
    const guest = await this.getGuestFromEmail(guestEmail);
    const reservation = new Reservation({
      ...reservationDto,
      guestId: guest.id!,
    });
    const property = await this.propertyRepository.findById(
      reservationDto.propertyId,
    );
    if (!property) {
      throw new NotFoundException('The reservation property does not exist');
    }
    await this.reservationRepository.save(reservation);
    return ReservationFactory.toDto(reservation);
  }

  public async getPropertyAvailability(
    reservationDto: RequestDtos.GetPropertyAvailabilityDto,
  ): Promise<ResponseDtos.PropertyAvailabilityDto> {
    const reservations =
      await this.reservationRepository.getPropertyReservations(
        reservationDto.propertyId,
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
    console.log(availableDates);
    return availableDates;
  }

  private async getGuestFromEmail(email: string): Promise<User> {
    const guest = await this.userService.findFromEmail(email);
    if (!guest) {
      throw new NotFoundException('Guest does not exist');
    }
    return guest;
  }
}

const reservationService: IReservationService = new ReservationService(
  reservationRepository,
  propertyRepository,
  userService,
);

export { IReservationService, reservationService };
