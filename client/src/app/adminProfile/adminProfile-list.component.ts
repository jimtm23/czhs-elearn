import {Component, OnInit} from '@angular/core';
import {AdminProfile} from '../core/adminProfile/adminProfile';
import {AdminProfileService} from '../core/adminProfile/adminProfile.service';

@Component({
  selector: 'adminProfile-list',
  templateUrl: './adminProfile-list.component.html'
})
export class AdminProfileListComponent implements OnInit {

  adminProfileList: AdminProfile[] = [];

  constructor(private adminProfileService: AdminProfileService) { }

  ngOnInit() {
    this.adminProfileService.list().subscribe((adminProfileList: AdminProfile[]) => {
      this.adminProfileList = adminProfileList;
    });
  }
}
