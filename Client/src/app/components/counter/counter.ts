import { Component, signal } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'erp-counter',
  imports: [Button],
  template: `
    <h3>
      {{ value() }}
    </h3>
    <button (click)="increment()">Increase</button>
    <button (click)="decrement()">Decrease</button>
    <app-button [label]="'Decrease'" />
  `,
  styles: ``,
})
export class Counter {
  value = signal(0);

  increment() {
    this.modifyValue(1);
  }

  decrement() {
    this.modifyValue(-1);
  }

  modifyValue(value: number) {
    this.value.update((v) => v + value);
  }
}
