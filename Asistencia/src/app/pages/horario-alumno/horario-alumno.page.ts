import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-horario-alumno',
  templateUrl: './horario-alumno.page.html',
  styleUrls: ['./horario-alumno.page.scss'],
})
export class HorarioAlumnoPage implements OnInit {

  constructor(private menu: MenuController, private router: Router) {
    this.menu.enable(false);
   }

  ngOnInit() {
  }

}
