import { Component } from '@angular/core';
import { Us013Component } from './us013/us013.component';
import { US014Component } from './us014/us014.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Us013Component, US014Component],
  template: '<app-us014></app-us014>'
})
export class AppComponent {}