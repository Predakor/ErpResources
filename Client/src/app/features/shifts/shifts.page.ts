import { Component } from '@angular/core';
import { shift } from 'app/features/shifts/components/shift/shift.component';

@Component({
  selector: 'erp-shifts',
  imports: [shift],
  template: `
    <h1 class="text-3xl">Shift Manager</h1>
    <div>
      <erp-shift />
    </div>
  `,
})
export class ShiftsPage {}
