import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormComponent } from '@components/form/form.component';
import { FieldConfig } from '@components/form/form.model';
import { AuthService, Credentials } from '@services/auth/auth.service';
import { validatePassword } from 'app/Validators/password.validator';

@Component({
  selector: 'erp-register',
  imports: [FormComponent],
  template: `
    <erp-form [fieldsConfig]="formConfig" [onSubmit]="register">
      <ng-container form-title> Try Now </ng-container>
      <ng-container form-submit> Register </ng-container>
    </erp-form>
  `,
})
export class Register {
  auth = inject(AuthService);

  formConfig: FieldConfig[] = [
    {
      name: 'email',
      label: 'email',
      type: 'text',
      validator: Validators.compose([Validators.email, Validators.required])!,
    },
    {
      name: 'password',
      label: 'password',
      type: 'password',
      validator: validatePassword,
    },
  ];

  register = (credentials: Credentials) => {
    this.auth.register(credentials).subscribe({
      next(value) {
        console.log(value);
      },
      error(err) {
        console.error(err);
      },
    });
  };
}
