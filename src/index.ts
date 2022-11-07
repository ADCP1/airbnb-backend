import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import pino from 'express-pino-logger';
import mongoose from 'mongoose';
import pinoLogger from 'pino';

import { registerRouters } from './application/controllers';
import { config } from './config';
import { exceptionToHttpError, snakeToCamelcaseKeys } from './shared';

async function main() {
  await mongoose.connect(config.mongoUri);

  const app = express();

  app.use(pino());
  app.use(cors());
  app.use(express.json());
  app.use(snakeToCamelcaseKeys());
  registerRouters(app);
  app.use(exceptionToHttpError);

  app.listen(config.port, () => {
    const logger = pinoLogger();
    logger.info(`App listening on port ${config.port}`);
  });
}

main();
