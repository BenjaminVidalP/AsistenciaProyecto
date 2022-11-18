import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-horario-asig',
  templateUrl: './horario-asig.page.html',
  styleUrls: ['./horario-asig.page.scss'],
})
export class HorarioAsigPage implements OnInit {

  constructor(private menu: MenuController) {
    this.menu.enable(true);
   }

   

  ngOnInit() {
  }

}
