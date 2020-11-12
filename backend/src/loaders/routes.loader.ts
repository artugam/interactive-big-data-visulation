import {Express} from "express";
import checkinsRouter from '../modules/checkins/checkins.router'

export default class RoutesLoader {

  /**
   *
   * @param {Express} app
   */
  load(app: Express): void {
    app.use("/checkins", checkinsRouter);
  }
}
