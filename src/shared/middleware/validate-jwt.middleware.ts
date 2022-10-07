import { Request, Response, NextFunction } from 'express';
import { config } from '@config';
import jwt from 'jsonwebtoken';

export function validateJWT(req: Request, res: Response, next: NextFunction) {
  const jwtToken = req.headers.authorization?.substring('Bearer '.length);
  if (!jwtToken) {
    res.status(401).send('Missing auth token');
  } else {
    try {
      const decoded = jwt.verify(jwtToken, config.tokenKey) as {
        username: string;
      };
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).send('Invalid auth token');
    }
  }
}
