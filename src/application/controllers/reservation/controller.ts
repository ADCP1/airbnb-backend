import { RequestDtos, ResponseDtos } from '@application/dtos';
import { IReservationService, reservationService } from '@application/services';
import { Request } from '@shared';

interface IReservationController {
  create(
    req: Request<RequestDtos.CreateReservationDto>,
  ): Promise<ResponseDtos.ReservationDto>;
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
}

const reservationController: IReservationController = new ReservationController(
  reservationService,
);

export { IReservationController, reservationController };
