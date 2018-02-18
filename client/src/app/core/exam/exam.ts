

export class Exam {
  id: number;

  optionD: string;
  correctAnswer: string;
  optionA: string;
  optionB: string;
  optionC: string;
  question: string;

  constructor (object?: any) {
    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'czhs.elearn.Exam : ' + (this.id ? this.id : '(unsaved)');
  }
}