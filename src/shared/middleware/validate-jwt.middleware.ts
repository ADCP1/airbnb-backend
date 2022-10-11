import { config } from '@config';
import { UnauthorizedException } from '@shared/exceptions';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function validateJWT(req: Request, res: Response, next: NextFunction) {
  const jwtToken = req.headers.authorization?.substring('Bearer '.length);
  if (!jwtToken) {
    throw new UnauthorizedException('Missing auth token');
  }
  try {
    const decoded = jwt.verify(jwtToken, config.tokenKey) as {
      email: string;
    };
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send('Invalid auth token');
  }
}
