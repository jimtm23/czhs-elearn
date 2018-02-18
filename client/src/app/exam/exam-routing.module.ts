import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {ExamListComponent} from './exam-list.component';
import {ExamPersistComponent} from './exam-persist.component';
import {ExamShowComponent} from './exam-show.component';

const routes: Routes = [
  {path: 'exam', redirectTo: 'exam/list', pathMatch: 'full'},
  {path: 'exam/list', component: ExamListComponent},
  {path: 'exam/create', component: ExamPersistComponent},
  {path: 'exam/edit/:id', component: ExamPersistComponent},
  {path: 'exam/show/:id', component: ExamShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule {}