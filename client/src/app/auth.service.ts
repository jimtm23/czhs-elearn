import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { Router } from "@angular/router";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
    
    private baseUrl = environment.serverUrl;
    private headers = new Headers({'Content-Type': 'application/json'});
    private loggedIn: Subject<Boolean> = new BehaviorSubject<boolean>(null);

    constructor(private http: Http, private router: Router) { }

    get isLoggedIn() {
        this.loggedIn.next(localStorage.getItem('user') != null);
        return this.loggedIn.asObservable();
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post(
            this.baseUrl+'api/login', 
            JSON.stringify({username: username, password: password}),
            {headers: this.headers}
        )
        .map((response: Response) => {
            console.log(response.json())
            let token = response.json().access_token;
            if (token) {
                localStorage.setItem('user', token);
                this.loggedIn.next(localStorage.getItem('user') != null);
                return true;
            } else {
                return false;
            }
        })
        .catch((error:any) => {
            if (error.status === 401) {
                return Observable.throw('Unauthorized');
            } else {
                return Observable.throw(error.json().error || 'Server error')
            }
        });
    }

    logout() {
        localStorage.clear();
        this.loggedIn.next(false);
        this.router.navigate(['login']);
    }

    getToken() {
        return localStorage.getItem('user');
    }

    validateTokent() {
        
    }
}