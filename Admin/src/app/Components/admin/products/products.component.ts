import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { IProduct } from 'src/app/Shared/iproduct';
import { ProductService } from 'src/app/Services/product.service';
import { Subscription } from 'rxjs';
// import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  displayedColumns: string[];
  dataSource: IProduct[]; // : MatTableDataSource<IProduct>;
  subscriptions: Subscription[];

  constructor(private prdService: ProductService, private dialog: MatDialog, private router: Router,
              private changeDetectorRefs: ChangeDetectorRef) {
    this.displayedColumns = ['Id', 'Name', 'Price', 'Quantity', 'Img', 'actions'];
    this.subscriptions = [];
    this.dataSource = [];
  }

  ngOnDestroy(): void {
    // this.deleteSubscriptions();
    for (const sub of this.subscriptions){
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.loadData();
    // this.subscriptions.push(
    //   this.prdService.getAllProducts().subscribe(
    //     (response) => {
    //       // this.dataSource = new MatTableDataSource(response);
    //       this.dataSource = response;
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   )
    // );
  }

  prodDetails(Id: number){
    const dialogRef = this.dialog.open(DetailsDialogComponent, { data: { prdId: Id }});
  }

  prodUpdate(Id: number){
    const exp = localStorage.getItem('expiration');
    if (new Date(exp) < new Date()) {
      alert('Your Authentication key expired.\nYou have to login again.');
      localStorage.removeItem('expiration');
      localStorage.removeItem('accessToken');
      this.router.navigateByUrl('/Admin/Login');
    }
    else{
      const dialogRef = this.dialog.open(UpdateDialogComponent, { data: { prdId: Id }});

      dialogRef.afterClosed().subscribe(res => {
        // this.deleteSubscriptions();
        console.log(res);
        if (res == 'true'){
          console.log('In reload');
          this.loadData();
        }
      });
    }
  }

  prodDelete(Id: number){
    const exp = localStorage.getItem('expiration');
    if (new Date(exp) < new Date()) {
      alert('Your Authentication key expired.\nYou have to login again.');
      localStorage.removeItem('expiration');
      localStorage.removeItem('accessToken');
      this.router.navigateByUrl('/Admin/Login');
    }
    else{
      const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { prdId: Id }});

      dialogRef.afterClosed().subscribe(res => {
        // this.deleteSubscriptions();
        console.log(res);
        if (res == 'true'){
          this.loadData();
        }
      });
    }
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  loadData(){
    this.subscriptions.push(
      this.prdService.getAllProducts().subscribe(
        (response) => {
          // this.dataSource = new MatTableDataSource(response);
          this.dataSource = response;
          this.changeDetectorRefs.detectChanges();
        },
        (err) => {
          console.log(err);
        }
      )
    );
  }

  // deleteSubscriptions(){
  //   for (const sub of this.subscriptions){
  //     sub.unsubscribe();
  //   }
  // }
}
