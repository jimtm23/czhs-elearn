import {Component} from '@angular/core';
import {NavService} from './nav.service';
import {OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  applicationData: any;
  isLoggedIn$: Observable<Boolean>;

  constructor(private navService: NavService, private authService: AuthService) { 
  }
  
  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    console.log(this.authService.getToken());
    this.navService.getNavData().subscribe(res => this.applicationData = res);
  }

  logout() {
    this.authService.logout();
  }
}
