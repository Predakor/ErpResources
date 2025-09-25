import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'erp-login',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, FloatLabel],
  template: `
    <form [formGroup]="credentialsForm" (ngSubmit)="login()" class="flex flex-col gap-8">
      <p-floatLabel>
        <label>Email</label>
        <input pInputText id="email" type="email" formControlName="email" />
      </p-floatLabel>

      <p-floatLabel>
        <label>Password</label>
        <input pInputText id="password" type="password" formControlName="password" />
      </p-floatLabel>

      <p-button type="submit">Submit</p-button>
    </form>
  `,
})
export class Login {
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);

  credentialsForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.email, Validators.required])],
    password: [
      '',
      Validators.compose([Validators.minLength(6), Validators.maxLength(255), Validators.required]),
    ],
  });

  login() {
    if (this.credentialsForm.invalid) {
      return;
    }

    const data = this.credentialsForm.value as { email: string; password: string };

    this.authService.login(data).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err),
    });
  }
}
