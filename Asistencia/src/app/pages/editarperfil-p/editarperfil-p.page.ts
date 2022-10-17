import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-editarperfil-p',
  templateUrl: './editarperfil-p.page.html',
  styleUrls: ['./editarperfil-p.page.scss'],
})
export class EditarperfilPPage implements OnInit {

  constructor(private menu: MenuController) {
    this.menu.enable(false);
   }

  ngOnInit() {
  }

}
