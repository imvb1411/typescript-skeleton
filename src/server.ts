import express, { Request, Response } from 'express';
import compress from 'compression';
import Router from 'express-promise-router';
import * as http from 'http';
import httpStatus from 'http-status';
import Logger from './shared/domain/logger';
import container from './dependency-injection';
import { registerRoutes } from './routes';

export class Server {
    private app    : express.Express;
    readonly port  : string;
    private logger : Logger;
    httpServer?    : http.Server;

    constructor(port: string) {
        this.port   = port;
        this.logger = container.get('shared.logger');
        this.app    = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(compress());
        const router = Router();
        this.app.use(router);
        registerRoutes(router);

        router.use((err: Error, req: Request, res: Response, next: Function) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
          });
    }

    async listen(): Promise<void> {
      return new Promise(resolve => {
        this.httpServer = this.app.listen(this.port, () => {
          console.log( this.httpServer.address() );
          this.logger.info(
            `Backend App is running at http://localhost:${this.port} in ${this.app.get('env')} mode`
          );
          this.logger.info('  Press CTRL-C to stop\n');
          resolve();
        });
      });
    }
    
    async stop(): Promise<void> {
      return new Promise((resolve, reject) => {
          if (this.httpServer) {
              this.httpServer.close(error => {
                  if (error) {
                      return reject(error);
                  }
                      return resolve();
              });
          }
          return resolve();
      });
    }
}