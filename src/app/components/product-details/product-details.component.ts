import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productId: any;
  productData: any;
  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductId();
  }

  getProductId(): void {
    this.commonService.productId$.subscribe((resp) => {
      this.productId = resp;
      this.commonService.productIdFlag = false;
      this.getProductData();
    });
  }

  getProductData(): void {
    this.apiService.getSingleProduct(this.productId).subscribe((resp) => {
      this.productData = resp;
      console.log(this.productData);
    });
  }

  ngOnDestroy(): void {}
}
