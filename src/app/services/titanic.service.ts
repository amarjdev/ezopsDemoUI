import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry,map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

const API_URL =environment.apiUrl;
@Injectable()
export class TitanicService {
  
  constructor(private http: HttpClient) { }
  getPassengers() {
      return this.http.get(API_URL+'passenger/all').pipe(catchError(this.handleError))
  }
  updatePassangerInfo(titanic:any) {
  console.log('updatePassangerInfo::service');
      return this.http.post(API_URL+'/passenger/save',titanic)
                 .pipe(
                     map((response:any) => {console.log('in Reponse'); return response}),
                     catchError(this.handleError));
  }
  deletePassangerInfo(titanic:any) {
    return this.http.delete(API_URL+'/passenger/delete/'+titanic.passengerId)
               .pipe(
                map((response:any) => {console.log('in Reponse'); return response}),
                 catchError(this.handleError));
  }
  httpOptions ={};
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message)
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}