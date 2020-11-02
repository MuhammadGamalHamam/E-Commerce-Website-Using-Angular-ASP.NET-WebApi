import { Component, OnInit, Inject } from '@angular/core';
import { IProduct } from 'src/app/Shared/iproduct';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

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

  deleteProduct(){
    this.prdService.deleteProduct(this.data.prdId).subscribe(
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
