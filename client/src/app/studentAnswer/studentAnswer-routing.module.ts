import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {StudentAnswerListComponent} from './studentAnswer-list.component';
import {StudentAnswerPersistComponent} from './studentAnswer-persist.component';
import {StudentAnswerShowComponent} from './studentAnswer-show.component';

const routes: Routes = [
  {path: 'studentAnswer', redirectTo: 'studentAnswer/list', pathMatch: 'full'},
  {path: 'studentAnswer/list', component: StudentAnswerListComponent},
  {path: 'studentAnswer/create', component: StudentAnswerPersistComponent},
  {path: 'studentAnswer/edit/:id', component: StudentAnswerPersistComponent},
  {path: 'studentAnswer/show/:id', component: StudentAnswerShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentAnswerRoutingModule {}