import { HttpClient, HttpContext } from '@angular/common/http';
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
        </tr>
      </ng-template>
      <ng-template #body let-product>
        <tr>
          <td>{{ product.code }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.quantity }}</td>
        </tr>
      </ng-template>
    </p-table>
    <erp-add-shift />
  `,
  styles: ``,
})
export class shift implements OnInit {
  api = inject(HttpClient);
  shifts = signal<shift[]>([]);
  ngOnInit(): void {
    this.api.get<shift[]>('timeshifts').subscribe({
      next: this.shifts,
      error: console.error,
    });
  }
}

export type Shift = {
  id: string;
  start: Date;
  end: Date;
  employeId: string;
  role: string;
};
