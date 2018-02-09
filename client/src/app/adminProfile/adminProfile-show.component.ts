import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AdminProfile} from '../core/adminProfile/adminProfile';
import {AdminProfileService} from '../core/adminProfile/adminProfile.service';

@Component({
  selector: 'adminProfile-persist',
  templateUrl: './adminProfile-show.component.html'
})
export class AdminProfileShowComponent implements OnInit {

  adminProfile = new AdminProfile();

  constructor(private route: ActivatedRoute, private adminProfileService: AdminProfileService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.adminProfileService.get(+params['id']).subscribe((adminProfile: AdminProfile) => {
        this.adminProfile = adminProfile;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.adminProfileService.destroy(this.adminProfile).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/adminProfile','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
