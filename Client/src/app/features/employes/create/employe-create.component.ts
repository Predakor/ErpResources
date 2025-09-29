import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'app/shared/components/form/form.model';

@Component({
  selector: 'erp-employe-create',
  imports: [],
  template: ` <p>Add New Employe</p> `,
  styles: ``,
})
export class CreateEmployePage {
  fields: FieldConfig[] = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter first name',
      validator: Validators.required,
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter last name',
      validator: Validators.required,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email address',
      validator: Validators.compose([Validators.required, Validators.email])!,
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'text',
      placeholder: 'Enter phone number',
      validator: Validators.required,
    },
    {
      name: 'department',
      label: 'Department',
      type: 'text',
      placeholder: 'Enter department',
    },
    {
      name: 'position',
      label: 'Position',
      type: 'text',
      placeholder: 'Enter position',
    },
    {
      name: 'address',
      label: 'Address',
      type: 'textarea',
      placeholder: 'Enter address',
    },
  ];
}
