import { Component } from "@angular/core";
import { MakingAppModel } from "./making-app-model";

@Component({
  selector: 'app-making',
  templateUrl: './making-app.component.html',
  styleUrls: ['./making-app.component.scss'],
})
export class MakingAppComponent{
  model = new MakingAppModel()
  
}


