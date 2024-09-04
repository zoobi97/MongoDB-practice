import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryService } from '../../Category.Service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import { Category } from '../../Category';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  Cname: string;
  CnameU: string;
  CStatus: number | null;
  CStatusU: number;
  max: number;
  options: string
  selectedRow: object | any;
  AllCategories: Category[] = [];
  constructor(private categoryService: CategoryService) {

  }

  onStatusChange($event: Event) {
    const target = $event.target as HTMLSelectElement;
    const selectedValue = target.value;
    const selectedText = target.options[target.selectedIndex].text;

    this.CStatus = +selectedValue; // Convert to number if needed
    this.options = selectedText;

  }

  AddItems() {
    let bodyData = {
      "id": (this.max) + 1,
      "name": this.Cname,
      "status": this.CStatus,
      "status_name": this.options
    }
    this.categoryService.addItem(bodyData).subscribe((resultData: any) => {
      // console.log(resultData);
      Swal.fire("Item has been saved!", "", "success");
      this.categoryService.fetchAllItems();
      // this.Submitted();
      this.clearForm();
    })
  }

  ngOnInit(): void {
    this.categoryService.currentItems.subscribe(items => {
      this.AllCategories = items;
      this.getAllItemsfromDB();
    });

    this.categoryService.fetchAllItems();

  }
  getAllItemsfromDB() {
    if (this.AllCategories.length > 0)
      this.max = this.AllCategories.reduce((maxItem, item) => item.id > maxItem.id ? item : maxItem, this.AllCategories[0]).id;
    else
      this.max = 0;
  }

  clearForm(): void {
    this.Cname = '';
    this.CStatus = null;
  }

  getItemById(item: Category) {
    this.categoryService.getItemById(item).subscribe((resultData: any) => {
      // console.log("Data: " + resultData);
      this.CnameU = resultData.name;
      this.CStatusU = resultData.status;
    })
  }

  openEditModal(item: Category) {
    this.selectedRow = item;
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
          this.selectedRow.name = this.CnameU;
          this.selectedRow.status = this.CStatusU;
          this.selectedRow.status_name = this.options == undefined ? this.selectedRow.status_name : this.options;
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

  updateDataIntoDb(item: Category) {
    this.categoryService.updateItem(item).subscribe((resultData: any) => {
      Swal.fire("Item has been updated!", "", "success");
      this.categoryService.fetchAllItems();
    })
  }

  deleteItem(item: Category) {
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
        this.deleteItemfromDb(item);
      }
    });
  }

  deleteItemfromDb(item: Category) {
    this.categoryService.deleteItem(item).subscribe((resultData: string) => {
      // console.log(resultData);
      Swal.fire({
        title: "Deleted!",
        text: "Item has been deleted.",
        icon: "success"
      });
      this.categoryService.fetchAllItems();
    });
  };

}
