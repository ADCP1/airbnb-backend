import { RequestHandler } from 'express';
import camelcaseKeys from 'camelcase-keys';

export function snakeToCamelcaseKeys(): RequestHandler {
  return (req, _, next) => {
    req.body = camelcaseKeys(req.body, { deep: true });
    next();
  };
}
