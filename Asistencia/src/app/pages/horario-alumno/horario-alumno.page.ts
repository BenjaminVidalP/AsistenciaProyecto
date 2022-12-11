import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController, MenuController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-horario-alumno',
  templateUrl: './horario-alumno.page.html',
  styleUrls: ['./horario-alumno.page.scss'],
})
export class HorarioAlumnoPage implements OnInit {

  token: any;
  usuario: any[] = [];
  id: number;
  nombre: any;
  clave:any;
  id_rol: number;


  nombre_pe: any;
  id_estudiante: any;
  id_asigsecci: any;
  sigla: any;


  constructor(private menu: MenuController,public nativeStorage:NativeStorage,private alertController : AlertController,private router : Router ,private activedRouter: ActivatedRoute,private servicio:DbService) {
    this.menu.enable(false);
   }

  ngOnInit() {
    this.servicio.dbState().subscribe((res) => {
      if (res) {
        this.servicio.fetchUsuario().subscribe(async item => {
          this.usuario = item;
        })
      }
      this.token=localStorage.getItem('ingreso')
      console.log("Hola " + this.token)
      for (let i = 0; i < this.usuario.length; i++) {
      if(this.usuario[i].nombre == this.token ){
        this.id = this.usuario[i].id_usuario
        this.nombre = this.usuario[i].nombre
        this.clave = this.usuario[i].clave
        this.id_rol = this.usuario[i].id_rol
        this.servicio.actualizarIdPerfil(this.usuario[i].id,this.usuario[i].id);
        this.servicio.Perfilusuario(this.usuario[i].id);
      }
      }
    })

  }

}
