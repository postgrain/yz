import { Component } from '@angular/core';
import { GameModel } from './game-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  model = new GameModel();
}
