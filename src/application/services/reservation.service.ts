import { RequestDtos, ResponseDtos } from '@application/dtos';
import { IReservationRepository, Reservation } from '@domain/reservation';
import { User } from '@domain/user';
import { reservationRepository } from '@infra/reservation';
import { NotFoundException } from '@shared';

import { IPropertyService, propertyService } from './property.service';
import { ReservationFactory } from './reservation.factory';
import { IUserService, userService } from './user.service';

interface IReservationService {
  create(
    propertyDto: RequestDtos.CreateReservationDto,
    guestEmail: string,
  ): Promise<ResponseDtos.ReservationDto>;
}

class ReservationService implements IReservationService {
  private reservationRepository: IReservationRepository;
  private userService: IUserService;
  private propertyService: IPropertyService;

  constructor(
    reservationRepository: IReservationRepository,
    userService: IUserService,
    propertyService: IPropertyService,
  ) {
    this.reservationRepository = reservationRepository;
    this.userService = userService;
    this.propertyService = propertyService;
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
    await propertyService.getById(reservation.propertyId);
    await this.reservationRepository.save(reservation);
    return ReservationFactory.toDto(reservation);
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
  userService,
  propertyService,
);

export { IReservationService, reservationService };
