import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MenuController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { TomarFotoService } from 'src/app/services/tomar-foto.service';

@Component({
  selector: 'app-perfil-a',
  templateUrl: './perfil-a.page.html',
  styleUrls: ['./perfil-a.page.scss'],
})
export class PerfilAPage implements OnInit {

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

  imageData: any;

  users: any;
  token: any;

  constructor(private menu: MenuController, private c:TomarFotoService, public nativeStorage: NativeStorage, private servicio: DbService, private activedRouter: ActivatedRoute, private router: Router) {
    this.menu.enable(true);
    this.activedRouter.queryParams.subscribe(param =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.id_pe = this.router.getCurrentNavigation().extras.state.idE;
        this.nombre_pe = this.router.getCurrentNavigation().extras.state.nombreE;
        this.id_rol = this.router.getCurrentNavigation().extras.state.rolE;
      }
    })
    }
    enviarDatos(){
      let navigationExtras: NavigationExtras = {
        state: {
          id_perfilE: this.id_pe,
          id_rolE: this.id_rol
        }
      }
      this.router.navigate(['/perfil'], navigationExtras);
    }

    tomarF(){
    }

  ngOnInit() {
    this.c.regresarfoto().subscribe((res) =>{
      if (res) {
        this.imageData = res;
        this.servicio.actualizarFoto(this.imageData, this.id_pe);
      }
    })
    this.servicio.dbState().subscribe((res) =>{
      if (res) {
        this.servicio.fetchPerfiles().subscribe(async item => {
          this.perfil = item;
        })
      }
      this.token=localStorage.getItem('perfiles')
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
