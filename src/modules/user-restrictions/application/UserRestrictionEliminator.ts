import { IUserRestrictionRepository } from "../domain/user-restriction-repository";
import Logger from "../../../shared/domain/logger";
import { DeleteUserRestrictionCommand, DeleteUserRestrictionResult } from "../../../api/endpoints/user-restrictions/user-restriction.dto";
import { UserRestrictionEntity } from "../domain/user-restriction-entity";
import moment from "moment";
import { UserRestrictionProfile } from "../../../api/mappers/user-restriction-profile";

export class UserRestrictionEliminator {

    private mapper: UserRestrictionProfile;

    constructor(private repository: IUserRestrictionRepository, private logger: Logger) { 
        this.mapper = new UserRestrictionProfile();
    }

    async delete(deleteUserRestriction: DeleteUserRestrictionCommand): Promise<DeleteUserRestrictionResult> {
        let userRestriction: UserRestrictionEntity = this.mapper.map<DeleteUserRestrictionCommand, UserRestrictionEntity>(deleteUserRestriction, new UserRestrictionEntity());
        userRestriction.id = deleteUserRestriction.id;
        userRestriction.updatedAt = new Date();
        this.logger.info(JSON.stringify(userRestriction));
        let restrictionFound = await this.repository.existsRestrictionById(deleteUserRestriction.id);
        if(restrictionFound != null) {
            await this.repository.delete(userRestriction.id, userRestriction.updatedAt);
        }else {
            throw new Error("No existe una restricciòn");
        }
        let userRestrictionResult: DeleteUserRestrictionResult = { id: null, updatedAt: null };
        userRestrictionResult.id = userRestriction.id;
        userRestrictionResult.updatedAt = moment(userRestriction.updatedAt).format("yyyy-MM-DD HH:mm:ss");
        return userRestrictionResult;
    }
}