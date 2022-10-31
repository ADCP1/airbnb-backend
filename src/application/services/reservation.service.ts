import { RequestDtos, ResponseDtos } from '@application/dtos';
import { IReservationRepository, Reservation } from '@domain/reservation';
import { User } from '@domain/user';
import { reservationRepository } from '@infra/reservation';
import { NotFoundException } from '@shared';

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

  constructor(
    reservationRepository: IReservationRepository,
    userService: IUserService,
  ) {
    this.reservationRepository = reservationRepository;
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
    //TODO: validar si la propiedad esta en uso esas fechas

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
);

export { IReservationService, reservationService };
