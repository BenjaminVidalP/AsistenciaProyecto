import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-a',
  templateUrl: './perfil-a.page.html',
  styleUrls: ['./perfil-a.page.scss'],
})
export class PerfilAPage implements OnInit {

  constructor(private menu:MenuController) {
    this.menu.enable(true);
   }

  ngOnInit() {
  }

}
