import { CreateUserRestrictionCommand, DeleteUserRestrictionCommand } from "./../endpoints/user-restrictions/user-restriction.dto";
import { UserRestrictionEntity } from "modules/user-restrictions/domain/user-restriction-entity";
import { TypeMapper } from "ts-mapper";

export class UserRestrictionProfile extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    
    config() {
        this.createMap<CreateUserRestrictionCommand, UserRestrictionEntity>()
            .map(src => src.userRestricted, dest => dest.userRestricted)
            .map(src => src.restrictionType, dest => dest.restrictionType)
            .map(src => src.userId, dest => dest.userId)
            .map(src => src.userType, dest => dest.userType)
            .map(src => src.state, dest => dest.state);

        this.createMap<UserRestrictionEntity, CreateUserRestrictionCommand>()
            .map(src => src.userRestricted, dest => dest.userRestricted)
            .map(src => src.restrictionType, dest => dest.restrictionType)
            .map(src => src.userId, dest => dest.userId)
            .map(src => src.userType, dest => dest.userType)
            .map(src => src.state, dest => dest.state);

        this.createMap<DeleteUserRestrictionCommand, UserRestrictionEntity>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.state, dest => dest.state);

            this.createMap<UserRestrictionEntity, DeleteUserRestrictionCommand>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.state, dest => dest.state);
    }
}