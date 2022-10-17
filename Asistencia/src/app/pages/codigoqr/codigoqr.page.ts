import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-codigoqr',
  templateUrl: './codigoqr.page.html',
  styleUrls: ['./codigoqr.page.scss'],
})
export class CodigoqrPage implements OnInit {
  myDate: String = new Date().toLocaleString();
  qrCodeString = 'Asistido:' + this.myDate;

  constructor(private menu: MenuController) {
    this.menu.enable(true);
    
    }

    
  
    ngOnInit() {
    }
  
}

