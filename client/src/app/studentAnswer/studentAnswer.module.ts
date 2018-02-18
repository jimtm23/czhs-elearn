import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {StudentAnswerRoutingModule} from './studentAnswer-routing.module';
import {StudentAnswerShowComponent} from './studentAnswer-show.component';
import {StudentAnswerListComponent} from './studentAnswer-list.component';
import {StudentAnswerPersistComponent} from './studentAnswer-persist.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    StudentAnswerListComponent,
    StudentAnswerPersistComponent,
    StudentAnswerShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StudentAnswerRoutingModule,
    CoreModule
]
})
export class StudentAnswerModule {}