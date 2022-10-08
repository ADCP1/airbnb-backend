import { Router } from 'express';
import { authController } from './controller';

export function AuthRouter() {
  const router = Router();

  router.post('/', (req, res) => authController.generateNewToken(req, res));

  return router;
}
