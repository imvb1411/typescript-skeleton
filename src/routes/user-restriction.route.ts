import { Express } from 'express';
import CreateUserRestriction from './../api/endpoints/user-restrictions/create';
import DeleteUserRestriction from './../api/endpoints/user-restrictions/delete';
import container from './../dependency-injection';

export const register = (app: Express) => {

  const createUserRestrictionEndpoint: CreateUserRestriction = container.get('endpoints.user-restriction.create');
  const deleteUserRestrictionEndpoint: DeleteUserRestriction = container.get('endpoints.user-restriction.delete');

  app.post('/user-restriction', createUserRestrictionEndpoint.run.bind(CreateUserRestriction));
  app.post('/user-restriction/delete', deleteUserRestrictionEndpoint.run.bind(DeleteUserRestriction));
};
