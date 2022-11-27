import {
  CreateExperienceDto,
  UpdateExperienceDto,
} from '@application/dtos/request';
import { registerHandler, validateDto, validateJWT } from '@shared';
import { Request } from '@shared';
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
  router.patch(
    '/:experienceId',
    validateJWT,
    validateDto(UpdateExperienceDto),
    registerHandler((req) => experienceController.partialUpdate(req)),
  );
  router.get(
    '/',
    validateJWT,
    registerHandler((req: Request<void, any, { searchText: string }>) =>
      experienceController.search(req),
    ),
  );

  router.get(
    '/owned',
    validateJWT,
    registerHandler((req) => experienceController.getUserExperiences(req)),
  );
  router.get(
    '/preview',
    registerHandler(() => experienceController.getPreview()),
  );
  router.get(
    '/:experienceId',
    registerHandler((req: Request<void, { experienceId: string }>) =>
      experienceController.get(req),
    ),
  );
  return router;
}
