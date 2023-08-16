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
    return this.httpClient.get(this.apiEndpoit+"products")
    .pipe(catchError(this.handleError));
  }

  getSingleProduct(id:any): Observable<any> {
    return this.httpClient.get(this.apiEndpoit+"products"+"/"+id)
    .pipe(catchError(this.handleError));
  }

  getCategories():Observable<any> {
    return this.httpClient.get(this.apiEndpoit+"products/categories")
    .pipe(catchError(this.handleError));
  }

  getProdcutCategory(cat: string): Observable<any> {
    return this.httpClient.get(this.apiEndpoit+"products/category/"+cat)
    .pipe(catchError(this.handleError));
  }

  addProduct(product: any): Observable<any> {
    return this.httpClient.post(this.apiEndpoit+"products", {
      body: JSON.stringify(product)
    })
    .pipe(catchError(this.handleError));
  }

  updateProduct(product: any,id: any): Observable<any> {
    return this.httpClient.put(this.apiEndpoit+"products/"+id, {
      body: JSON.stringify(product)
    })
    .pipe(catchError(this.handleError));
  }

  deleteProduct(id: string): Observable<any> {
    return this.httpClient.delete(this.apiEndpoit+"products/"+id)
    .pipe(catchError(this.handleError));
  }
}
