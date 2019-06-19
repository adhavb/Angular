import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { AuthService } from '../auth.service';
import { Cart } from '../models/cart';
import { forkJoin } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  carts: Cart[];
  categories;
  quantity: number;

  categoryid: string;
  user: firebase.User;
  userid: string;

  constructor(private route: ActivatedRoute, private productService: ProductService,
    private categoryService: CategoryService, private shoppingCartService: ShoppingCartService,
    public authservice: AuthService, private router: Router, private dataService: DataService) {
    this.authservice.user.subscribe(user => {
      this.user = user;
    });

    this.categories = this.categoryService.getCategories();
    this.route.queryParamMap.subscribe(params => this.categoryid = params.get('category'));
    if (!this.categoryid) this.categoryid = 'all';
  }

  async ngOnInit() {
    await this.productService.getProducts().subscribe(params => this.products = params);
    await this.dataService.currentCart.subscribe(cart$ => this.carts = cart$);

  }

  viewProductDetails(productid) {
    let index = this.carts.findIndex(cart => cart.productid == productid);
    this.router.navigate(['/products/productdetails/', productid], {
      queryParams: { 'quantity': index == -1 ? 0 : this.carts[index].quantity }
    });
  }

  addToCart(product) {
    if (!this.user.displayName) {
      let cartId = localStorage.getItem('cartid');
      if (!cartId)
        console.log('card id not generated');
      this.shoppingCartService.addAnonymousCart(product, cartId);
    }
    else {
      //this.shoppingCartService.addToCart(product);
    }
  }

  getAnonymousCart(cartid) {
    this.shoppingCartService.getAnonymousCart(cartid);
  }

}
