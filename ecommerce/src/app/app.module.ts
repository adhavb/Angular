import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { MenuComponent } from './menu.component';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { AuthguardService } from './authguard.service';
import { UserService } from './user.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { SelectRequiredValidatorDirective } from './select-required-validator.directive';
import {
  IconDelete,
  IconEdit2,
  IconSearch,
  IconEye,
  IconChevronDown,
  IconChevronUp,
  IconChevronsDown,
  IconChevronsUp
} from 'angular-feather';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { DataService } from './data.service';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';

const icons = [
  IconSearch,
  IconDelete,
  IconEdit2,
  IconEye,
  IconChevronUp,
  IconChevronDown,
  IconChevronsUp,
  IconChevronsDown
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShoppingComponent,
    MenuComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrderComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    SelectRequiredValidatorDirective,
    ProductDetailsComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule,
    CustomFormsModule,
    icons
  ],
  providers: [AuthService, AuthguardService, UserService, CategoryService, ProductService, ShoppingCartService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
