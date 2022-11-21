import {
  CreateExperienceReservationDto,
  CreatePropertyReservationDto as CreatePropertyReservationDto,
  GetAvailabilityDto,
} from '@application/dtos/request';
import { registerHandler, Request, validateDto, validateJWT } from '@shared';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { reservationController } from './controller';

export function ReservationRouter() {
  const router = Router();
  router.post(
    '/property',
    validateJWT,
    validateDto(CreatePropertyReservationDto),
    registerHandler(
      (req) => reservationController.createForProperty(req),
      StatusCodes.CREATED,
    ),
  );
  router.post(
    '/experience',
    validateJWT,
    validateDto(CreateExperienceReservationDto),
    registerHandler(
      (req) => reservationController.createForExperience(req),
      StatusCodes.CREATED,
    ),
  );
  router.post(
    '/property-availability',
    validateJWT,
    validateDto(GetAvailabilityDto),
    registerHandler(
      (req) => reservationController.getPropertyAvailability(req),
      StatusCodes.OK,
    ),
  );
  router.get(
    '/own/guest',
    validateJWT,
    registerHandler(
      (req) => reservationController.getGuestReservations(req),
      StatusCodes.OK,
    ),
  );
  router.get(
    '/own/host',
    validateJWT,
    registerHandler(
      (req: Request<void, any, { status: string }>) =>
        reservationController.getHostReservations(req),
      StatusCodes.OK,
    ),
  );
  router.post(
    '/own/host/:id/confirm',
    validateJWT,
    registerHandler(
      (req) => reservationController.confirmHostReservation(req),
      StatusCodes.OK,
    ),
  );
  router.delete(
    '/own/guest/:id',
    validateJWT,
    registerHandler(
      (req) => reservationController.cancelGuestReservation(req),
      StatusCodes.OK,
    ),
  );
  router.delete(
    '/own/host/:id',
    validateJWT,
    registerHandler((req) => reservationController.cancelHostReservation(req)),
  );

  return router;
}
