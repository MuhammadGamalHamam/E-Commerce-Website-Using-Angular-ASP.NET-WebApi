import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { Routes, RouterModule } from '@angular/router';

// import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { CheckOutDialogComponent } from './check-out-dialog/check-out-dialog.component';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {path: 'Cart', component: ProductCartComponent},
  {path: '', redirectTo: '/Cart', pathMatch: 'full'}
];

@NgModule({
  declarations: [ProductCartComponent, CheckOutDialogComponent],
  // entryComponents: [CheckOutDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // MatSliderModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ProductsModule { }
