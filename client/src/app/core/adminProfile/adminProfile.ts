

export class AdminProfile {
  id: number;
  salutation: string;
	firstName: string;
	middleInitial: string;
	lastName: string;
	nickName: string;
	position: string;

  constructor (object?: any) {
    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'asti.csd.recruitment.acl.AdminProfile : ' + (this.id ? this.id : '(unsaved)');
  }

}