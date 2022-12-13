import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { ApiService, User } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';
import { Users } from 'src/app/services/users';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { NavigationExtras, Router } from '@angular/router';



@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})



export class InicioSesionPage implements OnInit { 
  constructor(private menu: MenuController, private api: ApiService, private servicio: DbService, public nativeStorage: NativeStorage,private router: Router) { 
    this.menu.enable(false);
    
  }
  
  user: any;
  ramo: any;
  seccion: any;
  asigsecci: any;
  listado: any;

  luser: any = {
    nombre: "",
    clave: ""
  }

  nombre:FormControl = new FormControl('',[Validators.required,
    Validators.minLength(4),
    Validators.maxLength(10)]);
  
  clave:FormControl = new FormControl('',[Validators.required,
    Validators.minLength(5),
    Validators.maxLength(8),
  ]);

  LoginProf(){
    let navigationExtras: NavigationExtras = {
      state:{log0: this.luser.nombre, log1:this.luser.clave}
    }
    this.router.navigate(['/perfil-profesor'], navigationExtras)
  }

  LoginAlum(){
    let navigationExtras: NavigationExtras = {
      state: {log0: this.luser.nombre, log1:this.luser.clave}
    }
    this.router.navigate(['/perfil-alumno'], navigationExtras)
  }

  async ingresar(){
    const response1 = await this.servicio.ingreso(this.luser.nombre, this.luser.clave)
    response1 ? this.LoginProf(): this.nombre
    const response2 = await this.servicio.ingreso2(this.luser.nombre, this.luser.clave)
    response2 ? this.LoginAlum(): this.nombre
  }

  ngOnInit() {
    this.api.getPosts().subscribe((user2)=>{
      
      this.user = user2;
      for(var i = 0; i < this.user.length; i++){
        this.servicio.insertarUsuarios(this.user[i].id,this.user[i].nombre,this.user[i].clave,this.user[i].id_rol);
        this.servicio.actualizarIdPerfil(this.user[i].id,this.user[i].id);
        }
      },(error)=>{
      console.log(error);
      });
    this.api.getPosts1().subscribe((ramo2)=>{
      
      this.ramo = ramo2;
      for(var i = 0; i < this.ramo.length; i++){
        this.servicio.insertarRamos(this.ramo[i].id,this.ramo[i].sigla,this.ramo[i].nombre);
        }
      },(error)=>{
      console.log(error);
      });
    this.api.getPosts2().subscribe((seccion2)=>{
      
      this.seccion = seccion2;
      for(var i = 0; i < this.seccion.length; i++){
        this.servicio.insertarSecciones(this.seccion[i].id,this.seccion[i].sigla);
        }
      },(error)=>{
      console.log(error);
      });
    this.api.getPosts3().subscribe((asigsecci2)=>{
      
      this.asigsecci = asigsecci2;
      for(var i = 0; i < this.asigsecci.length; i++){
        this.servicio.insertarAsignaturaSecciones(this.asigsecci[i].id,this.asigsecci[i].id_ramo,this.asigsecci[i].id_seccion,this.asigsecci[i].id_profesor);
        }
      },(error)=>{
      console.log(error);
      });
    this.api.getPosts4().subscribe((listado2)=>{
      
      this.listado = listado2;
      for(var i = 0; i < this.listado.length; i++){
        this.servicio.insertarListados(this.listado[i].id,this.listado[i].id_estudiante,this.listado[i].id_asigsecci);
        }
      },(error)=>{
      console.log(error);
      });
  }
} 