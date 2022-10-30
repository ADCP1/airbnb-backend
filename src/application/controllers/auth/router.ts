import { CreateTokenDto } from '@application/dtos/request';
import { registerHandler, validateDto } from '@shared';
import { Router } from 'express';

import { authController } from './controller';

export function AuthRouter() {
  const router = Router();

  router.post(
    '/',
    validateDto(CreateTokenDto),
    registerHandler((req) => authController.generateNewToken(req)),
  );

  return router;
}
