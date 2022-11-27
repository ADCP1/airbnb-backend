import { CreateReviewDto } from '@application/dtos/request';
import { registerHandler, validateDto, validateJWT } from '@shared';
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

  router.get(
    '/property/:propertyId',
    registerHandler((req) => reviewController.getPropertyReviews(req)),
  );

  router.get(
    'experience/:experienceId',
    registerHandler((req) => reviewController.getExperienceReviews(req)),
  );

  router.get(
    'host/:hostId',
    registerHandler((req) => reviewController.getHostReviews(req)),
  );

  router.get(
    'guest/:guestId',
    registerHandler((req) => reviewController.getGuestReviews(req)),
  );

  router.patch(
    '/:reviewId',
    validateJWT,
    registerHandler((req) => reviewController.partialUpdate(req)),
  );

  router.delete(
    '/:reviewId',
    validateJWT,
    registerHandler(
      (req) => reviewController.delete(req),
      StatusCodes.NO_CONTENT,
    ),
  );

  return router;
}
