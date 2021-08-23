import { Router } from 'express';
import glob from 'glob';

export function registerRoutes(router: Router) {
  console.log(__dirname + '/*.route.js');
  const routes = glob.sync(__dirname + '/*.route.js');
  routes.map(route => 
        register(route, router)
    );
}

function register(routePath: string, app: Router) {
  const route = require(routePath);
  route.register(app);
}
