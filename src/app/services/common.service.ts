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

  constructor() { }

  getProductId(id: any): void {
    this.productId.next(id);
  }

  getCategory(val: any): void {
   this.category.next(val);
  }

}
