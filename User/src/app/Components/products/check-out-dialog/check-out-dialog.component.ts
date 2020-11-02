import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-check-out-dialog',
  templateUrl: './check-out-dialog.component.html',
  styleUrls: ['./check-out-dialog.component.css']
})
export class CheckOutDialogComponent implements OnInit {

  constructor(
    private  dialogRef: MatDialogRef<CheckOutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router) { }

  ngOnInit(): void {
  }

  onCheckClick(): void {
    localStorage.removeItem('PrdsToCart');
    this.router.navigateByUrl('/Home');
    this.dialogRef.close();
  }

  onCancelClick(): void{
    this.dialogRef.close();
  }

}
