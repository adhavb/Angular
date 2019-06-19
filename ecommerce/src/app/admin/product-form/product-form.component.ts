import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/models/product';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories: Category[];
  product: Product = {
    id: null,
    title: null,
    price: null,
    category: null,
    imageUrl: null
  }
  lproduct;

  constructor(private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) this.productService.getProduct(id).subscribe(product => this.product = product);

  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }
  save(productform) {
    this.product = this.productService.saveProduct(productform);
    this.router.navigate(['/admin/products']);

  }

  update(productform, id) {
    console.log(productform);
    this.productService.updateProduct(productform, id);
    this.router.navigate(['/admin/products']);

  }


  getProduct(id) {
    this.lproduct = this.productService.getProduct(id);
  }

}
