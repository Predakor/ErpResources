import { ValidatorFn } from '@angular/forms';
import { TextValidatorBuilder } from './text/textValidatorBuilder';

const streetNameRegex = /^[\p{L}\d&\/'-]+( [\p{L}\d&\/'-]+)*$/u;
const validator = new TextValidatorBuilder()
  .notNull()
  .withMinLength(2)
  .withMaxLength(255)
  .withPattern(streetNameRegex);

export const validateStreetName: ValidatorFn = (v) => validator.validate(v.value);
