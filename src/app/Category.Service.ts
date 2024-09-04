import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from './Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080'; // Base URL for your API

  private itemsSource = new BehaviorSubject<Category[]>([]);
  currentItems = this.itemsSource.asObservable();


  constructor(private http: HttpClient) {}

  fetchAllItems() {
    this.http.get<Category[]>("http://localhost:8080/getCategories").subscribe((data: Category[]) => {
      this.itemsSource.next(data);
    });
  }

  getItemById(item: Category): Observable<Category>{
    return this.http.get<Category>(`${this.apiUrl}/getCategoryById/${item.id}` ,{responseType: 'json'})
  }

  getAllActiveCategories(){
    // return this.http.get<Category>(`${this.apiUrl}/getCategoryByStatus` ,{responseType: 'json'})
    this.http.get<Category[]>("http://localhost:8080/getCategoryByStatus").subscribe((data: Category[]) => {
      this.itemsSource.next(data);
    });
  }

  addItem(item: Category): Observable<any> {
    return this.http.post(`${this.apiUrl}/addCategory`, item, { responseType: 'json' });
  }

  updateItem(item: Category): Observable<any>{
    return this.http.put(`${this.apiUrl}/updateCategory/${item.id}`, item, { responseType: 'json' });
  }

  deleteItem(item: Category): Observable<any>{
    return this.http.delete(`${this.apiUrl}/deleteCategory/${item.id}`,{ responseType:'text'});
  }
}
