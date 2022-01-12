import { UserRestrictionEntity } from "./user-restriction-entity";

export interface IUserRestrictionRepository {
    save(userRestrictionEntity: UserRestrictionEntity): Promise<number>;
    delete(id: string, updatedAt: Date): Promise<number>;
    existsRestrictionById(id: string): Promise<UserRestrictionEntity>;
    existsRestriction(userRestricted: string, restrictionType:number, userId: string, userType: number): Promise<UserRestrictionEntity>;
    findRestrictions(userRestricted: string, userId: string, destinationType: number): Promise<Array<UserRestrictionEntity>>;
}