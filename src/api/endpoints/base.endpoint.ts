import { Request, Response } from 'express';

export interface BaseEndpoint {
  run(req: Request, res: Response): Promise<void>;
}
