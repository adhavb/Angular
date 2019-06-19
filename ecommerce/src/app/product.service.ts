import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from './models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart } from './models/cart';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product: Product = null;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/product/getall');
  }

  getPromiseProducts(): Promise<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/product/getall').toPromise();
  }

  async getCart(id: string): Promise<Cart[]> {
    const result = await this.http.get<Cart[]>('http://localhost:8080/order/get/' + id).toPromise();
    return result;
  }

  /*getProducts() {
    return this.http.get('http://localhost:8080/product/getall').pipe(
      map(res => { return res; }));
  }*/


  getProduct(id) {
    return this.http.get<Product>('http://localhost:8080/product/get/' + id);
  }

  updateProduct(form, id) {
    this.http.put("http://localhost:8080/product/update/" + id, JSON.stringify({
      title: form.title,
      price: form.price,
      category: form.category,
      imageUrl: form.imageurl
    }),
      { headers: this.headers }
    ).subscribe();
  }

  deleteProduct(id) {
    this.http.delete("http://localhost:8080/product/delete/" + id).subscribe();
  }

  saveProduct(form) {

    this.http.post("http://localhost:8080/product/save", JSON.stringify({
      title: form.title,
      price: form.price,
      category: form.category,
      imageUrl: form.imageurl
    }),
      { headers: this.headers }
    ).subscribe();
    /*this.http.post("http://localhost:8080/product/save", JSON.stringify({
      title: form.title,
      price: form.price,
      category: form.category,
      imageUrl: form.imageurl
    }),
      { headers: headers }
    ).subscribe(
      (localproduct: Product) => {
        console.log('Inserted Successfully ' + localproduct.id);
        this.product = localproduct;
        console.log(this.product.title + " " + this.product.price + " " + this.product.category + " " + this.product.imageUrl);
   
      },
      error => {
        console.log('Insertion failed ' + error);
        this.product = null;
      });*/
    return this.product;

  }
}


