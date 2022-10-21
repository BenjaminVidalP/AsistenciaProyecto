import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MenuController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { TomarFotoService } from 'src/app/services/tomar-foto.service';

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.page.html',
  styleUrls: ['./perfil-alumno.page.scss'],
})
export class PerfilAlumnoPage implements OnInit {
  imageData: any;

  constructor(private menu: MenuController, private c:TomarFotoService, public nativeStorage: NativeStorage, private servicio: DbService) {
    this.menu.enable(true);}

    tomarF(){
      this.c.takePicture();
    }

    VistaUsuario() {  
      this.servicio.buscarUsuarios
    }


  ngOnInit() {
    this.c.regresarfoto().subscribe((res) => {
      this.imageData = res;
    })
    }
}
