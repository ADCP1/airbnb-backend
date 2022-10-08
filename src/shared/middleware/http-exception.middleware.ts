import {
  DomainException,
  InternalServerException,
  NotFoundException,
  UnauthorizedException,
} from '@shared/exceptions';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function exceptionToHttpError(
  error: Error,
  req: Request,
  res: Response,
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
  } else if (error instanceof InternalServerException) {
    code = StatusCodes.INTERNAL_SERVER_ERROR;
    description = 'Internal server error';
  }
  if (!code) next(error);
  res.status(code).json({
    error: error.message,
    statusCode: code,
    description,
  });
}
