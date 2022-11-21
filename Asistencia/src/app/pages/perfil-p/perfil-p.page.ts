import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-p',
  templateUrl: './perfil-p.page.html',
  styleUrls: ['./perfil-p.page.scss'],
})
export class PerfilPPage implements OnInit {

  constructor(private menu:MenuController) {
    this.menu.enable(true);
   }

  ngOnInit() {
  }

}
