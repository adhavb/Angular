import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingComponent } from './shopping/shopping.component';
import { HomeComponent } from './home.component';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { AuthguardService } from './authguard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';

const routes: Routes = [
  { path: '', pathMatch: "full", component: ProductsComponent },
  { path: 'shopping', component: ShoppingComponent },
  { path: 'home', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products/productdetails/:id', component: ProductDetailsComponent },

  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthguardService] },
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthguardService] },
  { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthguardService] },
  { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthguardService] },
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthguardService] },
  { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthguardService] },
  { path: 'my/orders', component: MyOrderComponent, canActivate: [AuthguardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
