import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [],
  template: ` <h2>{{ name() }}</h2> `,
  styles: ``,
})
export class User {
  name = input('login');
}
