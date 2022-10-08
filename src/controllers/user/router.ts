import { Router } from 'express';
import { validateDto, validateJWT } from '@shared';
import { CreateUserDto } from './dtos';
import { userController } from './controller';

export function UserRouter() {
  const router = Router();

  router.post('/', validateDto(CreateUserDto), (req, res) =>
    userController.login(req, res),
  );
  router.delete('/', validateJWT, (req, res) =>
    userController.logout(req, res),
  );
  router.post('/register', validateDto(CreateUserDto), (req, res) =>
    userController.register(req, res),
  );

  return router;
}
