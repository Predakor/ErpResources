import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AddShift } from '../add-shift/add-shift.component';

@Component({
  selector: 'erp-shift',
  imports: [TableModule, AddShift],
  template: `
    <p-table [value]="shifts()">
      <ng-template #header>
        <tr>
          <th>Employe</th>
          <th>Start</th>
          <th>End</th>
          <th>Position</th>
        </tr>
      </ng-template>
      <ng-template #body let-shift>
        <tr>
          <td>{{ shift.employeId }}</td>
          <td>{{ shift.startTime }}</td>
          <td>{{ shift.endTime }}</td>
          <td>{{ shift.position }}</td>
        </tr>
      </ng-template>
    </p-table>
    <erp-add-shift />
  `,
})
export class shift implements OnInit {
  api = inject(HttpClient);
  shifts = signal<Shift[]>([]);
  ngOnInit(): void {
    this.api.get<Shift[]>('timeshifts').subscribe({
      next: (v) => this.shifts.set(v),
      error: console.error,
    });
  }
}

export type Shift = {
  id: string;
  startTime: Date;
  endTime: Date;
  employeId: string;
  position: string;
};
