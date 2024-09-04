import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import { GroceryService } from '../../grocery.service';
import { GroceryItems } from '../../GroceryItems';
import { CategoryService } from '../../Category.Service';
import { Category } from '../../Category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-grocery-items',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './add-grocery-items.component.html',
  styleUrl: './add-grocery-items.component.css'
})
export class AddGroceryItemsComponent implements OnInit {
  name: string;
  category: number | null;
  quantity: number | null;
  @Output() CategoriesforModal: EventEmitter<Category[]> = new EventEmitter();
  @Input() itemcount: number;
  @Input() max: number;
  AllGroceryItems: GroceryItems[] = [];
  AllCategories: Category[] = [];

  // @ViewChild(AllGroceryItemsComponent) childComponentRef: AllGroceryItemsComponent;
  constructor(private groceryService: GroceryService, private categoryService: CategoryService) {

  }

  AddItems() {
    let categoryValue = typeof this.category === 'number' ? this.category : parseInt(this.category as any, 10);
    let bodyData = {
      "id": (this.max) + 1,
      "name": this.name,
      "category": categoryValue,
      "quantity": this.quantity,
      "categories": null
    }
    this.groceryService.addItem(bodyData).subscribe((resultData: any) => {
      // console.log(resultData);
      Swal.fire("Item has been saved!", "", "success");
      this.groceryService.fetchAllItems();
      // this.Submitted();
      this.clearForm();
    })
  }

  clearForm(): void {
    this.name = '';
    this.category = null;
    this.quantity = null;
  }

  Submitted() {
    this.CategoriesforModal.emit(this.AllCategories);
  }

  ngOnInit(): void {
    this.categoryService.currentItems.subscribe(items => {
      this.AllCategories = items;
      if (this.AllCategories.length > 0) {
        this.Submitted();
      }

    });
    this.categoryService.fetchAllItems();
  }
}
