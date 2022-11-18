import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-editarperfil-p',
  templateUrl: './editarperfil-p.page.html',
  styleUrls: ['./editarperfil-p.page.scss'],
})
export class EditarperfilPPage implements OnInit {
  composer: any;

  constructor(private menu: MenuController, private emailComposer: EmailComposer) {
    this.menu.enable(false);
   }

   OpenEmail()
   {
    this.composer.open({
      to:'benja@gmail.com',
      cc: 'profe@gmail.com',
      subject: ' Confirmacion Asistencia',
      body:'Usted ha quedado Presente',
    })
   }


  ngOnInit() {
  }

}
