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
        this.servicio.insertar(this.user[i].id,this.user[i].nombre,this.user[i].clave,this.user[i].id_rol);
        }
      },(error)=>{
      console.log(error);
      });
  }
} 