import { Express } from 'express';
import container from '../dependency-injection';
import MessageSenderController from './../controllers/MessageSenderController';
import MessageSynchronizerController from './../controllers/MessageSynchronizerController';
import MessageACKController from './../controllers/MessageACKController';

export const register = (app: Express) => {
  const messageSenderController: MessageSenderController = container.get(
    'controllers.MessageSenderController'
  );
  const messageSynchronizerController: MessageSynchronizerController = container.get(
    'controllers.MessageSynchronizerController'
  );
  const messageACKController: MessageACKController = container.get(
    'controllers.MessageACKController'
  );

  app.post('/send-message', messageSenderController.run.bind(MessageSenderController));
  app.post('/pending-message', messageSynchronizerController.run.bind(MessageSynchronizerController));
  app.post('/confirm-message', messageACKController.run.bind(MessageACKController));
};
