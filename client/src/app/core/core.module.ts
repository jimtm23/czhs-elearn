import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AdminAccountService } from './adminAccount/adminAccount.service';
import { AdminProfileService } from './adminProfile/adminProfile.service';
import { ExamService } from './exam/exam.service';
import { StudentAnswerService } from './studentAnswer/studentAnswer.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
  ],
providers: [
    AdminAccountService,
    AdminProfileService,
    ExamService,
    StudentAnswerService
]
})
export class CoreModule {}