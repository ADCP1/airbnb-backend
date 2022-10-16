import {
  CreatePropertyDto,
  UpdatePropertyDto,
} from '@application/dtos/request';
import { registerHandler, validateDto, validateJWT } from '@shared';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { propertyController } from './controller';

export function PropertyRouter() {
  const router = Router();

  router.post(
    '/',
    validateJWT,
    validateDto(CreatePropertyDto),
    registerHandler(
      (req) => propertyController.create(req),
      StatusCodes.CREATED,
    ),
  );
  router.patch(
    '/:propertyId',
    validateJWT,
    validateDto(UpdatePropertyDto),
    registerHandler((req) => propertyController.partialUpdate(req)),
  );

  return router;
}
