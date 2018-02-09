import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AdminAccount} from './adminAccount';
import { AdminProfile } from "../adminProfile/adminProfile";
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth.service';

@Injectable()
export class AdminAccountService {

  private baseUrl = environment.serverUrl;

  constructor(private http: Http, private authService: AuthService) {
    
  }

  list(): Observable<AdminAccount[]> {
    let subject = new Subject<AdminAccount[]>();
    let header = new Headers({"X-Auth-Token": this.authService.getToken()});
    this.http.get(this.baseUrl + 'api/adminAccount', {headers: header})
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        console.log(json);
        subject.next(json.map((item: any) => new AdminAccount(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<AdminAccount> {
    let header = new Headers({"X-Auth-Token": this.authService.getToken()});
    return this.http.get(this.baseUrl + 'api/adminAccount/'+id, {headers: header})
      .map((r: Response) => new AdminAccount(r.json()));
  }

  save(adminProfile: AdminProfile,adminAccount: AdminAccount): Observable<AdminAccount> {
    const requestOptions = new RequestOptions();
    if (adminAccount.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'api/adminAccount/' + adminAccount.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'api/adminAccount';
    }
    
    const data = {adminAccount: adminAccount, adminProfile: adminProfile}
    requestOptions.body = JSON.stringify(data);
    requestOptions.headers = new Headers({"Content-Type": "application/json", "X-Auth-Token": this.authService.getToken()});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new AdminAccount(r.json()));
  }

  destroy(adminAccount: AdminAccount): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'api/adminAccount/' + adminAccount.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }

  getProvince(region: string) {
    let subject = new Subject<any[]>();
    let header = new Headers({"X-Auth-Token": this.authService.getToken()});
    this.http.get(this.baseUrl+'/api/adminAccount/getProvince', {headers: header})
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => item))
      });
      return subject.asObservable();
  }
}