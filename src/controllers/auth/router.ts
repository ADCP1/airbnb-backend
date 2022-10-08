import { Router } from 'express';
import { registerHandler, validateDto } from '@shared';
import { authController } from './controller';
import { CreateTokenDto } from './dtos';

export function AuthRouter() {
  const router = Router();

  router.post(
    '/',
    validateDto(CreateTokenDto),
    registerHandler((req) => authController.generateNewToken(req)),
  );

  return router;
}
