import { ConfirmMessageCommand } from "../../../api/endpoints/messages/message.dto";
import Logger from "../../../shared/domain/logger";
import MySqlMessageRepository from "../infrastructure/persistence/mysql/MySqlMessageRepository";

export class MessageConfirmer {
    constructor(private messageRepository: MySqlMessageRepository, private logger: Logger) {}

    async confirmReceivedMessage(message: ConfirmMessageCommand): Promise<number> {
        this.logger.info("MessageConfirmer: ConfirmMessageCommand->" + JSON.stringify(message));
        return await this.messageRepository.updateDestinationState(message.destinationState, new Date(message.receivedAt), message.id);
    }
}