import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {AdminProfileListComponent} from './adminProfile-list.component';
import {AdminProfilePersistComponent} from './adminProfile-persist.component';
import {AdminProfileShowComponent} from './adminProfile-show.component';
import { MainContentGuard } from "../guards/main-content-guard.service";

const routes: Routes = [
  {path: 'adminProfile', redirectTo: 'adminProfile/list', pathMatch: 'full'},
  {path: 'adminProfile/list', component: AdminProfileListComponent, canActivate: [MainContentGuard]},
  {path: 'adminProfile/create', component: AdminProfilePersistComponent, canActivate: [MainContentGuard]},
  {path: 'adminProfile/edit/:id', component: AdminProfilePersistComponent, canActivate: [MainContentGuard]},
  {path: 'adminProfile/show/:id', component: AdminProfileShowComponent, canActivate: [MainContentGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProfileRoutingModule {}