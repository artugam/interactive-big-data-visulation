import {NextFunction, Request, Response} from "express";
import CheckinsService from "./checkins.service";
import {ChartDataResponse, ChartTrace, CheckinsChartSettings, CheckinsRequestParams} from "./types";

export default class CheckinsController {

  constructor(protected readonly checkinsService: CheckinsService) {
  }

  async chart(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const params = req.query as CheckinsRequestParams;
      params.points = params.points ? JSON.parse(params.points as unknown as string) : undefined;

      const [data, settings] = await this.checkinsService.chartData(params);

      return res.status(200).json({
        data,
        settings
      });
    } catch (e) {
      console.log(e);
      next();
    }
  }

  async chartGlobalSettings(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const settings = await this.checkinsService.availableChartGlobalSettings();
      return res.status(200).json({
        settings
      });
    } catch (e) {
      console.log(e);
      next();
    }
  }
}
