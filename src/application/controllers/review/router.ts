import { CreateReviewDto } from '@application/dtos/request';
import { registerHandler, Request, validateDto, validateJWT } from '@shared';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { reviewController } from './controller';

export function ReviewRouter() {
  const router = Router();
  router.post(
    '/',
    validateJWT,
    validateDto(CreateReviewDto),
    registerHandler((req) => reviewController.create(req), StatusCodes.CREATED),
  );

  return router;
}
