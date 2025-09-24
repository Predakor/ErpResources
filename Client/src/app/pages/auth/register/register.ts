import { Component } from '@angular/core';
import { RegisterForm } from '@components/auth/register.form/register.form';

@Component({
  selector: 'erp-register',
  imports: [RegisterForm],
  template: `
    <erp-register-form />
    <p>register works!</p>
  `,
  styles: ``,
})
export class Register {}
