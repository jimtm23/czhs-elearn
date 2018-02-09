import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AdminAccount} from '../core/adminAccount/adminAccount';
import {AdminAccountService} from '../core/adminAccount/adminAccount.service';
import {Response} from "@angular/http";
import { AdminProfileService } from '../core/adminProfile/adminProfile.service';
import { AdminProfile } from '../core/adminProfile/adminProfile';

@Component({
  selector: 'adminAccount-persist',
  templateUrl: './adminAccount-persist.component.html'
})
export class AdminAccountPersistComponent implements OnInit {

  adminAccount = new AdminAccount();
  adminProfile = new AdminProfile();
  create = true;
  errors: any[];
  adminProfileList: AdminProfile[];

  constructor(private route: ActivatedRoute, private adminAccountService: AdminAccountService, private router: Router, private adminProfileService: AdminProfileService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.adminAccountService.get(+params['id']).subscribe((adminAccount: AdminAccount) => {
          this.create = false;
          this.adminAccount = adminAccount;
          this.adminProfile = adminAccount.profile;
        });
      }

    });
  }

  save() {
    this.adminAccountService.save(this.adminProfile, this.adminAccount).subscribe((adminAccount: AdminAccount) => {
      this.router.navigate(['/adminAccount', 'show', adminAccount.id]);
    }, (res: Response) => {
      const json = res.json();
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        this.errors = json._embedded.errors;
      }
    });
  }

}
