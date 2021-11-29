import { Express } from 'express';
import container from '../dependency-injection';
import TokenValidatorController from './../controllers/TokenValidatorController';

export const register = (app: Express) => {

  const tokenValidatorController: TokenValidatorController = container.get('controllers.TokenValidatorController');

  app.post('/token-validator', tokenValidatorController.run.bind(TokenValidatorController));
};
