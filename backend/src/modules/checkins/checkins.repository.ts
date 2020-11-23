import BasePostgresRepository from "../../globals/modules/base-postgres.repository";
import {CheckinsFilters, CheckinsRow} from "./types";


const defaultSpaceLayer = 7;
const defaultTimeLayer = 7;


export default class CheckinsRepository extends BasePostgresRepository {
  /**
   *
   * @param {CheckinsFilters} filters
   * @returns {Promise<CheckinsRow[]>}
   */
  async findChartData(filters: CheckinsFilters): Promise<CheckinsRow[]> {
    const queryFilters: string[] = [];
    const values: any[] = [];
    const {spaceLayer, time, timeLayer} = filters;
    queryFilters.push("space_layer = $1");
    values.push(spaceLayer || defaultSpaceLayer);
    queryFilters.push("time_layer = $2");
    values.push(timeLayer || defaultTimeLayer);

    if (time) {
      queryFilters.push("time > $3 AND time <= $4");
      values.push(time);
      values.push(time+1);
    }


    return this.query('SELECT * from checkins WHERE ' + queryFilters.join(' AND '), values).then(response => response?.rows || []);
  }
}
