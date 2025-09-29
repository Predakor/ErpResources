import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormComponent } from 'app/shared/components/form/form.component';
import { FieldConfig } from 'app/shared/components/form/form.model';
import { Shift } from '../shift/shift.component';

@Component({
  selector: 'erp-add-shift',
  imports: [FormComponent],
  template: `
    <erp-form [fieldsConfig]="fieldsConfig" [onSubmit]="submitShift">
      <ng-container form-title> Add Shift</ng-container>
    </erp-form>
  `,
})
export class AddShift {
  api = inject(HttpClient);

  fieldsConfig: FieldConfig[] = [
    { name: 'employeId', label: 'Employe', type: 'text' },
    { name: 'startTime', label: 'Start', type: 'date' },
    { name: 'endTime', label: 'End', type: 'date' },
    { name: 'position', label: 'position', type: 'text' },
  ];

  submitShift = (data: Shift) => {
    this.api
      .post('timeshifts', {
        ...data,
        employeId: 'A5F8021A-0C68-444C-A4FF-05DC2A1474CF',
        startTime: data.startTime.toISOString(),
        endTime: data.endTime.toISOString(),
      })
      .subscribe({ next: (d) => console.log(d), error: (err) => console.error(err) });
  };
}
