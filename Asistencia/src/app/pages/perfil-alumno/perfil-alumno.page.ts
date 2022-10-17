import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { TomarFotoService } from 'src/app/services/tomar-foto.service';

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.page.html',
  styleUrls: ['./perfil-alumno.page.scss'],
})
export class PerfilAlumnoPage implements OnInit {
  imageData: any;

  constructor(private menu: MenuController, private c:TomarFotoService) {
    this.menu.enable(true);}

    tomarF(){
      this.c.takePicture();
    }

  ngOnInit() {
    this.c.regresarfoto().subscribe((res) => {
      this.imageData = res;
    })
    }
}
