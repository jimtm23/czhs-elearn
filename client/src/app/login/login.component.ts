import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent {
    email: string;
    password: string;
    invalidLogin: Boolean = false;
    constructor(
        private router: Router,
        private authService: AuthService
    ){}

    ngOnInit() {
        localStorage.removeItem('user');
    }
 
    login() {
        this.authService.login(this.email, this.password)
            .subscribe(
                res => {
                    if (res === true) {
                        this.router.navigate(['index']);
                    } else {
                        console.log("mali")
                    }
                }, 
                error => {
                    this.invalidLogin = true;
                    console.log( error )
                }
            )
    }
}
