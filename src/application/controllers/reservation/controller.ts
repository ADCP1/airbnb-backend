import { RequestDtos, ResponseDtos } from '@application/dtos';
import { IReservationService, reservationService } from '@application/services';
import { getReservationStatusIn } from '@domain/reservation';
import { Request } from '@shared';

interface IReservationController {
  create(
    req: Request<RequestDtos.CreateReservationDto>,
  ): Promise<ResponseDtos.ReservationDto>;
  getPropertyAvailability(
    req: Request<RequestDtos.GetPropertyAvailabilityDto>,
  ): Promise<ResponseDtos.PropertyAvailabilityDto>;
  getGuestReservations(req: Request): Promise<ResponseDtos.ReservationDto[]>;
  getHostReservations(req: Request): Promise<ResponseDtos.ReservationDto[]>;
  cancelGuestReservation(req: Request): Promise<void>;
  cancelHostReservation(req: Request): Promise<void>;
}

class ReservationController implements IReservationController {
  private reservationService: IReservationService;

  constructor(reservationService: IReservationService) {
    this.reservationService = reservationService;
  }

  public async create(
    req: Request<RequestDtos.CreateReservationDto>,
  ): Promise<ResponseDtos.ReservationDto> {
    return this.reservationService.create(req.body, req.user.email);
  }

  public async getPropertyAvailability(
    req: Request<RequestDtos.GetPropertyAvailabilityDto>,
  ): Promise<ResponseDtos.PropertyAvailabilityDto> {
    return this.reservationService.getPropertyAvailability(req.body);
  }

  public async getGuestReservations(
    req: Request,
  ): Promise<ResponseDtos.ReservationDto[]> {
    const status = getReservationStatusIn(req.query.status as string);
    return this.reservationService.getGuestReservations(req.user.email, status);
  }

  public async getHostReservations(
    req: Request,
  ): Promise<ResponseDtos.ReservationDto[]> {
    const status = getReservationStatusIn(req.query.status as string);
    return this.reservationService.getHostReservations(req.user.email, status);
  }

  public async cancelGuestReservation(req: Request): Promise<void> {
    return this.reservationService.cancelGuestReservation(
      req.params.id,
      req.user.email,
    );
  }

  public async cancelHostReservation(req: Request): Promise<void> {
    return this.reservationService.cancelHostReservation(
      req.params.id,
      req.user.email,
    );
  }
}

const reservationController: IReservationController = new ReservationController(
  reservationService,
);

export { IReservationController, reservationController };
