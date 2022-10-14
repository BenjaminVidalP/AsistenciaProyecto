import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  //variable para la sentencia de creacion de tablas
  User: string = "CREATE TABLE IF NOT EXISTS Users(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(30) NOT NULL, clave VARCHAR(9) NOT NULL);";
  //variable para el insert de la tabla


  //variable que manipule la conexion a BD
  public database: SQLiteObject;

  //variables para observables
  listaUsers = new BehaviorSubject([]);
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
    this.crearBD(); 
  }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Importante',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  crearBD() {
    //verificamos que la plataforma este lista
    this.platform.ready().then(() => {
      //creamos la BD
      this.sqlite.create({
        name: 'bdUsers.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        //llamar a la funcion para crear las tablas
        this.crearTablas();
      }).catch(e => {
        this.presentAlert("Error creación BD: " + e);
      })


    })
  }
  
  async crearTablas() {
    try {
      //ejecuto creacion de tablas
      await this.database.executeSql(this.User, []);

      //modificar el observable de el status de la BD
      this.isDBReady.next(true);

    } catch (e) {
      this.presentAlert("Error creación Tabla: " + e);
    }
  }

  dbState() {
    return this.isDBReady.asObservable();
  }

  fetchUsuario(): Observable<Users[]> {
    return this.listaUsers.asObservable();
  }

  insertar(id,nombre,clave,rol){
    let data=[id,nombre,clave,rol];
    this.database.executeSql('INSERT INTO Users VALUES(id,nombre,clave,id_rol) values (?,?,?,?)',data).then(() =>{
      console.log("Insert ejecutado")
    }).catch( e => console.log(e) ); 
  }
  
}

