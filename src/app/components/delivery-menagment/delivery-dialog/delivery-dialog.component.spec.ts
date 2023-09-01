import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDialogComponent } from './delivery-dialog.component';

describe('DeliveryDialogComponent', () => {
  let component: DeliveryDialogComponent;
  let fixture: ComponentFixture<DeliveryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryDialogComponent]
    });
    fixture = TestBed.createComponent(DeliveryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
