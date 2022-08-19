import { Component, Input, OnInit } from '@angular/core';
import { PlayerModel } from '../player-model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input()
  player!: PlayerModel;

  constructor() { }

  ngOnInit(): void {
  }

}
