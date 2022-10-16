import { Express } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AuthRouter } from './auth';
import { UserRouter } from './user';

export function registerRouters(app: Express) {
  app.get('/health', (_, res) => res.status(StatusCodes.OK).send());
  app.use('/auth', AuthRouter());
  app.use('/user', UserRouter());
}
