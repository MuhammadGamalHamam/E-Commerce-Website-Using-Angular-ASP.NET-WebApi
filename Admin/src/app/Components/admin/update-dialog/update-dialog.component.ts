import { Component, OnInit, Inject } from '@angular/core';
import { IProduct } from 'src/app/Shared/iproduct';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {

  wantedProduct: IProduct;

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

  updateProduct(){
    console.log('In update');
    this.prdService.updateProduct(this.data.prdId, this.wantedProduct).subscribe(
      (res) => {
        alert(res);
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
