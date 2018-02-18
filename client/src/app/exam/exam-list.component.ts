import {Component, OnInit} from '@angular/core';
import {Exam} from '../core/exam/exam';
import {ExamService} from '../core/exam/exam.service';

@Component({
  selector: 'exam-list',
  templateUrl: './exam-list.component.html'
})
export class ExamListComponent implements OnInit {

  examList: Exam[] = [];

  constructor(private examService: ExamService) { }

  ngOnInit() {
    this.examService.list().subscribe((examList: Exam[]) => {
      this.examList = examList;
    });
  }
}
