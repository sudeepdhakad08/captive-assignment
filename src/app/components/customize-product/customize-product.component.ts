import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-customize-product',
  templateUrl: './customize-product.component.html',
  styleUrls: ['./customize-product.component.scss']
})
export class CustomizeProductComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getEventResp();
  }

  getEventResp(): void {
    this.commonService.customizeProduct$.subscribe((resp) => {
      console.log(resp);
    })
  }
}
