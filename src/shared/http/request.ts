/* eslint-disable @typescript-eslint/no-namespace */

import * as express from 'express';
import * as core from 'express-serve-static-core';

declare global {
  namespace Express {
    interface Request {
      user: {
        username: string;
      };
    }
  }
}

export type Request<T = any> = express.Request<core.ParamsDictionary, any, T>;
