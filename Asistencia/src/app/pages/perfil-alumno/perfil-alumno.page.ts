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
    this.servicio.dbState().subscribe((res) => {
      if (res) {
        this.servicio.fetchUsuario().subscribe(async item => {
          this.usuario = item;
        })
      }
      this.token=localStorage.getItem('ingreso')
      console.log("Hola " + this.token)
      for (let i = 0; i < this.perfil.length; i++) {
      if(this.perfil[i].id_perfil_usuario == this.token ){
        this.id_usuario = this.perfil[i].id_usuario
        this.nombre = this.perfil[i].nombre
        this.apellido = this.perfil[i].apellido
        this.imagen = this.perfil[i].imagen
        this.correo = this.perfil[i].correo
      }
      }
    })

    }
}
