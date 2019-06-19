import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { Cart } from './models/cart';
import { DataService } from './data.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user: firebase.User;
  email: string;
  itemCount: number;
  cart$: Cart[];
  constructor(public authservice: AuthService, private router: Router, private productService: ProductService, private dataService: DataService) {
    this.authservice.user.subscribe(user => {
      this.email = user.email;
      this.authservice.verifyUser(this.email);
      this.user = user;
    });
  }
  async ngOnInit() {
    this.cart$ = await this.productService.getCart('1');
    this.dataService.changeCart(this.cart$);
    this.itemCount = 0;
    this.cart$.forEach(cart => this.itemCount += cart.quantity);
  }
  logout() {
    this.authservice.logout();
    this.router.navigate(['/']);
  }

  login() {
    this.authservice.login();
  }
}
