import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Cart } from './models/cart';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cart: Cart[];
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private httpClient: HttpClient, private authService: AuthService, private dataService: DataService) { }

  async addToCart(product: Product, quantity: number) {
    await this.httpClient.post('http://localhost:8080/cart/save', JSON.stringify({
      productid: product.id,
      price: product.price,
      quantity: quantity,
      userid: this.authService.userDetails.id
    }),
      { headers: this.headers }).toPromise();
  }

  async updateCart(cartId: string, quantity: number) {
    await this.httpClient.put('http://localhost:8080/cart/update/' + cartId + '/' + quantity,
      { headers: this.headers }).toPromise();
  }

  async deleteCart(cartId: string) {
    await this.httpClient.delete('http://localhost:8080/cart/delete/' + cartId,
      { headers: this.headers }).toPromise();
  }

  async clearCart() {
    await this.httpClient.delete('http://localhost:8080/cart/clear/' + this.authService.userDetails.id,
      { headers: this.headers }).toPromise();

  }

  addAnonymousCart(product: Product, cartid: string) {
    /*this.httpClient.post('http://localhost:8080/order/anonymous/save', JSON.stringify({
      productid: product.id,
      price: product.price,
      quantity: 1,
      userid: cartid
    }),
      { headers: this.headers }).subscribe();*/
  }

  getAnonymousCart(cartid) {
    this.httpClient.get('http://localhost:8080/order/getanonymousorder/' + cartid);
  }

}


