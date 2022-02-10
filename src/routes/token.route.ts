import { CreateUserToken } from '../api/endpoints/user-token/CreateUserToken';
import { Express } from 'express';
import container from './../dependency-injection';

export const register = (app: Express) => {

  const tokenCreateEndpoint: CreateUserToken = container.get('endpoints.token.create');
  
  app.post('/token', tokenCreateEndpoint.run.bind(tokenCreateEndpoint));

};
