import {NextFunction, Request, Response} from "express";
import CheckinsService from "./checkins.service";
import {CheckinsRequestParams} from "./types";

export default class CheckinsController {

  constructor(protected readonly checkinsService: CheckinsService) {
  }

  async chart(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.query as unknown as CheckinsRequestParams;
      const data = await this.checkinsService.chartData(params);
      return res.status(200).json(data);
    } catch (e) {
      console.log(e);
      next();
    }
  }
}
