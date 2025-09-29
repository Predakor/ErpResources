import { AbstractControl, ValidatorFn } from '@angular/forms';

export class ValidatorBuilder {
  private validators: ValidatorFn[] = [];

  public addValidator(validator: ValidatorFn) {
    if (typeof validator !== 'function') {
      throw new Error('Validator must be a function');
    }
    this.validators.push(validator);
    return this;
  }

  //return early if there is any error
  public validate(control: AbstractControl) {
    for (let i = 0; i < this.validators.length; i++) {
      const error = this.validators[i](control);
      if (error) {
        return error;
      }
    }
    return null;
  }

  public validateAll(control: AbstractControl) {
    const errors: Record<string, string>[] = [];

    this.validators.forEach((validator) => {
      const error = validator(control);
      if (error) {
        errors.push(error);
      }
    });

    return Object.keys(errors).length ? errors : null;
  }
}
