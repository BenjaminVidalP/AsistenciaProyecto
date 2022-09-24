import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.page.html',
  styleUrls: ['./recuperar-contra.page.scss'],
})
export class RecuperarContraPage implements OnInit {

  constructor(private alertController: AlertController) {
    }

    async presentAlert(){
      const alert = await this.alertController.create({
        header: 'Mensaje',
        subHeader: 'Recuperar contraseña',
        message: 'Se ha enviado un correo para restablecer su contraseña',
        buttons: ['OK'],
      
    });

    await alert.present();
  }

  ngOnInit() {
  }

}
