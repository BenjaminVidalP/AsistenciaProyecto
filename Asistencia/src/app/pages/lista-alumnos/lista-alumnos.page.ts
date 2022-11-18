import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.page.html',
  styleUrls: ['./lista-alumnos.page.scss'],
})
export class ListaAlumnosPage implements OnInit {
  users: any=[{
    id: '',
    nombre:'',
    clave:'',
    id_rol:''
  }];

  rol: any=[{
    id_rol: '',
    nombre_rol:''
  }];

  constructor(private menu: MenuController,  private servicio: DbService) { 
    this.menu.enable(true);
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
  }

}
