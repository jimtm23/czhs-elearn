import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {StudentAnswer} from './studentAnswer';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth.service';

@Injectable()
export class StudentAnswerService {

  private baseUrl = environment.serverUrl;
  private header = new Headers({ "X-Auth-Token": this.authService.getToken() });

  constructor(private http: Http, private authService: AuthService) {
  }

  list(): Observable<StudentAnswer[]> {
    let subject = new Subject<StudentAnswer[]>();
    this.http.get(this.baseUrl + 'api/studentAnswer', {headers: this.header})
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new StudentAnswer(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<StudentAnswer> {
    return this.http.get(this.baseUrl + 'studentAnswer/'+id)
      .map((r: Response) => new StudentAnswer(r.json()));
  }

  save(studentAnswer: StudentAnswer): Observable<StudentAnswer> {
    const requestOptions = new RequestOptions();
    if (studentAnswer.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'api/studentAnswer/' + studentAnswer.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'api/studentAnswer';
    }
    alert(JSON.stringify(studentAnswer));
    requestOptions.body = JSON.stringify(studentAnswer);
    requestOptions.headers = new Headers({ "Content-Type": "application/json", "X-Auth-Token": this.authService.getToken() });

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new StudentAnswer(r.json()));
  }

  destroy(studentAnswer: StudentAnswer): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'studentAnswer/' + studentAnswer.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}