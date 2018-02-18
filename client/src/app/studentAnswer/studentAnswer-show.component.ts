import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StudentAnswer} from '../core/studentAnswer/studentAnswer';
import {StudentAnswerService} from '../core/studentAnswer/studentAnswer.service';

@Component({
  selector: 'studentAnswer-persist',
  templateUrl: './studentAnswer-show.component.html'
})
export class StudentAnswerShowComponent implements OnInit {

  studentAnswer = new StudentAnswer();

  constructor(private route: ActivatedRoute, private studentAnswerService: StudentAnswerService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.studentAnswerService.get(+params['id']).subscribe((studentAnswer: StudentAnswer) => {
        this.studentAnswer = studentAnswer;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.studentAnswerService.destroy(this.studentAnswer).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/studentAnswer','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
