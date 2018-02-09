import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

    isLoggedIn: Boolean;

    constructor(private router: Router, private authService: AuthService) {
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.authService.isLoggedIn.subscribe(data => this.isLoggedIn = data);
        if (!this.isLoggedIn) {
            return true;
        } else {
            this.router.navigate(['index']);
            return false;
        }
    }


}
