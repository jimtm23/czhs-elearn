import {Component, OnInit} from '@angular/core';
import {StudentAnswer} from '../core/studentAnswer/studentAnswer';
import {StudentAnswerService} from '../core/studentAnswer/studentAnswer.service';

@Component({
  selector: 'studentAnswer-list',
  templateUrl: './studentAnswer-list.component.html'
})
export class StudentAnswerListComponent implements OnInit {

  studentAnswerList: StudentAnswer[] = [];

  constructor(private studentAnswerService: StudentAnswerService) { }

  ngOnInit() {
    this.studentAnswerService.list().subscribe((studentAnswerList: StudentAnswer[]) => {
      this.studentAnswerList = studentAnswerList;
    });
  }
}
