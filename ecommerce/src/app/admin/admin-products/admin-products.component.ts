import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/models/product';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;
  pages: number[];

  constructor(private productService: ProductService, private router: Router) {
    //this.subscription = this.productService.getProducts().subscribe(products => this.products = products);

  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
  ngOnInit() {
    //this.products = this.productService.getProducts();

    this.productService.getProducts().subscribe(products => {
      this.filteredProducts = this.products = products
      console.log('Product length ' + this.products + ' length ' + this.products.length + ' rounded length ' + Math.ceil(this.products.length / 3));
      this.pages = new Array(Math.ceil(this.products.length / 3));
      this.products = this.products.slice(0, 3);

    });
  }

  pageNumberClicked(pagenumber) {
    let begin = (pagenumber - 1) * 3;
    let end = begin + 3;
    this.products = this.filteredProducts.slice(begin, end);
  }

  filter(searchvalue: String) {
    this.products = searchvalue ?
      this.products.filter(products => products.title.toLowerCase().indexOf(searchvalue.toLowerCase()) != -1) : this.filteredProducts;
    this.pages = new Array(Math.ceil(this.products.length / 3));
    this.products = this.products.slice(0, 3);
  }

  delete(id) {
    this.productService.deleteProduct(id);
    this.router.navigate(['/admin/products']);
  }

  sortAscTitle() {
    this.products = this.filteredProducts.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    this.products = this.products.slice(0, 3);
  }

  sortDescTitle() {
    this.products = this.filteredProducts.sort((a, b) => {
      return b.title.localeCompare(a.title);
    });
    this.products = this.products.slice(0, 3);
  }

  sortAscPrice() {
    this.products = this.filteredProducts.sort((a, b) => {
      return parseFloat(a.price) - parseFloat(b.price);
    });
    this.products = this.products.slice(0, 3);
  }

  sortDescPrice() {
    this.products = this.filteredProducts.sort((a, b) => {
      return parseFloat(b.price) - parseFloat(a.price);
    });
    this.products = this.products.slice(0, 3);
  }
}
