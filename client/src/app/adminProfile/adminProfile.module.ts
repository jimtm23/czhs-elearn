import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AdminProfileRoutingModule} from './adminProfile-routing.module';
import {AdminProfileShowComponent} from './adminProfile-show.component';
import {AdminProfileListComponent} from './adminProfile-list.component';
import {AdminProfilePersistComponent} from './adminProfile-persist.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    AdminProfileListComponent,
    AdminProfilePersistComponent,
    AdminProfileShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminProfileRoutingModule,
    CoreModule
]
})
export class AdminProfileModule {}