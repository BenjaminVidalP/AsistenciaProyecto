import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage {

  email:FormControl = new FormControl('',[Validators.required,
    Validators.minLength(9),
    Validators.maxLength(25),
    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]);
  
  password:FormControl = new FormControl('',[Validators.required,
    Validators.minLength(5),
    Validators.maxLength(8),
  ]);
 





  constructor(private menu: MenuController) {
    this.menu.enable(false);
  }

  

  

}
