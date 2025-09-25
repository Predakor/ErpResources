import { ValidatorFn } from '@angular/forms';
import { TextValidatorBuilder } from './text/textValidatorBuilder';

const passwordValidator = new TextValidatorBuilder()
  .notNull()
  .withMinLength(6)
  .withMaxLength(255)
  .withUpperCase()
  .withLowerCase()
  .withNumber()
  .withSpecial();

export const validatePassword: ValidatorFn = (c) => passwordValidator.validate(c);
