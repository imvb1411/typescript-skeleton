import { Express } from 'express';
import container from './../dependency-injection';
import GetContacts from "./../api/endpoints/contacts/get";
import GetGroupMembers from './../api/endpoints/contacts/get-group-members';

export const register = (app: Express) => {

    const getContactsController: GetContacts = container.get('endpoints.contacts.get');
    const getGroupMembers: GetGroupMembers = container.get('endpoints.contacts.get-group-members');
    
    app.post('/contacts', getContactsController.run.bind(GetContacts));
    app.post('/contacts/group-members', getGroupMembers.run.bind(GetGroupMembers));
  };
  