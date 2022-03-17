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
    Course = 6,
    CourseWithTutors = 7,
    TeacherAndDirectorGroup = 8
}

export class GroupEntity {
    id: string;
    name: string;
    type: GroupType;
}

export enum GroupType {
    Course = 1,
    Occupation = 2
}
