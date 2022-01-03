export class ContactEntity {
    id: string;
    name: string;
    contactType: ContactType;

    constructor(id: string, name: string, contactType: ContactType) {
        this.id = id;
        this.name = name;
        this.contactType = contactType;
    }
}

export enum ContactType {
    Tutor = 1,
    Student = 2,
    Teacher = 3,
    Director = 4,
    Staff = 5,
    Course = 6
}