import {
  DomainException,
  InternalServerException,
  NotFoundException,
  UnauthorizedException,
} from '@shared/exceptions';
import { NextFunction, Request, Response } from 'express';

export function exceptionToHttpError(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof DomainException) {
    res.status(409).json({
      error: error.message,
      statusCode: 409,
      description: 'Invalid operation',
    });
  } else if (error instanceof NotFoundException) {
    res.status(404).json({
      error: error.message,
      statusCode: 404,
      description: 'Not found',
    });
  } else if (error instanceof UnauthorizedException) {
    res.status(401).json({
      error: error.message,
      statusCode: 401,
      description: 'Unauthorized',
    });
  } else if (error instanceof InternalServerException) {
    res.status(500).json({
      error: error.message,
      statusCode: 500,
      description: 'Internal server error',
    });
  }
  next(error);
}
