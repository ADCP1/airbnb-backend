import { CreateExperienceDto } from '@application/dtos/request';
import { registerHandler, validateDto, validateJWT } from '@shared';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { experienceController } from './controller';

export function ExperienceRouter() {
  const router = Router();
  router.post(
    '/',
    validateJWT,
    validateDto(CreateExperienceDto),
    registerHandler(
      (req) => experienceController.create(req),
      StatusCodes.CREATED,
    ),
  );
  return router;
}
