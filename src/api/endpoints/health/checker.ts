import { Request, Response } from "express";
import { BaseEndpoint } from "../base.endpoint";
import httpStatus from "http-status";

export default class HealthChecker implements BaseEndpoint {

    async run(_req: Request, res: Response): Promise<void> {
        try {
            res.status(httpStatus.OK).json({"health": "ok"});
        }catch(e) {
            res.status(httpStatus.SERVICE_UNAVAILABLE).json(e.message);
        }
    }
}