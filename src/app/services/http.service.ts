import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const endpoint = environment.endpoint

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, public route: ActivatedRoute, public router: Router, ) { }
  get(url: any): Observable<any> {
    return this.http.get(endpoint + url, { observe: "response",headers: {
      Accept: "application/json",
    } }).pipe(
      catchError(this.handleError<any>('Get' + url))
    );
  }
  post(url: any, form: any): Observable<any> {
    return this.http.post( endpoint+url, form, { observe: "response" ,headers: {
      Accept: "application/json",
    },}).pipe(
      catchError(this.handleError<any>('get centres')));

  }
  delete(url:any): Observable<any> {
    return this.http.delete( endpoint+url, { observe: "response" ,headers: {
      Accept: "application/json",
    },}).pipe(
      catchError(this.handleError<any>('get centres')));

  }
  // patch(url: any, form: any): Observable<any> {
  //   return this.http.post( endpoint+url, form, { observe: "response" }).pipe(
  //     catchError(this.handleError<any>('get centres')));

  // }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.error instanceof ErrorEvent) {
      }
      else {
        switch (error.status) {
          case 0:

            break;
          case 400:
            break;
          case 403:

            break;
          case 422:
          console.log(error.error.message);

          break;
          case 401:

            break;
          case 404:

          case 500:

            break;
          case 504:

          break;
        }
      }
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
