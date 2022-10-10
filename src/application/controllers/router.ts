import { Express } from 'express';

import { AuthRouter } from './auth';
import { UserRouter } from './user';

export function registerRouters(app: Express) {
  app.get('/health', (_, res) => res.status(200).send());
  app.use('/auth', AuthRouter());
  app.use('/user', UserRouter());
}
