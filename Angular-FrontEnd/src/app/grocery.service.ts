import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { GroceryItems } from './GroceryItems';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  private apiUrl = 'http://localhost:8080'; // Base URL for your API

  private itemsSource = new BehaviorSubject<GroceryItems[]>([]);
  currentItems = this.itemsSource.asObservable();


  constructor(private http: HttpClient) {}

  fetchAllItems() {
    this.http.get<GroceryItems[]>("http://localhost:8080/getGroceryItems").subscribe((data: GroceryItems[]) => {
      this.itemsSource.next(data);
    });
  }

  getItemById(item: GroceryItems): Observable<GroceryItems>{
    return this.http.get<GroceryItems>(`${this.apiUrl}/getGroceryItemById/${item.id}` ,{responseType: 'json'})
  }

  addItem(item: GroceryItems): Observable<any> {
    return this.http.post(`${this.apiUrl}/addGroceryItem`, item, { responseType: 'json' });
  }

  updateItem(item: GroceryItems): Observable<any>{
    return this.http.put(`${this.apiUrl}/updateGroceryItem/${item.id}`, item, { responseType: 'json' });
  }

  deleteItem(item: GroceryItems): Observable<any>{
    return this.http.delete(`${this.apiUrl}/deleteGroceryItems/${item.id}`,{ responseType:'text'});
  }
}
