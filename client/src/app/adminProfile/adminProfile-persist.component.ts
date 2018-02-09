import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AdminProfile} from '../core/adminProfile/adminProfile';
import {AdminProfileService} from '../core/adminProfile/adminProfile.service';
import {Response} from "@angular/http";


@Component({
  selector: 'adminProfile-persist',
  templateUrl: './adminProfile-persist.component.html'
})
export class AdminProfilePersistComponent implements OnInit {

  adminProfile = new AdminProfile();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private adminProfileService: AdminProfileService, private router: Router) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.adminProfileService.get(+params['id']).subscribe((adminProfile: AdminProfile) => {
          this.create = false;
          this.adminProfile = adminProfile;
        });
      }
      
    });
  }

  save() {
    this.adminProfileService.save(this.adminProfile).subscribe((adminProfile: AdminProfile) => {
      this.router.navigate(['/adminProfile', 'show', adminProfile.id]);
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
