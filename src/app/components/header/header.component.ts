import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  categories: any = [];
  constructor(
    private apiService: ApiService,
    private commonservice: CommonService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.apiService.getCategories().subscribe((resp) => {
      this.categories = resp;
    });
  }

  changeCategories(event: any): void {
    if (event.target.value !== '') {
      this.commonservice.getCategory(event.target.value);
      this.router.navigateByUrl('/');
    }
  }

  onCustomizeProducts(ev: any): void {
    if (ev.target.value !== '') {
      this.commonservice.getCustomizeProduct(ev.target.value);
      this.router.navigateByUrl('/customize-product');
    }
  }
}
