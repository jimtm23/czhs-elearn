import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AdminAccountService } from './adminAccount/adminAccount.service';
import { AdminProfileService } from './adminProfile/adminProfile.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
  ],
providers: [
    AdminAccountService,
    AdminProfileService
]
})
export class CoreModule {}