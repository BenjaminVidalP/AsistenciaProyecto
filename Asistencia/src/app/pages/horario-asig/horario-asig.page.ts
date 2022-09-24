import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-horario-asig',
  templateUrl: './horario-asig.page.html',
  styleUrls: ['./horario-asig.page.scss'],
})
export class HorarioAsigPage implements OnInit {

  constructor(private menu: MenuController,private router: Router) {
    this.menu.enable(true);
    this.router.navigate(['horario-asig/hpDiaLunes']);
   }

   segmentChanged($event){
    let direccion = $event.detail.value;
    console.log(direccion);
    this.router.navigate(['horario-asig/' + direccion]);
   }
   

  ngOnInit() {
  }

}
