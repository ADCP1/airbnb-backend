import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsAfterNowConstraint implements ValidatorConstraintInterface {
  validate(date: Date | null) {
    if (!date) return false;
    return Date.now() < date.getTime();
  }

  defaultMessage(args: ValidationArguments) {
    return `Date ${args.property} can not be before now.`;
  }
}

@ValidatorConstraint()
export class IsBeforeNowConstraint implements ValidatorConstraintInterface {
  validate(date: Date | null) {
    if (!date) return false;
    return Date.now() > date.getTime();
  }

  defaultMessage(args: ValidationArguments) {
    return `Date ${args.property} can not be after now.`;
  }
}

@ValidatorConstraint()
export class IsAfterDateArgConstraint implements ValidatorConstraintInterface {
  validate(date: Date | null, args: ValidationArguments) {
    const object: any = args.object;
    const dateArg = object[args.constraints[0]];
    if (!date || !dateArg) return false;
    return dateArg.getTime() < date.getTime();
  }

  defaultMessage(args: ValidationArguments) {
    return `Date ${args.property} can not be before ${args.constraints[0]}.`;
  }
}
