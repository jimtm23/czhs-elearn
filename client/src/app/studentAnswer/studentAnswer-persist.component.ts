import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StudentAnswer} from '../core/studentAnswer/studentAnswer';
import {StudentAnswerService} from '../core/studentAnswer/studentAnswer.service';
import {Response} from "@angular/http";
import { ExamService } from '../core/exam/exam.service';
import { Exam } from '../core/exam/exam';

@Component({
  selector: 'studentAnswer-persist',
  templateUrl: './studentAnswer-persist.component.html'
})
export class StudentAnswerPersistComponent implements OnInit {

  studentAnswer = new StudentAnswer();
  create = true;
  errors: any[];
  examList: Exam[];

  constructor(private route: ActivatedRoute, private studentAnswerService: StudentAnswerService, private router: Router, private examService: ExamService) {}

  ngOnInit() {
    this.examService.list().subscribe((examList: Exam[]) => { this.examList = examList; });
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.studentAnswerService.get(+params['id']).subscribe((studentAnswer: StudentAnswer) => {
          this.create = false;
          this.studentAnswer = studentAnswer;
        });
      }
      
      if (params.hasOwnProperty('examId')) {
        this.studentAnswer.question = new Exam({id: params['examId']})
      }

    });
  }

  save() {
    this.studentAnswerService.save(this.studentAnswer).subscribe((studentAnswer: StudentAnswer) => {
      // this.router.navigate(['/studentAnswer', 'show', studentAnswer.id]);
    }, (res: Response) => {
      const json = res.json();
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        this.errors = json._embedded.errors;
      }
    });
  }
}
