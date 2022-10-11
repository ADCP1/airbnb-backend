import {
  LoginUserDto,
  RegisterUserDto,
  UpdateUserDto,
} from '@application/dtos/request';
import { registerHandler, validateDto, validateJWT } from '@shared';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { userController } from './controller';

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
  router.patch(
    '/',
    validateJWT,
    validateDto(UpdateUserDto),
    registerHandler(async (req) => ({ x: 3 })),
  );

  return router;
}
