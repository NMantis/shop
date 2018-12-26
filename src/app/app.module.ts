import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatMenuModule,
  MatToolbarModule, MatIconModule,
  MatCardModule, MatFormFieldModule,
  MatInputModule, MatListModule,
  MatCheckboxModule, MatSidenavModule,
  MatDatepickerModule, MatNativeDateModule,
  MatRadioModule, MatSelectModule,
  MatOptionModule, MatSlideToggleModule,
  MatTableModule,
  MatProgressBarModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
  MatSnackBarModule, MatPaginatorModule,
  MatSortModule, MatDialogModule
} from '@angular/material';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { CompareValidatorDirective } from './directives/compare-validator.directive';

import { UserService } from './services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { MyOrdersComponent } from './components/users/my-orders/my-orders.component';
import { MyAddressesComponent } from './components/users/my-addresses/my-addresses.component';
import { MyAdrComponent } from './components/users/my-adr/my-adr.component';
import { DialogComponent } from './components/dialog/dialog.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'my-addresses', component: MyAdrComponent},
  { path: 'my-orders', component: MyOrdersComponent},

  {path: '**', redirectTo: ''}
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
    MyAddressesComponent,
    MyAdrComponent,
    DialogComponent
  ],
  imports: [
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  entryComponents: [ DialogComponent ],
  providers: [
    CookieService,
    UserService,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
