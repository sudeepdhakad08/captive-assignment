import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-customize-product',
  templateUrl: './customize-product.component.html',
  styleUrls: ['./customize-product.component.scss'],
})
export class CustomizeProductComponent implements OnInit {
  productStatus: any;
  categories: any;
  productId: any;
  allProductIds: any;

  productForm = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl(0.0, Validators.required),
    imgUrl: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  constructor(
    private apiService: ApiService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getEventResp();
    this.getAllCategories();
  }

  getEventResp(): void {
    this.commonService.customizeProduct$.subscribe((resp) => {
      this.productStatus = resp;
      if (this.productStatus === 'update') {
        this.getAllProduct();
        this.formDisable();
      }
      if (this.productStatus === 'delete') {
        this.getAllProduct();
      }
      if (this.productForm) {
        this.productForm.reset();
      }
    });
  }
  getAllCategories(): void {
    this.apiService.getCategories().subscribe((resp) => {
      this.categories = resp;
    });
  }

  getAllProduct(): void {
    this.apiService.getAllproduct().subscribe((resp) => {
      this.allProductIds = resp;
    });
  }

  addProductSubmit(): void {
    if (this.productStatus === 'add') {
      this.apiService.addProduct(this.productForm.value).subscribe((resp) => {
        console.log(resp);
      });
    } else {
      this.apiService.updateProduct(this.productForm.value, this.productId).subscribe((resp) => {
        console.log(resp);
      })
    }
    this.productForm.reset();
  }

  updateProductForm(ev: any): void {
    this.productId = ev.target.value;
    let singleProduct: any;
    if (this.productId !== '') {
      singleProduct = this.allProductIds.filter(
        (element: any) => element.id == this.productId
      );
      this.productForm.patchValue({
        title: singleProduct[0].title,
        price: singleProduct[0].price,
        imgUrl: singleProduct[0].image,
        category: singleProduct[0].category,
        description: singleProduct[0].description,
      });
      this.formEnable();
    }
  }

  formDisable(): void {
    this.productForm.controls['title'].disable();
    this.productForm.controls['price'].disable();
    this.productForm.controls['imgUrl'].disable();
    this.productForm.controls['category'].disable();
    this.productForm.controls['description'].disable();
  }

  formEnable(): void {
    this.productForm.controls['title'].enable();
    this.productForm.controls['price'].enable();
    this.productForm.controls['imgUrl'].enable();
    this.productForm.controls['category'].enable();
    this.productForm.controls['description'].enable();
  }

  deleteProduct(): void {
    this.apiService.deleteProduct(this.productId).subscribe((resp) => {
      console.log(resp);
    });
  }
}
