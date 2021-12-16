import { Express } from 'express';
import container from './../dependency-injection';
import SendMessage from './../api/endpoints/messages/send';
import MessageACK from './../api/endpoints/messages/ack';

export const register = (app: Express) => {
  const messageSenderController: SendMessage = container.get(
    'endpoints.messages.send'
  );

  const messageACKController: MessageACK = container.get(
    'endpoints.messages.ack'
  );

  app.post('/send-message', messageSenderController.run.bind(SendMessage));
  app.post('/confirm-message', messageACKController.run.bind(MessageACK));
};
