import { ValidatorBuilder } from '../validatorBuilder';
import textRules from './textRules';

export class TextValidatorBuilder extends ValidatorBuilder {
  withMinLength(minLength: number) {
    const rule = textRules.hasMinLength(minLength);
    return this.addValidator((v) => rule(v.value));
  }

  withMaxLength(maxLength: number) {
    const rule = textRules.hasMaxLength(maxLength);
    return this.addValidator((v) => rule(v.value));
  }

  withUpperCase() {
    return this.addValidator((c) => textRules.hasUpperCase(c.value));
  }

  withLowerCase() {
    return this.addValidator((c) => textRules.hasLowerCase(c.value));
  }

  withNumber() {
    return this.addValidator((c) => textRules.hasNumber(c.value));
  }

  withSpecial() {
    return this.addValidator((c) => textRules.hasSpecial(c.value));
  }

  notNull() {
    return this.addValidator((c) => textRules.notNull(c.value));
  }
}
