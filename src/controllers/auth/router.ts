import { registerHandler } from '@shared';
import { Router } from 'express';
import { authController } from './controller';

export function AuthRouter() {
  const router = Router();

  router.post(
    '/',
    registerHandler((req, res) => authController.generateNewToken(req, res)),
  );

  return router;
}
