import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Shared/iproduct';
import { ProductServicesService } from 'src/app/Services/product-services.service';
import { AddedProductVM } from 'src/app/Shared/added-product-vm';
import { MatDialog } from '@angular/material/dialog';
import { CheckOutDialogComponent } from '../check-out-dialog/check-out-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  productList: IProduct[];
  totalProdPrices: number;
  addedProducts: AddedProductVM[];

  constructor(private prdService: ProductServicesService, public dialog: MatDialog, private router: Router) {
    this.productList = [];
    this.totalProdPrices = 0;
    this.addedProducts = [];
  }

  ngOnInit(): void {
    if (localStorage.getItem('PrdsToCart') != null){
      this.productList = JSON.parse(localStorage.getItem('PrdsToCart'));
    }
  }

  UpdateTotalPrice(pID: number, pPrice: number, qWanted: number) {
    const obj: AddedProductVM = {productID: pID, productPrice: pPrice, quantityWanted: qWanted};

    if (this.addedProducts.length == 0) {
      this.addedProducts.push(obj);
    } else {
      const repeat = this.addedProducts.find(prod => prod.productID == obj.productID);
      const index: number = this.addedProducts.indexOf(repeat);
      if (index !== -1) {
        this.totalProdPrices -= (repeat.productPrice * repeat.quantityWanted);
        this.addedProducts.splice(index, 1);
      }

      this.addedProducts.push(obj);
    }

    this.totalProdPrices += (obj.productPrice * obj.quantityWanted);
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(CheckOutDialogComponent, {
  //     data: { totalCost: this.totalProdPrices }
  //   });

  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   this.animal = result;
  //   // });
  // }

  onCheckClick(): void {
    localStorage.removeItem('PrdsToCart');
    this.router.navigateByUrl('/Home');
  }

}
