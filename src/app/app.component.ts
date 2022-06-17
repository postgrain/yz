import { Component } from '@angular/core';
import { YzModel } from './yz-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  model = new YzModel();
}
