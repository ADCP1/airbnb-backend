import {
  CreateReservationDto,
  GetPropertyAvailabilityDto,
} from '@application/dtos/request';
import { registerHandler, validateDto, validateJWT } from '@shared';
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
    '/own',
    validateJWT,
    registerHandler(
      (req) => reservationController.getOwnReservations(req),
      StatusCodes.OK,
    ),
  );
  router.delete(
    'own/:id',
    validateJWT,
    registerHandler(
      (req) => reservationController.deleteOwnReservation(req),
      StatusCodes.OK,
    ),
  );
  return router;
}
