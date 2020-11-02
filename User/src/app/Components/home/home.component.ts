import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from 'src/app/Shared/iproduct';
import { Subscription } from 'rxjs';
import { ProductServicesService } from 'src/app/Services/product-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  productList: IProduct[];
  private subscription: Subscription[];
  chosenProducts: IProduct[];
  selectedPrd: IProduct;

  constructor(private prdService: ProductServicesService) {
    this.chosenProducts = [];
    this.subscription = [];
    this.selectedPrd = { Name: '', Price: 0, Quantity: 0, Img: '' };
  }

  ngOnInit(): void {
    this.subscription.push(this.prdService.getAllProducts().subscribe(
      (response) => {
        // console.log(response);
        this.productList = response;
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
    // this.subscription.unsubscribe();
    for (const sub of this.subscription){
      sub.unsubscribe();
    }
  }

  addToCart(id: number): void {
    this.subscription.push(this.prdService.getProductByID(id).subscribe(
      (response) => {
        console.log(response);
        const prd = this.chosenProducts.find(p => {
          return p.Id == response.Id;
        });
        if (prd == null){
          this.chosenProducts.push(response);
        }
        localStorage.setItem('PrdsToCart', JSON.stringify(this.chosenProducts));
        console.log(localStorage.getItem('PrdsToCart'));
        console.log(JSON.parse(localStorage.getItem('PrdsToCart')));
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  showDetails(id: number){
    this.subscription.push(this.prdService.getProductByID(id).subscribe(
      (response) => {
        console.log(response);
        this.selectedPrd = response;
      },
      (err) => {
        console.log(err);
      }
    ));
  }
}
