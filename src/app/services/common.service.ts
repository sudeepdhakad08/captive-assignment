import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  productId = new BehaviorSubject(null);
  productId$ = this.productId.asObservable();

  category = new BehaviorSubject(null);
  category$ = this.category.asObservable();

  customizeProduct = new BehaviorSubject(null);
  customizeProduct$ = this.customizeProduct.asObservable();

  constructor() { }

  getProductId(id: any): void {
    this.productId.next(id);
  }

  getCategory(val: any): void {
   this.category.next(val);
  }

  getCustomizeProduct(val: any): void {
    this.customizeProduct.next(val);
   }

}
