import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MenuController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { TomarFotoService } from 'src/app/services/tomar-foto.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  perfils: any = {
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

  perfiles: any[] = [];
  id_perfil_usuario: number;
  id_usuario: number;
  nombrea: any;
  apellido: any;
  imagen: any;
  email: any;

  imageData: any;

  users: any;
  token: any;

  constructor(private menu: MenuController, private c:TomarFotoService, public nativeStorage: NativeStorage, private servicio: DbService, private activedRouter: ActivatedRoute, private router: Router) {
    this.activedRouter.queryParams.subscribe(param =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.id_pe = this.router.getCurrentNavigation().extras.state.id_perfilE;
        this.id_rol = this.router.getCurrentNavigation().extras.state.id_rolE;
      }
    })

}
async Entrar(){
  await this.servicio.actualizarPerfil(this.perfils.nombre, this.perfils.apellido, this.perfils.email,this.id_pe) 
  this.servicio.TraerPerfiles()
  let navigationExtras: NavigationExtras = {
    state: {
      nombrePE: this.id,
      apellidoE: this.nombre,
      emailE: this.id_rol
    }
  }

  this.servicio.dbState().subscribe((res) => {
    if (res) {
      this.servicio.fetchPerfiles().subscribe(async item => {
        this.perfiles = item;
      })
    }
    this.token=localStorage.getItem('perfiles')
    console.log("Hola " + this.token)
    for (let i = 0; i < this.perfiles.length; i++) {
    if(this.perfiles[i].id_perfil_usuario == this.token ){
      this.id_usuario = this.perfiles[i].id_usuario
      this.nombrea = this.perfiles[i].nombre
      this.apellido = this.perfiles[i].apellido
      this.imagen = this.perfiles[i].imagen
      this.email = this.perfiles[i].email
    }
    }
  })
  if(this.id_rol == 1) {
    this.router.navigate(['/perfil-profesor'], navigationExtras);
  }
  if(this.id_rol == 2) {
    this.router.navigate(['/perfil-alumno'], navigationExtras);
  }
  
  

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
