import { Express } from 'express';
import container from './../dependency-injection';
import { SendMessage } from '../api/endpoints/messages/SendMessage';
import { ConfirmMessage } from '../api/endpoints/messages/ConfirmMessage';

export const register = (app: Express) => {
  const messageSenderController: SendMessage = container.get(
    'endpoints.messages.send'
  );

  const confirmMessageController: ConfirmMessage = container.get(
    'endpoints.messages.confirm'
  );

  app.post('/send-message', messageSenderController.run.bind(messageSenderController));
  app.post('/confirm-message', confirmMessageController.run.bind(confirmMessageController));
};
