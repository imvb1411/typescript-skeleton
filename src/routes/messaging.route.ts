import MessageSenderController from '../controllers/MessageSenderController';
import MessageSynchronizerController from './../controllers/MessageSynchronizerController';
import { Express } from 'express';
import container from '../dependency-injection';

export const register = (app: Express) => {
  const messageSenderController: MessageSenderController = container.get(
    'controllers.MessageSenderController'
  );
  const messageSynchronizerController: MessageSynchronizerController = container.get(
    'controllers.MessageSynchronizerController'
  );
  app.post('/send-message', messageSenderController.run.bind(MessageSenderController));
  app.post('/synchronize-messages', messageSynchronizerController.run.bind(MessageSynchronizerController));
};
