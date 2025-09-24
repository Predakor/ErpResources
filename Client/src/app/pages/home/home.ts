import { Component } from '@angular/core';
import { Button } from '@components/button/button';
import { Counter } from '@components/counter/counter';

@Component({
  selector: 'app-home',
  imports: [Button, Counter],
  template: `
    <app-button [label]="'click'" />
    <erp-counter />
  `,
  styleUrl: './home.scss',
})
export class Home {}
