import BasePostgresRepository from "../../globals/modules/base-postgres.repository";
import {
  CheckinsChartGlobalSettingsDb,
  CheckinsChartSettings,
  CheckinsChartSettingsDb,
  CheckinsFilters,
  CheckinsRow
} from "./types";
import {response} from "express";


const defaultSpaceLayer = 7;
const defaultTimeLayer = 7;

interface CheckinsQueryFilters {
  queryFilters: string[],
  values: any | number[]
}

export default class CheckinsRepository extends BasePostgresRepository {
  /**
   *
   * @param {CheckinsFilters} filters
   * @returns {Promise<CheckinsRow[]>}
   */
  async findChartData(filters: CheckinsFilters): Promise<CheckinsRow[]> {
    const {queryFilters, values} = this.prepareCheckinsChartFilters(filters);

    return this.query('SELECT * from checkins WHERE ' + queryFilters.join(' AND '), values).then(response => response?.rows || []);
  }


  async findSettings(filters: CheckinsFilters): Promise<CheckinsChartSettingsDb> {
    const {queryFilters, values} = this.prepareCheckinsChartFilters(filters);

    return this.query('SELECT ' +
      'MAX(time) as time_max, MIN(time) as time_min ' +
      'from checkins WHERE ' + queryFilters.join(' AND '), values).then(response => response?.rows[0]);
  }

  /**
   *
   * @returns {Promise<CheckinsChartGlobalSettingsDb>}
   */
  async findGlobalSettings(): Promise<CheckinsChartGlobalSettingsDb> {
    return this.query('SELECT ' +
      'MAX(space_layer) as space_layer_max, MIN(space_layer) as space_layer_min, ' +
      'MAX(time_layer) as time_layer_max, MIN(time_layer) as time_layer_min ' +
      'from checkins').then(response => response?.rows[0]);
  }

  /**
   *
   * @param {CheckinsFilters} filters
   * @returns {CheckinsQueryFilters}
   * @protected
   */
  protected prepareCheckinsChartFilters(filters: CheckinsFilters): CheckinsQueryFilters {
    const queryFilters: string[] = [];
    const values: any[] = [];
    const {spaceLayer, time, timeLayer, points} = filters;
    queryFilters.push("space_layer = $1");
    values.push(spaceLayer || defaultSpaceLayer);
    queryFilters.push("time_layer = $2");
    values.push(timeLayer || defaultTimeLayer);

    // if (time) {
    //   queryFilters.push("time > $3 AND time <= $4");
    //   values.push(time);
    //   values.push(time+1);
    // }

    // const prepare = (value: string) {
    //   return Number(va)
    // }

    if(points && Object.keys(points).length > 0) {
    // if(points && Object.keys(points).length > 0 && !time) {
      queryFilters.push("tile_x >= $3 AND tile_x <= $4"); //
      values.push(Math.floor(Number(points.leftTop.x)));
      values.push(Math.round(Number(points.rightBottom.x)));

      queryFilters.push("tile_y <= $5 AND tile_y >= $6")
      values.push(Math.round(Number(points.leftTop.y)));
      values.push(Math.floor(Number(points.rightBottom.y)));
    }
    // else if (points && Object.keys(points ).length > 1 && time) {
    //   queryFilters.push("tile_x >= $5 AND tile_x <= $6 AND tile_y <= $7 AND tile_y >= $8");
    //   values.push(Number(points.leftTop.x));
    //   values.push(Number(points.rightBottom.x));
    //   values.push(Number(points.leftTop.y));
    //   values.push(Number(points.rightBottom.y));
    // }

    console.log(queryFilters);
    console.log(values);

    return { queryFilters, values};

  }
}
