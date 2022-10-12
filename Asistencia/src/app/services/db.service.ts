import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  //variable para la sentencia de creacion de tablas
  Users: string = "CREATE TABLE IF NOT EXISTS noticia(id INTEGER PRIMARY KEY autoincrement, email VARCHAR(30) NOT NULL, clave TEXT NOT NULL);";
  //variable para el insert de la tabla
  registroNoticia: string = "INSERT or IGNORE INTO noticia(id,email,clave) VALUES (1,'man.collao@duocuc.cl','12345678');";

  //variable que manipule la conexion a BD
  public database: SQLiteObject;

  //variables para observables
  listaNoticias = new BehaviorSubject([]);
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
        name: 'bdnoticias.db',
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
      await this.database.executeSql(this.tablaNoticia, []);

      //ejecuto los insert
      await this.database.executeSql(this.registroNoticia, []);

      //llamo al observable de carga de datos
      this.buscarNoticias();
      //modificar el observable de el status de la BD
      this.isDBReady.next(true);

    } catch (e) {
      this.presentAlert("Error creación Tabla: " + e);
    }
  }

  
}
