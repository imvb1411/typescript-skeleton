import { Express } from 'express';
import { CreateUserRestriction } from '../api/endpoints/user-restrictions/CreateUserRestriction';
import { DeleteUserRestriction } from '../api/endpoints/user-restrictions/DeleteUserRestriction';
import container from './../dependency-injection';

export const register = (app: Express) => {

  const createUserRestrictionEndpoint: CreateUserRestriction = container.get('endpoints.user-restriction.create');
  const deleteUserRestrictionEndpoint: DeleteUserRestriction = container.get('endpoints.user-restriction.delete');

  app.post('/user-restriction', createUserRestrictionEndpoint.run.bind(createUserRestrictionEndpoint));
  app.post('/user-restriction/delete', deleteUserRestrictionEndpoint.run.bind(deleteUserRestrictionEndpoint));
};
