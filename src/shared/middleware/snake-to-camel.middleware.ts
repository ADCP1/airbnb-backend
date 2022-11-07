import camelcaseKeys from 'camelcase-keys';
import { RequestHandler } from 'express';

export function snakeToCamelcaseKeys(): RequestHandler {
  return (req, _, next) => {
    req.body = camelcaseKeys(req.body, { deep: true });
    next();
  };
}
