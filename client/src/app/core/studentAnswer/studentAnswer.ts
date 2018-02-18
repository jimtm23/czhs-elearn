import { Exam } from '../exam/exam';

export class StudentAnswer {
  id: number;

  answer: any;
  question: Exam;

  constructor (object?: any) {
    if (object) {
      
      if (object.hasOwnProperty('question')) {
        this.question = new Exam(object['question']);
        delete object['question'];
      }
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'czhs.elearn.StudentAnswer : ' + (this.id ? this.id : '(unsaved)');
  }
}