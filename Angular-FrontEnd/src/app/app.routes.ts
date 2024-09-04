import { provideRouter, Routes } from '@angular/router';
import { AllGroceryItemsComponent } from './MyComponents/all-grocery-items/all-grocery-items.component';
import { CategoryComponent } from './MyComponents/category/category.component';

export const routes: Routes = [
    { path: '', component: AllGroceryItemsComponent },
    { path: 'category', component: CategoryComponent },
];

export const appRoutes = provideRouter(routes);

