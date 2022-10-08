import { NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from './http';

export function registerHandler<T, U>(
  handler: (req: Request<T>) => Promise<U>,
  statusCode = StatusCodes.OK,
): (req: Request<T>, res: Response<U>, next: NextFunction) => Promise<void> {
  return async (
    req: Request<T>,
    res: Response<U>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const resObject = await handler(req);
      if (!resObject) res.status(statusCode).send();
      res.status(statusCode).json(resObject);
    } catch (error) {
      next(error);
    }
  };
}
