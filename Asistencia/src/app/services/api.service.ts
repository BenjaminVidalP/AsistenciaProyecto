import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from'@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';

export class User {
  nombre = ''
  clave = ''
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' :'*'
    })
  }
  // Se establece la base url del API a consumir
  apiURL = 'https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos';

  apiURL1 = 'https://my-json-server.typicode.com/victorrosendo/repoSeccionAsigSeccion';

  apiURL2 = 'https://my-json-server.typicode.com/victorrosendo/repoListadoAutos';

  
  // Se declara la variable http de tipo HttpClient
    constructor(private http:HttpClient) { }

getPosts():Observable<any>{
    return this.http.get(this.apiURL+'/users/').pipe(
        retry(3)
    );
  }

  getPosts1():Observable<any>{
    return this.http.get(this.apiURL+'/ramos/').pipe(
      retry(3)
  );
  }
  getPosts2():Observable<any>{
    return this.http.get(this.apiURL1+'/seccion/').pipe(
      retry(3)
  );
  }
  getPosts3():Observable<any>{
    return this.http.get(this.apiURL1+'/asigsecci/').pipe(
      retry(3)
  );
  }

  getPosts4():Observable<any>{
    return this.http.get(this.apiURL1+'/listado/').pipe(
      retry(3)
  );
  }

}
