import { Express } from 'express';
import { AuthRouter } from './auth';

export function registerRouters(app: Express) {
  app.use('/auth', AuthRouter());
}
