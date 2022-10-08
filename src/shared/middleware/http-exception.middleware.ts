import {
  DomainException,
  NotFoundException,
  UnauthorizedException,
} from '@shared/exceptions';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// Don't remove the next parameter, otherwise the middleware is ignored by Express

export function exceptionToHttpError(
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  let code: number;
  let description: string;

  if (error instanceof DomainException) {
    code = StatusCodes.CONFLICT;
    description = 'Invalid operation';
  } else if (error instanceof NotFoundException) {
    code = StatusCodes.NOT_FOUND;
    description = 'Not found';
  } else if (error instanceof UnauthorizedException) {
    code = StatusCodes.UNAUTHORIZED;
    description = 'Unauthorized';
  } else {
    code = StatusCodes.INTERNAL_SERVER_ERROR;
    description = 'Internal server error';
  }

  res.status(code).json({
    error: error.message,
    statusCode: code,
    description,
  });
}
