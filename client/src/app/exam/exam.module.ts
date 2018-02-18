import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {ExamRoutingModule} from './exam-routing.module';
import {ExamShowComponent} from './exam-show.component';
import {ExamListComponent} from './exam-list.component';
import {ExamPersistComponent} from './exam-persist.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    ExamListComponent,
    ExamPersistComponent,
    ExamShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ExamRoutingModule,
    CoreModule
]
})
export class ExamModule {}