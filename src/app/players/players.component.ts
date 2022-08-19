import { Component, Input, OnInit } from '@angular/core';
import { GameModel } from '../game-model';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  @Input()
  gameModel!: GameModel;

  ngOnInit(): void {
  }
}
