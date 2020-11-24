import {NextFunction, Request, Response, Router} from 'express';
import CheckinsController from "./checkins.controller";
import CheckinsRepository from "./checkins.repository";
import CheckinsService from "./checkins.service";

const checkinsRouter = Router();
const checkinsController = new CheckinsController(new CheckinsService(new CheckinsRepository()));

checkinsRouter.get(
  '/chart',
  (req: Request, res: Response, next: NextFunction) => checkinsController.chart(req, res, next)
);

checkinsRouter.get(
  '/chart/global-settings',
  (req: Request, res: Response, next: NextFunction) => checkinsController.chartGlobalSettings(req, res, next)
);

export default checkinsRouter;
