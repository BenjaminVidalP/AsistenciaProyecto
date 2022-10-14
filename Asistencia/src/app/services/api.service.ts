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
  apiURL = 'https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos/db';
  // Se declara la variable http de tipo HttpClient
    constructor(private http:HttpClient) { }

getPosts():Observable<any>{
    return this.http.get(this.apiURL+'/posts/').pipe(
        retry(3), catchError(this.handleError)
    );
  }





  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
