import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {AdminAccountListComponent} from './adminAccount-list.component';
import {AdminAccountPersistComponent} from './adminAccount-persist.component';
import {AdminAccountShowComponent} from './adminAccount-show.component';
import { MainContentGuard } from "../guards/main-content-guard.service";

const routes: Routes = [
  {path: 'adminAccount', redirectTo: 'adminAccount/list', pathMatch: 'full', canActivate: [MainContentGuard]},
  {path: 'adminAccount/list', component: AdminAccountListComponent, canActivate: [MainContentGuard]},
  {path: 'adminAccount/create', component: AdminAccountPersistComponent, canActivate: [MainContentGuard]},
  {path: 'adminAccount/edit/:id', component: AdminAccountPersistComponent, canActivate: [MainContentGuard]},
  {path: 'adminAccount/show/:id', component: AdminAccountShowComponent, canActivate: [MainContentGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAccountRoutingModule {}