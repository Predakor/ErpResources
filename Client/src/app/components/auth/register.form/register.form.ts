import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'erp-register-form',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="credentialsForm" (ngSubmit)="register()">
      <input id="email" type="email" formControlName="email" />
      <input id="email" type="email" formControlName="password" />

      <button type="submit">Submit</button>
    </form>
  `,
  styles: ``,
})
export class RegisterForm {
  authService = inject(AuthService);

  credentialsForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  register() {
    console.log(this.credentialsForm.value);

    const data = this.credentialsForm.value;

    if (!data.email || !data.password) {
      return;
    }

    const credentials = {
      email: data.email,
      password: data.password,
    };

    this.authService.register(credentials);
  }
}
