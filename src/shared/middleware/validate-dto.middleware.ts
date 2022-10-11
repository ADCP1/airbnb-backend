import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';

const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

function mapError(
  error: ValidationError,
  dtoErrors: Record<string, unknown>,
  prefix?: string,
) {
  if (error.children?.length > 0) {
    error.children.forEach((childError) =>
      mapError(childError, dtoErrors, error.property),
    );
  } else {
    const errorProperty = prefix
      ? `${prefix}.${error.property}`
      : error.property;
    dtoErrors[camelToSnakeCase(errorProperty)] = (Object as any).values(
      error.constraints,
    );
  }
}

export function validateDto(
  type: any,
  skipMissingProperties = false,
): RequestHandler {
  return (req, res, next) => {
    const dtoObject = plainToInstance(type, req.body);

    validate(dtoObject, { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const dtoErrors: Record<string, unknown> = {};
          errors.forEach((error) => mapError(error, dtoErrors));
          res.setHeader('Content-Type', 'application/json');
          res.status(400).send(JSON.stringify(dtoErrors));
        } else {
          req.body = dtoObject;
          next();
        }
      },
    );
  };
}
