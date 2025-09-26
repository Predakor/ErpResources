import { Component } from '@angular/core';
import { shift } from '@components/shifts/shift/shift.component';

@Component({
  selector: 'erp-shifts',
  imports: [shift],
  template: `
    <h1 class="text-3xl">Shift Manager</h1>
    <div>
      <erp-shift />
    </div>
  `,
  styles: ``,
})
export class ShiftsPage {}
