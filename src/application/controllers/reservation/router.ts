import { CreateReservationDto } from '@application/dtos/request';
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
  return router;
}
