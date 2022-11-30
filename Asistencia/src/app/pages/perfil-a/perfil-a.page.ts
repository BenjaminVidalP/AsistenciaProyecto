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

  usuario: any[] = [];
  id_rol: number;
  id_pe: number;
  nombre_pe: any;


  perfiles: any[] = [];
  id_perfil_usuario: number;
  id_usuario: number;
  nombre: any;
  apellido: any;
  imagen: any;
  email: any;

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
        console.log(this.id_pe)
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
      this.c.takePicture();
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
          this.perfiles = item;
        })
      }
      this.token=localStorage.getItem('perfiles')
      console.log("Hola " + this.token)
      for (let i = 0; i < this.perfiles.length; i++) {
      if(this.perfiles[i].id_perfiles_usuario == this.token ){
        this.id_usuario = this.perfiles[i].id_usuario
        this.nombre = this.perfiles[i].nombre
        this.apellido = this.perfiles[i].apellido
        this.imagen = this.perfiles[i].imagen
        this.email = this.perfiles[i].email
      }
      }
    })
  }
 
}
