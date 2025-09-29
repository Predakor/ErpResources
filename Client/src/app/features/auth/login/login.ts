import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from 'app/shared/components/form/form.component';
import { FieldConfig } from 'app/shared/components/form/form.model';
import { AuthService, Credentials } from 'app/shared/services/auth/auth.service';
import { validatePassword } from 'app/shared/validators/password.validator';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'erp-login',
  imports: [ReactiveFormsModule, ButtonModule, FormComponent],
  template: `
    <erp-form [fieldsConfig]="formConfig" [onSubmit]="handleLogin">
      <ng-container form-title>Welcome back</ng-container>
      <ng-container form-submit>login</ng-container>
    </erp-form>
  `,
})
export class Login {
  authService = inject(AuthService);

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

  handleLogin = (credentials: Credentials) => {
    this.authService.login(credentials);
  };
}
