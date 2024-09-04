import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AddGroceryItemsComponent } from "../add-grocery-items/add-grocery-items.component";
import { FormsModule } from '@angular/forms';
import { GroceryItems } from '../../GroceryItems';
import { CommonModule } from '@angular/common';
import { GroceryService } from '../../grocery.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { event } from 'jquery';

@Component({
  selector: 'app-all-grocery-items',
  standalone: true,
  imports: [AddGroceryItemsComponent, CommonModule, FormsModule],
  templateUrl: './all-grocery-items.component.html',
  styleUrl: './all-grocery-items.component.css'
})

export class AllGroceryItemsComponent implements OnInit {

  itemcount: number;
  maxId: number;
  localItem: string | null;

  nameU: string;
  categoryU: string;
  quantityU: number;
  // AllGroceryItems: any = [];
  AllGroceryItems: GroceryItems[] = [];
  AllCategories:any;
  selectedRow: object | any;
  // @ViewChild(AddGroceryItemsComponent) childComponentRef: AddGroceryItemsComponent;
  constructor(private groceryService: GroceryService) {
    // this.localItem = localStorage.getItem("groceryitems");
    // if (this.localItem === null) {
    //   this.AllGroceryItems = [];
    //   this.itemcount = 0;
    // } else {
    //   this.AllGroceryItems = [];
    //   var temp = { 'data': this.localItem };
    //   this.AllGroceryItems.push(JSON.parse(temp.data));
    //   this.itemcount = this.AllGroceryItems.length;

    // }
  }

  ngOnInit(): void {
    this.groceryService.currentItems.subscribe(items => {
      this.AllGroceryItems = items;
      this.itemcount = items.length;
      this.getAllItemsfromDB();
    });

    this.groceryService.fetchAllItems();
   
  }

  GetCategories($event: import("../../Category").Category[]) {
    if($event.length>0){
      this.AllCategories=$event;
    }
  }

  openEditModal(item: any): void {
    //localstorage
    this.selectedRow = item;
    // this.nameU = item.name;
    // this.categoryU = item.category;
    // this.quantityU = item.quantity;

    //rest api
    this.getItemById(item);


    ($('#exampleModal') as any).modal('show');

  }

  saveChanges(): void {
    //rest api

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (this.selectedRow) {
          this.selectedRow.name = this.nameU;
          this.selectedRow.category = this.categoryU;
          this.selectedRow.quantity = this.quantityU;
          this.updateDataIntoDb(this.selectedRow);
        }

      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });


    // local storage
    // localStorage.setItem("groceryitems", JSON.stringify(this.selectedRow));

    ($('#exampleModal') as any).modal('hide');
  }

  // addItem(groceryitem: GroceryItems) {
  // console.log("Added item: " + groceryitem);
  // this.AllGroceryItems.push(groceryitem);
  // this.itemcount = this.AllGroceryItems.length;
  // localStorage.setItem("groceryitems", JSON.stringify(groceryitem));
  // this.childComponentRef.name = '';
  // this.childComponentRef.category = '';
  // this.childComponentRef.quantity = null;
  // }

  deleteItem(groceryitem: GroceryItems) {
    //local storage deletion
    // console.log("Deleted item: " + groceryitem);
    // const index = this.AllGroceryItems.indexOf(groceryitem);
    // this.AllGroceryItems.splice(index, 1);
    // this.itemcount = this.AllGroceryItems.length;
    // localStorage.setItem("groceryitems", JSON.stringify(groceryitem));

    //db deletion

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteItemfromDb(groceryitem);
      }
    });
  }

  getAllItemsfromDB() {

      // console.log("Data: " + resultData);

      if (this.AllGroceryItems !== undefined && this.AllGroceryItems.length == 0) {
        this.itemcount = 0;
        this.maxId = 0;
      } else if (this.AllGroceryItems !== null && this.AllGroceryItems.length > 0) {
        this.itemcount = this.AllGroceryItems.length;
        this.maxId = this.AllGroceryItems.reduce((maxItem, item) => item.id > maxItem.id ? item : maxItem, this.AllGroceryItems[0]).id;
      }


  }

  getItemById(item: GroceryItems) {
    this.groceryService.getItemById(item).subscribe((resultData: any) => {
      // console.log("Data: " + resultData);
      this.nameU = resultData.name;
      this.categoryU = resultData.category;
      this.quantityU = resultData.quantity;
    })
  }

  deleteItemfromDb(item: GroceryItems) {
    this.groceryService.deleteItem(item).subscribe((resultData: string) => {
        // console.log(resultData);
        Swal.fire({
          title: "Deleted!",
          text: "Item has been deleted.",
          icon: "success"
        });
        this.groceryService.fetchAllItems();
      });
  };

  updateDataIntoDb(item: GroceryItems) {
    let bodyData = {
      "name": item.name,
      "category": item.category,
      "quantity": item.quantity
    };

    let Options: Object = {
      responseType: 'json'
    }

    this.groceryService.updateItem(item).subscribe((resultData: any) => {
        Swal.fire("Item has been updated!", "", "success");
        this.groceryService.fetchAllItems();
      })

  }


}

