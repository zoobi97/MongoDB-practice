import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGroceryItemsComponent } from './all-grocery-items.component';

describe('AllGroceryItemsComponent', () => {
  let component: AllGroceryItemsComponent;
  let fixture: ComponentFixture<AllGroceryItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllGroceryItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllGroceryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
