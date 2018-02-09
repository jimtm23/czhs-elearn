import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AdminAccount} from '../core/adminAccount/adminAccount';
import {AdminAccountService} from '../core/adminAccount/adminAccount.service';
import { AdminProfile } from '../core/adminProfile/adminProfile';

@Component({
  selector: 'adminAccount-persist',
  templateUrl: './adminAccount-show.component.html'
})
export class AdminAccountShowComponent implements OnInit {

  adminAccount = new AdminAccount();
  adminProfile = new AdminProfile();
  constructor(private route: ActivatedRoute, private adminAccountService: AdminAccountService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.adminAccountService.get(+params['id']).subscribe((adminAccount: AdminAccount) => {
        this.adminAccount = adminAccount;
        this.adminProfile = adminAccount.profile;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.adminAccountService.destroy(this.adminAccount).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/adminAccount','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
