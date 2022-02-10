import { IUserRestrictionRepository } from "../domain/user-restriction-repository";
import Logger from "../../../shared/domain/logger";
import { RestrictionType, UserRestrictionEntity } from "../domain/user-restriction-entity";
import { MessageType } from "../../messages/domain/message-entity";
import { UserType } from "../../user-tokens/domain/user-token-entity";

export class UserRestrictionValidator {

    constructor(private repository: IUserRestrictionRepository, private logger: Logger) { }

    async validate(userRestricted: string, userId: string, userType: UserType, messageType: MessageType): Promise<boolean> {
        let result = true;
        let restrictionFound: Array<UserRestrictionEntity> = await this.repository.findRestrictions(userRestricted, userId, userType);
        this.logger.info(`Found ${restrictionFound.length} restrictions`);
        switch (messageType) {
            case MessageType.Text:
                if (restrictionFound.filter(r=>r.restrictionType == RestrictionType.Mute).length > 0) {
                    result = false;
                }
                break;
            case MessageType.TextWithImage:
                if (restrictionFound.filter(r=>r.restrictionType == RestrictionType.SendImages).length > 0) {
                    result = false;
                }
                break;
            case MessageType.TextWithVideo:
                if (restrictionFound.filter(r=>r.restrictionType == RestrictionType.SendVideos).length > 0) {
                    result = false;
                }
                break;
            case MessageType.Document:
                if (restrictionFound.filter(r=>r.restrictionType == RestrictionType.SendDocuments).length > 0) {
                    result = false;
                }
                break;
            case MessageType.Audio:
                if (restrictionFound.filter(r=>r.restrictionType == RestrictionType.Mute).length > 0) {
                    result = false;
                }
                break;
        }
        return result;
    }
}