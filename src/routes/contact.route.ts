import { Express } from 'express';
import container from '../dependency-injection';
import GetContactsController from "./../controllers/GetContactsController";

export const register = (app: Express) => {

    const getContactsController: GetContactsController = container.get('controllers.GetContactsController');
  
    app.post('/contacts', getContactsController.run.bind(GetContactsController));
  };
  