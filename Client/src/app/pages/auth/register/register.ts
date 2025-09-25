import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormComponent } from '@components/form/form.component';
import { AuthService, Credentials } from '@services/auth.service';
import { validatePassword } from 'app/Validators/password.validator';

@Component({
  selector: 'erp-register',
  imports: [FormComponent],
  template: `
    <erp-form [formConfig]="registerForm" [onSubmit]="register">
      <ng-container form-title> Try Now </ng-container>
      <ng-container form-submit> Register </ng-container>
    </erp-form>
  `,
})
export class Register {
  formBuilder = inject(FormBuilder);
  auth = inject(AuthService);

  registerForm = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', validatePassword],
  });

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
