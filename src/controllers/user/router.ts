import { Router } from 'express';
import { registerHandler, validateDto, validateJWT } from '@shared';
import { CreateUserDto } from './dtos';
import { userController } from './controller';

export function UserRouter() {
  const router = Router();

  router.post(
    '/',
    validateDto(CreateUserDto),
    registerHandler((req, res) => userController.login(req, res)),
  );
  router.delete(
    '/',
    validateJWT,
    registerHandler((req, res) => userController.logout(req, res)),
  );
  router.post(
    '/register',
    validateDto(CreateUserDto),
    registerHandler((req, res) => userController.register(req, res)),
  );

  return router;
}
