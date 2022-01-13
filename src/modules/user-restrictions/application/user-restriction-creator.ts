import { IUserRestrictionRepository } from "./../domain/user-restriction-repository";
import Logger from "../../../shared/domain/logger";
import { CreateUserRestrictionCommand, CreateUserRestrictionResult } from "./../../../api/endpoints/user-restrictions/user-restriction.dto";
import { UserRestrictionEntity } from "./../domain/user-restriction-entity";
import { Uuid } from "./../../../shared/domain/value-object/Uuid";
import moment from "moment";
import { UserRestrictionProfile } from "./../../../api/mappers/user-restriction-profile";

export class UserRestrictionCreator {

    private mapper: UserRestrictionProfile;

    constructor(private repository: IUserRestrictionRepository, private logger: Logger) { 
        this.mapper = new UserRestrictionProfile();
    }

    async create(userRestrictionCreate: CreateUserRestrictionCommand): Promise<CreateUserRestrictionResult> {
        let userRestriction: UserRestrictionEntity = this.mapper.map<CreateUserRestrictionCommand, UserRestrictionEntity>(userRestrictionCreate, new UserRestrictionEntity());
        this.logger.info(JSON.stringify(userRestriction));
        let restrictionFound: UserRestrictionEntity = await this.repository.existsRestriction(userRestrictionCreate.userRestricted, userRestrictionCreate.restrictionType, userRestrictionCreate.userId, userRestrictionCreate.userType);
        if(restrictionFound == null) {
            userRestriction.id = Uuid.random().value;
            userRestriction.createdAt = new Date();
            await this.repository.save(userRestriction);
        }else {
            userRestriction = restrictionFound;
        }
        let userRestrictionResult: CreateUserRestrictionResult = { id: null, restrictionType: null, createdAt: null };
        userRestrictionResult.id = userRestriction.id;
        userRestrictionResult.restrictionType = userRestriction.restrictionType;
        userRestrictionResult.createdAt = moment(userRestriction.createdAt).format("yyyy-MM-DD HH:mm:ss");
        return userRestrictionResult;
    }
}