import { Express } from 'express';
import { AuthRouter } from './auth';

export function registerRouters(app: Express) {
  app.get('/health', (_, res) => res.send());
  app.use('/auth', AuthRouter());
}
