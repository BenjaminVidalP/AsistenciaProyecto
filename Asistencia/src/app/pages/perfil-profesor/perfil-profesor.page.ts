import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { TomarFotoService } from 'src/app/services/tomar-foto.service';

@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.page.html',
  styleUrls: ['../perfil-alumno/perfil-alumno.page.scss'],
})
export class PerfilProfesorPage implements OnInit {
  imageData: any;

  constructor(private menu: MenuController, private c:TomarFotoService) {
    this.menu.enable(true);
   }

   tomarF(){
    this.c.takePicture();
   }

  ngOnInit() {
    this.c.regresarfoto().subscribe((res) => {
      this.imageData = res;
    })
  }

}
