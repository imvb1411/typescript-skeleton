import CreateToken from './../api/endpoints/token/create';
import { Express } from 'express';
import container from './../dependency-injection';

export const register = (app: Express) => {

  const tokenCreateEndpoint: CreateToken = container.get('endpoints.token.create');
  
  app.post('/token', tokenCreateEndpoint.run.bind(CreateToken));

};
