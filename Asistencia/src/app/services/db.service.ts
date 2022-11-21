import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from './users';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Ramos } from './ramos';
import { Seccion } from './seccion';
import { Rol } from './rol';
import { Asigsecci } from './asigsecci';
import { Listado } from './listado';
import { Perfiles } from './perfiles';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  //variable para la sentencia de creacion de tablas
  Rol: string = "CREATE TABLE IF NOT EXISTS rol (id_rol INTEGER PRIMARY KEY autoincrement, nombre_rol VARCHAR(30) NULL);";
  User: string = "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(30) NOT NULL, clave VARCHAR(30) NOT NULL, id_rol NUMBER NOT NULL, FOREIGN KEY(id_rol) REFERENCES rol(id_rol) ON DELETE CASCADE ON UPDATE CASCADE);";
  Ramo: string = "CREATE TABLE IF NOT EXISTS ramos(id INTEGER PRIMARY KEY autoincrement, sigla VARCHAR(30) NOT NULL, nombre VARCHAR(50) NOT NULL);";
  Seccion: string = "CREATE TABLE IF NOT EXISTS seccion(id INTEGER PRIMARY KEY autoincrement, sigla VARCHAR(20) NOT NULL);";
  Asigsecci: string = "CREATE TABLE IF NOT EXISTS asigsecci(id INTEGER PRIMARY KEY autoincrement, id_ramo NUMBER NOT NULL, id_seccion NUMBER NOT NULL, id_profesor NUMBER NOT NULL);";
  Listado: string = "CREATE TABLE IF NOT EXISTS listado(id INTEGER PRIMARY KEY autoincrement, id_estudiante NUMBER NOT NULL, id_asigsecci NUMBER NOT NULL);";
  Asistencia: string = "CREATE TABLE IF NOT EXISTS asistencia(id_asistencia INTEGER PRIMARY KEY autoincrement, fecha DATE NOT NULL,qr VARCHAR (40) NOT NULL, hora_ini VARCHAR(10) NOT NULL, hora_fin VARCHAR (10) NOT NULL);";
  Detalle: string = "CREATE TABLE IF NOT EXISTS detalle_asist(id_detalle INTEGER PRIMARY KEY autoincrement, estado VARCHAR (12) NOT NULL );";

  Perfiles: string = "CREATE TABLE IF NOT EXISTS perfiles (id_perfil_usuario INTEGER PRIMARY KEY autoincrement, id_usuario NUMBER NULL, nombre VARCHAR(50) NULL, apellido VARCHAR(50) NULL, imagen BLOB NULL, correo VARCHAR(50) NULL, FOREIGN KEY(id_usuario) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE);";

  //variable para el insert de la tabla
  RolP: string = "INSERT or IGNORE INTO rol(id_rol,nombre_rol) VALUES (1,'Profesor');";
  RolE: string = "INSERT or IGNORE INTO rol(id_rol,nombre_rol) VALUES (2,'Estudiante');";

  //variable que manipule la conexion a BD
  public database: SQLiteObject;

  //variables para observables
  listaRoles = new BehaviorSubject([]);
  listaUsers = new BehaviorSubject([]);
  listaRamos = new BehaviorSubject([]);
  listaSecciones = new BehaviorSubject([]);
  listaAsignaturaSecciones = new BehaviorSubject([]);
  listaListados = new BehaviorSubject([]);
  listaAsistencias = new BehaviorSubject([]);
  listaDetalles = new BehaviorSubject([]);
  listaPerfiles = new BehaviorSubject([]);

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController, public nativeStorage: NativeStorage) {
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
        name: 'bdusuario.db',
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
      await this.database.executeSql(this.Rol,[]);
      await this.database.executeSql(this.RolP,[]);
      await this.database.executeSql(this.RolE,[]);
      await this.database.executeSql(this.User,[]);
      await this.database.executeSql(this.Perfiles,[]);
      await this.database.executeSql(this.Ramo,[]);
      await this.database.executeSql(this.Seccion,[]);
      await this.database.executeSql(this.Asigsecci,[]);
      await this.database.executeSql(this.Listado,[]);
      await this.database.executeSql(this.Asistencia,[]);
      await this.database.executeSql(this.Detalle,[]);
      this.buscarUsuarios();
      this.buscarRamos();
      this.fetchPerfiles();
      this.buscarSecciones();
      this.buscarAsignaturasSecciones();
      this.buscarListados();

      //modificar el observable de el status de la BD
      this.isDBReady.next(true);

    } catch (e) {
      this.presentAlert("Error creación Tabla: " + e);
    }
  }

  dbState() {
    return this.isDBReady.asObservable();
  }

  fetchRoles(): Observable<Rol[]> {
    return this.listaRoles.asObservable();
  }

  fetchUsuario(): Observable<Users[]> {
    return this.listaUsers.asObservable();
  }

  fetchRamos(): Observable<Ramos[]> {
    return this.listaRamos.asObservable();
  }

  fetchSecciones(): Observable<Seccion[]> {
    return this.listaSecciones.asObservable();
  }

  fetchAsignaturaSecciones(): Observable<Asigsecci[]> {
    return this.listaAsignaturaSecciones.asObservable();
  }

  fetchListados(): Observable<Listado[]> {
    return this.listaListados.asObservable();
  }

  fetchPerfiles(): Observable<Listado[]> {
    return this.listaPerfiles.asObservable();
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
        localStorage.setItem('ingreso',nombre);
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
    localStorage.setItem('ingreso',nombre);



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

  buscarUsuarioE() {
    //ejecuto la consulta
    return this.database.executeSql('SELECT * from users WHERE nombre = ? and clave = ? and id_rol = 2', []).then(data2 => {
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

  buscarRamos() {
    //ejecuto la consulta
    return this.database.executeSql('SELECT * FROM ramos', []).then(data2 => {
      //creo el arreglo para los registros
      let items: Ramos[] = [];
      //si existen filas
      if (data2.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < data2.rows.length; i++) {
          items.push({
            id: data2.rows.item(i).id,
            sigla: data2.rows.item(i).sigla,
            nombre: data2.rows.item(i).nombre
          })
        }
      }
      //actualizo el observable
      this.listaRamos.next(items);

    })
  }

  buscarSecciones() {
    //ejecuto la consulta
    return this.database.executeSql('SELECT * FROM seccion', []).then(data2 => {
      //creo el arreglo para los registros
      let items: Seccion[] = [];
      //si existen filas
      if (data2.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < data2.rows.length; i++) {
          items.push({
            id: data2.rows.item(i).id,
            sigla: data2.rows.item(i).sigla
          })
        }
      }
      //actualizo el observable
      this.listaSecciones.next(items);

    })
  }

  buscarAsignaturasSecciones() {
    //ejecuto la consulta
    return this.database.executeSql('SELECT * FROM asigsecci', []).then(data2 => {
      //creo el arreglo para los registros
      let items: Asigsecci[] = [];
      //si existen filas
      if (data2.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < data2.rows.length; i++) {
          items.push({
            id: data2.rows.item(i).id,
            id_ramo: data2.rows.item(i).id_ramo,
            id_seccion: data2.rows.item(i).id_seccion,
            id_profesor: data2.rows.item(i).id_profesor
          })
        }
      }
      //actualizo el observable
      this.listaAsignaturaSecciones.next(items);

    })
  }

  buscarListados() {
    //ejecuto la consulta
    return this.database.executeSql('SELECT * FROM listado', []).then(data2 => {
      //creo el arreglo para los registros
      let items: Listado[] = [];
      //si existen filas
      if (data2.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < data2.rows.length; i++) {
          items.push({
            id: data2.rows.item(i).id,
            id_estudiante: data2.rows.item(i).id_estudiante,
            id_asigsecci: data2.rows.item(i).id_asigsecci,
          })
        }
      }
      //actualizo el observable
      this.listaListados.next(items);

    })
  }



  insertarUsuarios(id,nombre,clave,id_rol){
    let data=[id,nombre,clave,id_rol];
    this.database.executeSql('INSERT or Ignore INTO users(id,nombre,clave,id_rol) VALUES (?,?,?,?)',data).then(() =>{
      this.buscarUsuarios
      console.log("Insert ejecutado")
    }).catch( e => console.log(e) ); 
  }

  insertarRamos(id,sigla,nombre){
    let data=[id,sigla,nombre];
    this.database.executeSql('INSERT or Ignore INTO ramos(id,sigla,nombre) VALUES (?,?,?)',data).then(() =>{
      this.buscarRamos
      console.log("Insert ejecutado")
    }).catch( e => console.log(e) ); 
  }
  insertarSecciones(id,sigla){
    let data=[id,sigla];
    this.database.executeSql('INSERT or Ignore INTO seccion(id, sigla) VALUES (?,?)',data).then(() =>{
      this.buscarSecciones
      console.log("Insert ejecutado")
    }).catch( e => console.log(e) ); 
  }
  insertarAsignaturaSecciones(id,id_ramo,id_seccion,id_profesor){
    let data=[id,id_ramo,id_seccion,id_profesor];
    this.database.executeSql('INSERT or Ignore INTO asigsecci(id,id_ramo,id_seccion,id_profesor) VALUES (?,?,?,?)',data).then(() =>{
      this.buscarAsignaturasSecciones
      console.log("Insert ejecutado")
    }).catch( e => console.log(e) ); 
  }
  insertarListados(id,id_estudiante,id_asigsecci){
    let data=[id,id_estudiante,id_asigsecci];
    this.database.executeSql('INSERT or Ignore INTO listado(id,id_estudiante,id_asigsecci) VALUES (?,?,?)',data).then(() =>{
      this.buscarListados
      console.log("Insert ejecutado")
    }).catch( e => console.log(e) ); 
  }
  actualizarPerfil(nombre,apellido,correo,id_perfil_usuario){ //registrar perfil
    let data=[nombre,apellido,correo,id_perfil_usuario];
    return this.database.executeSql('UPDATE perfiles SET nombre = ?, apellido = ?, correo = ? WHERE id_perfil_usuario = ?', data).then(data2 => {
      this.TraerPerfiles();
    })
  }
  actualizarIdPerfil(id_perfil_usuario,id_usuario){ //registrar  id perfil
    let data=[id_perfil_usuario,id_usuario];
    return this.database.executeSql('INSERT OR REPLACE INTO perfiles(id_perfil_usuario, id_usuario) VALUES (?,?)', data).then(data2 => {
      this.TraerPerfiles();
    })
  }
  actualizarFoto(imagen,id_perfil_usuario){ //registrar foto
    let data=[imagen,id_perfil_usuario];
    return this.database.executeSql('UPDATE perfiles SET imagen = ? WHERE id_perfil_usuario = ?', data).then(data2 => {
      this.TraerPerfiles();
    })
  }


  // intento de prueba unitaria
  obtenerLocalStorage(): any[]{
    const datos = JSON.parse(localStorage.getItem('todos'));

    return datos || [];
  }

  TraerPerfiles() { //BUSCAR PERFILES
    //ejecuto la consulta
    return this.database.executeSql('SELECT * FROM perfiles', []).then(res => {
      //creo el arreglo para los registros
      let items: Perfiles[] = [];
      //si existen filas
      if (res.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_perfil_usuario: res.rows.item(i).id_perfil_usuario,
            id_usuario: res.rows.item(i).id_usuario,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            imagen: res.rows.item(i).imagen,
            correo: res.rows.item(i).correo
          })
        }
      }
      //actualizo el observable
      this.listaPerfiles.next(items);
    })
  }

  Perfilusuario(id_perfil_usuario) { //BUSCAR PERFIL
    let data = [id_perfil_usuario];
    //ejecuto la consulta
    return this.database.executeSql('SELECT * FROM perfiles WHERE id_perfil_usuario = ?', data).then(res => {
      //creo el arreglo para los registros
      let items: Perfiles[] = [];
      //si existen filas
      if (res.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_perfil_usuario: res.rows.item(i).id_perfil_usuario,
            id_usuario: res.rows.item(i).id_usuario,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            imagen: res.rows.item(i).imagen,
            correo: res.rows.item(i).correo,

          })
        }
        //actualizo el observable
        localStorage.setItem('perfiles', id_perfil_usuario)

        return true;
      }else{
        return false;
    }

    })
  }

  
  
}

