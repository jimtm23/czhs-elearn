import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {IndexComponent} from "./index/index.component";
import { LoginComponent } from './login/login.component';
import {  } from "./app";
import { MainContentGuard } from "./guards/main-content-guard.service";
import { LoginGuard } from "./guards/login-guard.service";
1
const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full', canActivate: [MainContentGuard]},
  {path: 'index', component: IndexComponent, canActivate: [MainContentGuard]},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}