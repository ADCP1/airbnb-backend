import { NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import snakecaseKeys from 'snakecase-keys';

import { Request, Response } from './http';

type ResBody = Record<string, unknown> | Record<string, unknown>[] | void;

export function registerHandler<T = Record<string, unknown>>(
  handler: (req: Request<T>) => Promise<ResBody>,
  statusCode = StatusCodes.OK,
): (
  req: Request<T>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void> {
  return async (
    req: Request<T>,
    res: Response<ResBody>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const resObject = (await handler(req)) as Record<string, unknown>;
      if (!resObject) {
        res.status(statusCode).send();
      } else {
        const snakeResObject = snakecaseKeys(resObject, {
          deep: true,
        });
        res.status(statusCode).json(snakeResObject);
      }
    } catch (error) {
      next(error);
    }
  };
}
