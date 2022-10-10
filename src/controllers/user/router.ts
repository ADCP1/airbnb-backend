import { Router } from 'express';
import { registerHandler, validateDto, validateJWT } from '@shared';
import { UserCredentialsDto, UserProfileDto } from './dtos';
import { userController } from './controller';
import { StatusCodes } from 'http-status-codes';

export function UserRouter() {
  const router = Router();

  router.post(
    '/',
    validateDto(UserCredentialsDto),
    registerHandler((req) => userController.login(req)),
  );
  router.delete(
    '/',
    validateJWT,
    registerHandler((req) => userController.logout(req)),
  );
  router.post(
    '/register',
    validateDto(UserCredentialsDto),
    registerHandler((req) => userController.register(req), StatusCodes.CREATED),
  );
  router.patch(
    '/',
    validateDto(UserProfileDto),
    registerHandler((req) => userController.update(req)),
  );

  return router;
}
