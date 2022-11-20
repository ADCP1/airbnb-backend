import {
  CreateReservationDto,
  GetPropertyAvailabilityDto,
} from '@application/dtos/request';
import { registerHandler, Request, validateDto, validateJWT } from '@shared';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { reservationController } from './controller';

export function ReservationRouter() {
  const router = Router();
  router.post(
    '/',
    validateJWT,
    validateDto(CreateReservationDto),
    registerHandler(
      (req) => reservationController.create(req),
      StatusCodes.CREATED,
    ),
  );
  router.post(
    '/property-availability',
    validateJWT,
    validateDto(GetPropertyAvailabilityDto),
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
      (req: Request<void, any, { status: string }>) =>
        reservationController.confirmHostReservation(req),
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
