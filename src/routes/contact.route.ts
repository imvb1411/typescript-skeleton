import { Express } from 'express';
import container from './../dependency-injection';
import GetContacts from "./../api/endpoints/contacts/get";

export const register = (app: Express) => {

    const getContactsController: GetContacts = container.get('endpoints.contacts.get');
  
    app.post('/contacts', getContactsController.run.bind(GetContacts));
  };
  