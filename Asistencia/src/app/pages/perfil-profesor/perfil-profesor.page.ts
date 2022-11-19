import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MenuController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { TomarFotoService } from 'src/app/services/tomar-foto.service';

@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.page.html',
  styleUrls: ['../perfil-alumno/perfil-alumno.page.scss'],
})
export class PerfilProfesorPage implements OnInit {
  imageData1: any;

  users: any;

  joinrol: any;

  constructor(private menu: MenuController, private c:TomarFotoService, public nativeStorage: NativeStorage, private servicio: DbService) {
    this.menu.enable(true);
    }

    tomarF(){
    this.c.takePicture();
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
    this.servicio.dbState().subscribe((res)=>{
      if(res){
        //subscribimos al observable que hace el select en la tabla noticias
        this.servicio.fetchJoinrol().subscribe((item)=>{
          //guardamos estos cambios de información en una variable propia de este ts
          this.joinrol = item;
        })
      }
    })
    this.c.regresarfoto().subscribe((res) => {
      this.imageData1 = res;
    })
  }

}
