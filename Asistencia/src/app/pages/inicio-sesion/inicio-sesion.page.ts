import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { ApiService, User } from 'src/app/services/api.service';



@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})


export class InicioSesionPage implements OnInit { 
  constructor(private menu: MenuController, private api: ApiService ) {
    this.menu.enable(false);
  
  }


  email:FormControl = new FormControl('',[Validators.required,
    Validators.minLength(9),
    Validators.maxLength(25),
    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]);
  
  password:FormControl = new FormControl('',[Validators.required,
    Validators.minLength(5),
    Validators.maxLength(8),
  ]);

  ngOnInit() {
    this.api.getPosts().subscribe((res)=>{
      console.log(res[0]);
      },(error)=>{
      console.log(error);
      });
  }
} 