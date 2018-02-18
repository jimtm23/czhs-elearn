import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Exam} from './exam';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth.service';

@Injectable()
export class ExamService {

  private baseUrl = environment.serverUrl;
  private header = new Headers({ "X-Auth-Token": this.authService.getToken() });
  constructor(private http: Http, private authService: AuthService) {
  }

  list(): Observable<Exam[]> {
    let subject = new Subject<Exam[]>();
    this.http.get(this.baseUrl + 'api/exam', {headers: this.header})
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Exam(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Exam> {
    return this.http.get(this.baseUrl + 'api/exam/'+id, {headers: this.header})
      .map((r: Response) => new Exam(r.json()));
  }

  save(exam: Exam): Observable<Exam> {
    const requestOptions = new RequestOptions();
    if (exam.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'api/exam/' + exam.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'api/exam';
    }
    requestOptions.body = JSON.stringify(exam);
    requestOptions.headers = new Headers({ "Content-Type": "application/json", "X-Auth-Token": this.authService.getToken() });

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Exam(r.json()));
  }

  destroy(exam: Exam): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'exam/' + exam.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}