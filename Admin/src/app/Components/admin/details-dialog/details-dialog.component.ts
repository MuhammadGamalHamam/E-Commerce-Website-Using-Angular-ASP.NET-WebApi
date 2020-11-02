import { Component, OnInit, Inject } from '@angular/core';
import { IProduct } from 'src/app/Shared/iproduct';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent implements OnInit {

  wantedProduct: IProduct;
  // id: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private prdService: ProductService) {
    this.wantedProduct = {Name: '', Price: 0, Quantity: 0, Img: ''};
  }

  ngOnInit(): void {
    this.prdService.getProductByID(this.data.prdId).subscribe(
      (response) => {
        this.wantedProduct = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
