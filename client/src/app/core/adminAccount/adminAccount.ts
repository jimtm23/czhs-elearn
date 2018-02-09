import { AdminProfile } from '../adminProfile/adminProfile';

export class AdminAccount {
  id: number;

  password: string;
  username: string;
  retypePassword: string;
  profile: AdminProfile;

  constructor (object?: any) {
    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'asti.csd.recruitment.acl.AdminAccount : ' + (this.id ? this.id : '(unsaved)');
  }

  getFullName(): string {
    return this.profile.salutation +" "+this.profile.firstName+" "+((this.profile.middleInitial == null) ? '' : this.profile.middleInitial.toUpperCase())+" "+this.profile.lastName;
  }
}