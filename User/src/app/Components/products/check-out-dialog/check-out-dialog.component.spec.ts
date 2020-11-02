import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutDialogComponent } from './check-out-dialog.component';

describe('CheckOutDialogComponent', () => {
  let component: CheckOutDialogComponent;
  let fixture: ComponentFixture<CheckOutDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckOutDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
