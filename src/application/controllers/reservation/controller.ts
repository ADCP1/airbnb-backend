import { RequestDtos, ResponseDtos } from '@application/dtos';
import { IReservationService, reservationService } from '@application/services';
import { Request } from '@shared';

interface IReservationController {
  create(
    req: Request<RequestDtos.CreateReservationDto>,
  ): Promise<ResponseDtos.ReservationDto>;
  getPropertyAvailability(
    req: Request<RequestDtos.GetPropertyAvailabilityDto>,
  ): Promise<ResponseDtos.PropertyAvailabilityDto>;
  getOwnReservations(req: Request): Promise<ResponseDtos.ReservationDto[]>;
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

  public async getOwnReservations(
    req: Request,
  ): Promise<ResponseDtos.ReservationDto[]> {
    return this.reservationService.getOwnReservations(req.user.email);
  }
}

const reservationController: IReservationController = new ReservationController(
  reservationService,
);

export { IReservationController, reservationController };
