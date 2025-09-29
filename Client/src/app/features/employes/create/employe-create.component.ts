import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'app/shared/components/form/form.model';
import { FormComponent } from 'app/shared/components/form/form.component';
import { validatePesel } from '@validators/pesel.validator';

@Component({
  selector: 'erp-employe-create',
  imports: [FormComponent],
  template: ` <erp-form [fieldsConfig]="fields" [onSubmit]="submit"></erp-form> `,
})
export class CreateEmployePage {
  fields: FieldConfig[] = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
    },
    {
      name: 'pesel',
      label: 'Pesel',
      type: 'text',
      validator: validatePesel,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      validator: Validators.email,
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'text',
    },

    {
      name: 'department',
      label: 'Department',
      type: 'text',
    },
    {
      name: 'position',
      label: 'Position',
      type: 'text',
    },

    {
      name: 'address',
      label: 'Address',
      type: 'text',
    },
    {
      name: 'streetName',
      label: 'Street name',
      type: 'text',
    },
    {
      name: 'streetNumber',
      label: 'Street Number',
      type: 'number',
    },
    {
      name: 'localNumber',
      label: 'Local Number',
      type: 'number',
      optional: true,
    },
  ];

  submit = (d: any) => {
    
    console.log(d);
  };
}
