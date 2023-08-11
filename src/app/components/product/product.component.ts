import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  productDetails: any;
  subscription = new Subscription();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllProductsDetails();
  }

  getAllProductsDetails(): void {
    this.subscription?.add(
      this.apiService.getAllproduct().subscribe((resp) => {
        this.productDetails = resp;
        console.log(resp);
      })
    );
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
