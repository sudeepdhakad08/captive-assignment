import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  productDetails: any;
  subscription = new Subscription();

  constructor(private apiService: ApiService, private router: Router,
    private commonService: CommonService) {}

  ngOnInit(): void {
    this.getAllProductsDetails();
    this.getProductBasedOnCategory();
  }

  getAllProductsDetails(): void {
    this.subscription?.add(
      this.apiService.getAllproduct().subscribe((resp) => {
        this.productDetails = resp;
        console.log(resp);
      })
    );
  }

  onProductClick(id: any): void {
    this.commonService.getProductId(id);
    this.router.navigateByUrl('/product-details');
  }

  getProductBasedOnCategory(): void {
    this.commonService.category$.subscribe((resp) => {
      if(resp !== null){
       this.setProductBasedOnCategory(resp);
      }
    })
  }

  setProductBasedOnCategory(cat: string): void {
    this.apiService.getProdcutCategory(cat).subscribe((resp) => {
      this.productDetails = resp;
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
