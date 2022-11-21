import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MenuController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { TomarFotoService } from 'src/app/services/tomar-foto.service';

@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.page.html',
  styleUrls: ['./perfil-profesor.page.scss'],
})
export class PerfilProfesorPage implements OnInit {


  perfiles: any = {
    nombre:'',
    apellido:'',
    email:''
  };
  usuario: any[] = [];
  id: number;
  id_pe: number;
  nombre_pe: any;
  nombre: any;
  clave: any;
  id_rol: number;

  perfil: any[] = [];
  id_perfil_usuario: number;
  id_usuario: number;
  nombrea: any;
  apellido: any;
  imagen: any;
  correo: any;
  token: any;

  imageData: any;

  users: any;


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