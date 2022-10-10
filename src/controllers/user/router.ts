import { Router } from 'express';
import { registerHandler, validateDto, validateJWT } from '@shared';
import { LoginUserDto, RegisterUserDto } from './dtos';
import { userController } from './controller';
import { StatusCodes } from 'http-status-codes';

export function UserRouter() {
  const router = Router();

  router.post(
    '/',
    validateDto(LoginUserDto),
    registerHandler((req) => userController.login(req)),
  );
  router.delete(
    '/',
    validateJWT,
    registerHandler((req) => userController.logout(req)),
  );
  router.post(
    '/register',
    validateDto(RegisterUserDto),
    registerHandler((req) => userController.register(req), StatusCodes.CREATED),
  );

  return router;
}
