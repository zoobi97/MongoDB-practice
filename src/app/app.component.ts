import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddGroceryItemsComponent } from "./MyComponents/add-grocery-items/add-grocery-items.component";
import { AllGroceryItemsComponent } from "./MyComponents/all-grocery-items/all-grocery-items.component";
import { CategoryComponent } from './MyComponents/category/category.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddGroceryItemsComponent, AllGroceryItemsComponent,CategoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SpringBackend';
}
