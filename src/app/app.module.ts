import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterModule, Routes, CanActivate  } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatButtonModule, MatMenuModule,
  MatToolbarModule, MatIconModule,
  MatCardModule, MatFormFieldModule,
  MatInputModule, MatListModule,
  MatCheckboxModule, MatSidenavModule,
  MatDatepickerModule, MatNativeDateModule,
  MatRadioModule, MatSelectModule,
  MatOptionModule, MatSlideToggleModule,
  MatChipsModule,
  MatTableModule,
  MatProgressBarModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
  MatSnackBarModule, MatPaginatorModule,
  MatSortModule, MatDialogModule, MatBadgeModule, MatDividerModule
} from '@angular/material';
import { JwtModule } from '@auth0/angular-jwt';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { MyOrdersComponent } from './components/users/my-orders/my-orders.component';
import { MyAdrComponent } from './components/users/my-adr/my-adr.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { CartComponent } from './components/orders/cart/cart.component';
import { CashoutComponent } from './components/orders/cashout/cashout.component';

import { CompareValidatorDirective } from './directives/compare-validator.directive';
import { UserService } from './services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenInterceptor } from './services/token.interceptor';
import { ProductService } from './services/product.service';
import { RoleGuardService as RoleGuard } from './services/role-guard.service';
import { PanelComponent } from './components/admin/panel/panel.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { SafePipe } from './directives/safe.pipe';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

const routes: Routes = [
  { path: 'home', component: DashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'my-addresses', component: MyAdrComponent, canActivate: [AuthService]},
  { path: 'my-orders', component: MyOrdersComponent},
  { path: 'pnf', component: PageNotFoundComponent },
  { path: 'products/:opt', component: ProductsComponent },
  { path: 'product/:id', component: ProductInfoComponent },
  { path: 'cart', component: CartComponent },
  { path: 'cashout', component: CashoutComponent },
  { path: 'panel', component: PanelComponent, canActivate: [RoleGuard],  data: { expectedRole: '_admin0'} },
  {path: '**', redirectTo: 'pnf'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    CompareValidatorDirective,
    MyOrdersComponent,
    MyAdrComponent,
    DialogComponent,
    PageNotFoundComponent,
    ProductsComponent,
    ProductInfoComponent,
    CartComponent,
    CashoutComponent,
    PanelComponent,
    OrdersComponent,
    ProductListComponent,
    SafePipe
  ],
  imports: [
    JwtModule.forRoot({config:
      {tokenGetter: tokenGetter}}),
      MatBadgeModule,
      MatChipsModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
    MatPasswordStrengthModule.forRoot(),
    MatProgressBarModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatOptionModule,
    MatSelectModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    FileUploadModule,
    MatGridListModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'}),
    BrowserAnimationsModule,
    BrowserModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  entryComponents: [ DialogComponent ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    ProductService,
    JwtHelperService,
    AuthService,
    CookieService,
    UserService,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
