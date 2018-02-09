import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AdminProfile} from './adminProfile';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { environment } from '../../../environments/environment';

@Injectable()
export class AdminProfileService {

  private baseUrl = environment.serverUrl;

  constructor(private http: Http) {
  }

  list(): Observable<AdminProfile[]> {
    let subject = new Subject<AdminProfile[]>();
    this.http.get(this.baseUrl + 'adminProfile')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new AdminProfile(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<AdminProfile> {
    return this.http.get(this.baseUrl + 'adminProfile/'+id)
      .map((r: Response) => new AdminProfile(r.json()));
  }

  save(adminProfile: AdminProfile): Observable<AdminProfile> {
    const requestOptions = new RequestOptions();
    if (adminProfile.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'adminProfile/' + adminProfile.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'adminProfile';
    }
    requestOptions.body = JSON.stringify(adminProfile);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new AdminProfile(r.json()));
  }

  destroy(adminProfile: AdminProfile): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'adminProfile/' + adminProfile.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}