import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiEndpoit:string = 'https://fakestoreapi.com/';
  // products
  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error);
  }

  getAllproduct(): Observable<any> {
    return this.httpClient.get(this.apiEndpoit+"products?limit=4")
    .pipe(catchError(this.handleError));
  }
}
