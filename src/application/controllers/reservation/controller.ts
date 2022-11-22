import { RequestDtos, ResponseDtos } from '@application/dtos';
import { IReservationService, reservationService } from '@application/services';
import { getReservationStatusIn, ReservableType } from '@domain/reservation';
import { Request } from '@shared';

interface IReservationController {
  createForProperty(
    req: Request<RequestDtos.CreatePropertyReservationDto>,
  ): Promise<ResponseDtos.ReservationDto>;
  createForExperience(
    req: Request<RequestDtos.CreateExperienceReservationDto>,
  ): Promise<ResponseDtos.ExperienceReservationDto>;
  getPropertyAvailability(
    req: Request<RequestDtos.GetAvailabilityDto>,
  ): Promise<ResponseDtos.AvailabilityDto>;
  getGuestReservations(
    req: Request,
    reservableType: ReservableType,
  ): Promise<ResponseDtos.ReservationDto[]>;
  getHostReservations(
    req: Request,
    reservableType: ReservableType,
  ): Promise<ResponseDtos.ReservationDto[]>;
  confirmHostReservation(req: Request): Promise<void>;
  cancelGuestReservation(req: Request): Promise<void>;
  cancelHostReservation(req: Request): Promise<void>;
}

class ReservationController implements IReservationController {
  private reservationService: IReservationService;

  constructor(reservationService: IReservationService) {
    this.reservationService = reservationService;
  }

  public async createForProperty(
    req: Request<RequestDtos.CreatePropertyReservationDto>,
  ): Promise<ResponseDtos.ReservationDto> {
    return this.reservationService.createForProperty(req.body, req.user.email);
  }

  public async createForExperience(
    req: Request<RequestDtos.CreateExperienceReservationDto>,
  ): Promise<ResponseDtos.ExperienceReservationDto> {
    return this.reservationService.createForExperience(
      req.body,
      req.user.email,
    );
  }

  public async getPropertyAvailability(
    req: Request<RequestDtos.GetAvailabilityDto>,
  ): Promise<ResponseDtos.AvailabilityDto> {
    return this.reservationService.getAvailability(req.body);
  }

  public async getGuestReservations(
    req: Request,
    reservableType: ReservableType,
  ): Promise<ResponseDtos.ReservationDto[]> {
    const status = getReservationStatusIn(req.query.status as string);
    return this.reservationService.getGuestReservations(
      req.user.email,
      status,
      reservableType,
    );
  }

  public async confirmHostReservation(req: Request): Promise<void> {
    return this.reservationService.confirmHostReservation(
      req.params.id,
      req.user.email,
    );
  }

  public async getHostReservations(
    req: Request,
    reservableType: ReservableType,
  ): Promise<ResponseDtos.ReservationDto[]> {
    const status = getReservationStatusIn(req.query.status as string);
    return this.reservationService.getHostReservations(
      req.user.email,
      status,
      reservableType,
    );
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
