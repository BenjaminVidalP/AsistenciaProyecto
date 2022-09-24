import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  hide = true;
nombre: string;

usuario={
  email:'',
  password:''
};



  constructor(private menu: MenuController) {
    this.menu.enable(false);
  }

  ngOnInit() {
  }

  onSubmitTemplate(){
    console.log('Form submit')
    console.log(this.usuario);
  }

}
