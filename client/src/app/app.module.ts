import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IndexComponent } from './index/index.component';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { NavService } from './nav/nav.service';
import { AppRoutingModule } from "./app-routing.module";
import { AdminAccountModule } from './adminAccount/adminAccount.module';
import { AdminProfileModule } from './adminProfile/adminProfile.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { MainContentGuard } from "./guards/main-content-guard.service";
import { LoginGuard } from "./guards/login-guard.service";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    IndexComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AdminAccountModule,
    AdminProfileModule
],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, AuthService, NavService, MainContentGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
