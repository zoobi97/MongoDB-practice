import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroceryItemsComponent } from './add-grocery-items.component';

describe('AllGroceryItemsComponent', () => {
  let component: AddGroceryItemsComponent;
  let fixture: ComponentFixture<AddGroceryItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGroceryItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGroceryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
