import {NextFunction, Request, Response} from "express";
import CheckinsService from "./checkins.service";

export default class CheckinsController {

  constructor(protected readonly checkinsService: CheckinsService) {
  }

  async chart(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.checkinsService.chartData();
      return res.status(200).json(data);
    } catch (e) {
      console.log(e);
      next();
    }
  }
}
