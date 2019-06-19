import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/models/product';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { Cart } from 'src/app/models/cart';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  cart$: Cart[];
  modifiedCart: Cart;
  quantity = 0;
  updatedQuantity = 0;
  disableButton = true;
  total = 0;
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService,
    private shoppingCartService: ShoppingCartService, private router: Router, private dataService: DataService) { }

  ngOnInit() {

    let productid = this.activatedRoute.snapshot.paramMap.get('id');
    this.quantity = parseInt(this.activatedRoute.snapshot.queryParamMap.get('quantity'));
    this.updatedQuantity = this.quantity;
    this.quantity = this.quantity == 0 ? 1 : this.quantity;
    this.dataService.currentCart.subscribe(cart => this.cart$ = cart);

    this.disableButton = false;
    if (productid) {
      this.productService.getProduct(productid).subscribe(product => {
        this.product = product;
        this.total = parseFloat(this.product.price);
      });

    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity = this.quantity - 1;
      this.total = parseFloat(this.product.price) * this.quantity;
      this.disableButton = this.quantity == this.updatedQuantity ? false : true;
    }
  }

  increaseQuantity() {
    this.quantity = this.quantity + 1;
    this.total = parseFloat(this.product.price) * this.quantity;
    this.disableButton = this.quantity == this.updatedQuantity ? false : true;
  }

  async addToCart(product: Product) {
    if (this.quantity === 0) {
      alert("Quantity is not selected");
      return;
    }
    this.shoppingCartService.addToCart(product, this.quantity);
    this.cart$ = await this.productService.getCart('1');
    console.log('after adding to cart ' + JSON.stringify(this.cart$));
    this.dataService.changeCart(this.cart$);
    location.replace('/home');
  }

  updateCart(product: Product) {
    let index = this.cart$.findIndex(cart => cart.productid == product.id);
    this.cart$[index].quantity = this.quantity;
    this.modifiedCart = this.cart$[index];
    this.dataService.changeCart(this.cart$);
    console.log('Cart after updating ' + JSON.stringify(this.cart$));
    this.shoppingCartService.updateCart(this.modifiedCart.id, this.quantity);
    this.router.navigate(['/home']);

  }

  deleteCart(product: Product) {
    let index = this.cart$.findIndex(cart => cart.productid == product.id);
    this.cart$ = this.cart$.filter(cart => cart.productid != product.id);
    this.dataService.changeCart(this.cart$);
    this.shoppingCartService.deleteCart(this.cart$[index].id);
    //this.router.navigate(['/home']);
    this.router.navigateByUrl('/home');
  }

}
