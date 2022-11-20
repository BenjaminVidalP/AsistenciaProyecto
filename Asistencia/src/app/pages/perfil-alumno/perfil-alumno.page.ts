import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
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

  users: any;


  constructor(private menu: MenuController, private c:TomarFotoService, public nativeStorage: NativeStorage, private servicio: DbService, private navigationExtras: NavigationExtras, private activedRouter: ActivatedRoute, private router: Router) {

    this.menu.enable(true);}

    tomarF(){
      this.c.takePicture();
    }

    VistaUsuario() {  
      this.servicio.buscarUsuarios
    }


  ngOnInit() {
    this.servicio.dbState().subscribe((res)=>{
      if(res){
        //subscribimos al observable que hace el select en la tabla noticias
        this.servicio.fetchUsuario().subscribe((item)=>{
          //guardamos estos cambios de información en una variable propia de este ts
          this.users = item;
        })
      }
    })


    this.c.regresarfoto().subscribe((res) => {
      this.imageData = res;
    })
    }
}
