import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AdminAccountRoutingModule} from './adminAccount-routing.module';
import {AdminAccountShowComponent} from './adminAccount-show.component';
import {AdminAccountListComponent} from './adminAccount-list.component';
import {AdminAccountPersistComponent} from './adminAccount-persist.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    AdminAccountListComponent,
    AdminAccountPersistComponent,
    AdminAccountShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminAccountRoutingModule,
    CoreModule
]
})
export class AdminAccountModule {}