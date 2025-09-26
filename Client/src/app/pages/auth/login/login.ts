import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '@components/form/form.component';
import { AuthService, Credentials } from '@services/auth.service';
import { validatePassword } from 'app/Validators/password.validator';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'erp-login',
  imports: [ReactiveFormsModule, ButtonModule, FormComponent],
  template: `
    <erp-form [formConfig]="credentialsForm" [onSubmit]="handleLogin">
      <ng-container form-title>Welcome back</ng-container>
      <ng-container form-submit>login</ng-container>
    </erp-form>
  `,
})
export class Login {
  authService = inject(AuthService);
  formBuilder = inject(NonNullableFormBuilder);

  credentialsForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.email, Validators.required])],
    password: ['', validatePassword],
  });

  handleLogin = (credentials: Credentials) => {
    this.authService.login(credentials);
  };
}
