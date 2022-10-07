import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

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
          errors.map(
            (error) =>
              (dtoErrors[error.property] = (Object as any).values(
                error.constraints,
              )),
          );

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
