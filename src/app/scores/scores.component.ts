import { Component, Input, OnInit } from '@angular/core';
import { GameModel } from '../game-model';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {
  @Input()
  gameModel!: GameModel;

  ngOnInit(): void {
  }

}
