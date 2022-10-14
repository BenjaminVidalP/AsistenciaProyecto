import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { ApiService, User } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';
import { Users } from 'src/app/services/users';



@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})



export class InicioSesionPage implements OnInit { 
  constructor(private menu: MenuController, private api: ApiService, private servicio: DbService) { 
    this.menu.enable(false);
    
  }

  user: any;

  email:FormControl = new FormControl('',[Validators.required,
    Validators.minLength(9),
    Validators.maxLength(25),
    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]);
  
  password:FormControl = new FormControl('',[Validators.required,
    Validators.minLength(5),
    Validators.maxLength(8),
  ]);

  ngOnInit() {
    this.api.getPosts().subscribe((user2)=>{
    
      for(var datos = 0; datos < user2.length; datos++)
      this.servicio.insertar(this.user[datos]id)
  

      },(error)=>{
      console.log(error);
      });
  }
} 