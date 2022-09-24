import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.page.html',
  styleUrls: ['../perfil-alumno/perfil-alumno.page.scss'],
})
export class PerfilProfesorPage implements OnInit {

  constructor(private menu: MenuController) {
    this.menu.enable(true);
   }

  ngOnInit() {
  }

}
