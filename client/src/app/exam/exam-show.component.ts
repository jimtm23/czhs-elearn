import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Exam} from '../core/exam/exam';
import {ExamService} from '../core/exam/exam.service';

@Component({
  selector: 'exam-persist',
  templateUrl: './exam-show.component.html'
})
export class ExamShowComponent implements OnInit {

  exam = new Exam();

  constructor(private route: ActivatedRoute, private examService: ExamService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.examService.get(+params['id']).subscribe((exam: Exam) => {
        this.exam = exam;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.examService.destroy(this.exam).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/exam','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
