import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from './users';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Ramos } from './ramos';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  //variable para la sentencia de creacion de tablas
  Rol: string = "CREATE TABLE IF NOT EXISTS rol (id_rol INTEGER PRIMARY KEY autoincrement, nombre_rol VARCHAR(30) NULL);";
  User: string = "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(30) NOT NULL, clave VARCHAR(30) NOT NULL, id_rol NUMBER NOT NULL);";
  Ramos: string = "CREATE TABLE IF NOT EXISTS ramos(id_ramo INTEGER PRIMARY KEY autoincrement, sigla VARCHAR(30) NOT NULL, nombre VARCHAR(50), NOT NULL);";
  Seccion: string = "CREATE TABLE IF NOT EXIST seccion(id_seccion INTEGER PRIMARY KEY autoincrement, sigla VARCHAR(15) NOT NULL);";
  Asigsecci: string = "CREATE TABLE IF NOT EXIST asigsecci(id_asigsecci INTEGER PRIMARY KEY autoincrement, id_ramo NUMBER NOT NULL, id_seccion NUMBER NOT NULL, id_profesor NOT NULL);";
  Listado: string = "CREATE TABLE IF NOT EXISTS listado(id_listado INTEGER PRIMARY KEY autoincrement, id_estudiante NUMBER NOT NULL, id_asigsecci NUMBER NOT NULL);";
  Asistencia: string = "CREATE TABLE IF NOT EXISTS asistencia(id_asistencia INTEGER PRIMARY KEY autoincrement, fecha DATE NOT NULL,qr VARCHAR (40) NOT NULL, hora_ini VARCHAR(10) NOT NULL, hora_fin VARCHAR (10) NOT NULL);";
  Detalle: string = "CREATE TABLE IF NOT EXISTS detalle_asist(id_detalle INTEGER PRIMARY KEY autoincrement, estado VARCHAR (12) NOT NULL );";
  
  //variable para el insert de la tabla

  //variable que manipule la conexion a BD
  public database: SQLiteObject;

  //variables para observables
  listaUsers = new BehaviorSubject([]);
  listaRamos = new BehaviorSubject([])
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController,  public nativeStorage: NativeStorage) {
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
        name: 'bdusuarios.db',
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
      await this.database.executeSql(this.User,[]);
      this.buscarUsuarios();
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

  fetchRamos(): Observable<Ramos[]> {
    return this.listaRamos.asObservable();
  }


  ingreso(nombre,clave){
    let data = [nombre, clave]; 
    return this.database.executeSql('SELECT * from users WHERE nombre = ? and clave = ? and id_rol = 1' , data).then(res => {
      let items: Users[] = [];
      //si existen filas
      if (res.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre,
            clave: res.rows.item(i).clave,
            id_rol: res.rows.item(i).id_rol
          })
        }
        //actualizo el observable
      this.nativeStorage.setItem('logeado',nombre)
      this.nativeStorage.getItem('logeado')

      return true; 
      }
      else{
        return false;
    }
  })
}

ingreso2(nombre,clave){
  let data = [nombre, clave]; 
  return this.database.executeSql('SELECT * from users WHERE nombre = ? and clave = ? and id_rol = 2' , data).then(res => {
    let items: Users[] = [];
    //si existen filas
    if (res.rows.length > 0) {
      //recorro el cursor y lo agrego al arreglo
      for (var i = 0; i < res.rows.length; i++) {
        items.push({
          id: res.rows.item(i).id,
          nombre: res.rows.item(i).nombre,
          clave: res.rows.item(i).clave,
          id_rol: res.rows.item(i).id_rol
        })
      }
      //actualizo el observable
    this.nativeStorage.setItem('logeado',nombre)
    this.nativeStorage.getItem('logeado')

    return true; 
    }
    else{
      return false;
  }
})
}

  buscarUsuarios() {
    //ejecuto la consulta
    return this.database.executeSql('SELECT * FROM users', []).then(data2 => {
      //creo el arreglo para los registros
      let items: Users[] = [];
      //si existen filas
      if (data2.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < data2.rows.length; i++) {
          items.push({
            id: data2.rows.item(i).id,
            nombre: data2.rows.item(i).nombre,
            clave: data2.rows.item(i).clave,
            id_rol: data2.rows.item(i).id_rol
          })
        }
      }
      //actualizo el observable
      this.listaUsers.next(items);

    })
  }



  insertar(id,nombre,clave,id_rol){
    let data=[id,nombre,clave,id_rol];
    this.database.executeSql('INSERT INTO users (id,nombre,clave,id_rol) VALUES (?,?,?,?)',data).then(() =>{
      this.buscarUsuarios
      console.log("Insert ejecutado")
    }).catch( e => console.log(e) ); 
  }

  regisAs(alumno,fecha,prof,sec,seccionId,userRut){
    let data = [ alumno,fecha,prof,sec,seccionId,userRut];
    return this.database.executeSql('INSERT INTO asistencia (alumno,fecha,prof,sec,seccionId,userRut) VALUES (?,?,?,?,?,?)', data)
      .then(res => {
        
      })
  }


  
}

