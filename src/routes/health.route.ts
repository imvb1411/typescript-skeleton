import { Express } from 'express';
import container from './../dependency-injection';
import HealthChecker from './../api/endpoints/health/checker';

export const register = (app: Express) => {

  const healthChecker: HealthChecker = container.get('endpoints.health.checker');
  
  app.post('/health-check', healthChecker.run.bind(HealthChecker));

};
