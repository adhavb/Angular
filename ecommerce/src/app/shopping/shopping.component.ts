import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { DataService } from '../data.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  products: Product[];
  carts: Cart[];
  tmpProduct: Product[];
  totalPrice: number;
  itemCount: number;

  constructor(private productService: ProductService, private dataService: DataService, private shoppingCart: ShoppingCartService) { }

  async ngOnInit() {
    this.products = await this.productService.getPromiseProducts();
    await this.dataService.currentCart.subscribe(cart$ => this.carts = cart$);
    this.totalPrice = 0;
    this.itemCount = 0;
    this.carts.forEach(cart => {
      this.totalPrice += parseFloat(cart.price) * cart.quantity;
      this.itemCount += cart.quantity;
    });
  }
  getProductName(productid: string) {
    this.tmpProduct = this.products.filter(products => products.id === productid);
    return this.tmpProduct[0].title;
  }

  decreaseQuantity(cart: Cart) {

    if (cart.quantity > 1) {
      cart.quantity = cart.quantity - 1;
    }
    else {
      this.carts = this.carts.filter(tmpcart => cart.id != tmpcart.id);
    }
    this.totalPrice -= parseFloat(cart.price);
    this.itemCount = this.itemCount - 1;
  }

  increaseQuantity(cart: Cart) {
    cart.quantity = cart.quantity + 1;
    this.totalPrice += parseFloat(cart.price);
    this.itemCount = this.itemCount + 1;

  }
  clearCart() {
    this.shoppingCart.clearCart();
    this.dataService.changeCart(null);
    location.reload();
  }



}
