import { TypeMapper } from "ts-mapper";
import { UserEntity } from "../domain/user-entity";
import { UserForUpdate } from "../domain/user-for-update";

export class UserProfile extends TypeMapper {
    constructor() {
        super();
        this.config();
    }

    private config(): void {
        this.createMap<UserEntity, UserForUpdate>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.name);
    }
}