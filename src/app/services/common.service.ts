import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  productId = new BehaviorSubject(null);
  productId$ = this.productId.asObservable();
  productIdFlag = false;

  constructor() { }

  getProductId(id: any): void {
    this.productIdFlag = true;
    this.productId.next(id);
  }

}
