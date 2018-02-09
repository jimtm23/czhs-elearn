import {Component, OnInit} from '@angular/core';
import {AdminAccount} from '../core/adminAccount/adminAccount';
import {AdminAccountService} from '../core/adminAccount/adminAccount.service';

@Component({
  selector: 'adminAccount-list',
  templateUrl: './adminAccount-list.component.html'
})
export class AdminAccountListComponent implements OnInit {

  adminAccountList: AdminAccount[] = [];

  constructor(private adminAccountService: AdminAccountService) { }

  ngOnInit() {
    this.adminAccountService.list().subscribe((adminAccountList: AdminAccount[]) => {
      this.adminAccountList = adminAccountList;
    });
  }
}
