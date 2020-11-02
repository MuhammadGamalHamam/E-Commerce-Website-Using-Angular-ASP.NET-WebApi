import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AuthorizeUserGuard } from './authorize-user.guard';
import { MatTableModule } from '@angular/material/table';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

const routes: Routes = [
  { path: 'Login', component: LoginPageComponent },
  { path: 'Product', component: ProductsComponent, canActivate: [AuthorizeUserGuard] },
  { path: '', redirectTo: '/Admin/Product', pathMatch: 'full'}
];

@NgModule({
  declarations: [LoginPageComponent, ProductsComponent, DetailsDialogComponent, UpdateDialogComponent, DeleteDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule
  ]
})
export class AdminModule { }
