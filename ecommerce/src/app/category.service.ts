import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {

  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:8080/product/categories');
  }
  saveCategory(form) {
    console.log(form);
    //this.http.post("http://localhost:8080/savecategory", form);
  }
}
