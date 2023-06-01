import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ParentComponentComponent } from './components/parent-component/parent-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderConfirmedComponent } from './components/order-confirmed/order-confirmed.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';

import { AuthGuard } from './guards/auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { OwnerManagementComponent } from './components/owner-management/owner-management.component';
const routes: Routes = [

  {
    path: '',
    component: LandingPageComponent,
    // pathMatch: 'full'
  },
  {
    path: '',
    component: ParentComponentComponent,
    children: [{
      path: 'product-list/:id',
      component: ProductListComponent
    },
    {
      path: 'cart',
      component: CartComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'signup',
      component: SignupComponent
    },
    {
      path: 'profile',
      component: SignupComponent
    },

    {
      path: 'my_orders',
      component: MyOrdersComponent,
      canActivate: [AuthGuard]
    }
  ]
  },
  {
    path: 'order-confirmed',
    component: OrderConfirmedComponent
  },
  {
    path: 'owner_management',
    component: OwnerManagementComponent,
    canActivate: [PermissionsGuard]
  },
]
const routeOptions: ExtraOptions = {
  useHash: true,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
}
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ProductListComponent,
    ParentComponentComponent,
    CartComponent,
    LoginComponent,
    SignupComponent,
    MyOrdersComponent,
    OrderConfirmedComponent,
    FooterComponent,
    LoadingComponent,
    OwnerManagementComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes,{
      anchorScrolling: 'enabled'
    }),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    GoogleMapsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    BrowserAnimationsModule,


  ],
  providers: [ AuthGuard,PermissionsGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
