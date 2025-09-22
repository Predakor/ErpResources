import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  template: ` <button (click)="clickHandler()">{{ label() }}</button> `,
  styles: ``,
})
export class Button {
  label = input.required();
  clickHandler = input();
}
