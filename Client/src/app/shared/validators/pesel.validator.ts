import { ValidatorFn } from '@angular/forms';
import { TextValidatorBuilder } from './text/textValidatorBuilder';

const onlyNumbersRegex = /^\d{11}$/;

function isValidPesel(pesel: string) {
  const digits = pesel.split('').map(parseInt);
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

  const sum = weights.reduce((acc, w, i) => acc + w * digits[i], 0);

  const checksum = digits[10];
  const validChecksum = (10 - (sum % 10)) % 10;

  return checksum === validChecksum ? null : { invalidPesel: 'Provide a correct Pesel number' };
}

const validator = new TextValidatorBuilder()
  .notNull()
  .withLength(11)
  .withPattern(onlyNumbersRegex)
  .addValidator((v) => isValidPesel(v.value));

export const validatePesel: ValidatorFn = (v) => validator.validate(v.value);
