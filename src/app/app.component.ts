import { fadeTransition } from './router-transitions';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeTransition]
})
export class AppComponent {
  title = 'gbtec-splash';
}
