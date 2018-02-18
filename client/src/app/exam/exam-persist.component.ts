import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Exam} from '../core/exam/exam';
import {ExamService} from '../core/exam/exam.service';
import {Response} from "@angular/http";


@Component({
  selector: 'exam-persist',
  templateUrl: './exam-persist.component.html'
})
export class ExamPersistComponent implements OnInit {

  exam = new Exam();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private examService: ExamService, private router: Router) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.examService.get(+params['id']).subscribe((exam: Exam) => {
          this.create = false;
          this.exam = exam;
        });
      }
      
    });
  }

  save() {
    this.examService.save(this.exam).subscribe((exam: Exam) => {
      this.router.navigate(['/exam', 'show', exam.id]);
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
