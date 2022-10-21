import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { DeliveryPaymentComponent } from './pages/delivery-payment/delivery-payment.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DiscountAdminComponent } from './pages/admin/discount-admin/discount-admin.component';
import { ProductAdminComponent } from './pages/admin/product-admin/product-admin.component';
import { CategoryAdminComponent } from './pages/admin/category-admin/category-admin.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ProductsComponent } from './pages/products/products.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { LoginComponent } from './pages/login/login.component';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { OrderComponent } from './pages/admin/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    DiscountsComponent,
    AboutUsComponent,
    DeliveryPaymentComponent,
    AdminComponent,
    DiscountAdminComponent,
    CategoryAdminComponent,
    ProductAdminComponent,
    ProductsComponent,
    ProductInfoComponent,
    DiscountInfoComponent,
    LoginComponent,
    CabinetComponent,
    OrderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
