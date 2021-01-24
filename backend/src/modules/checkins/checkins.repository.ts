import BasePostgresRepository from "../../globals/modules/base-postgres.repository";
import {
  CheckinsChartGlobalSettingsDb,
  CheckinsChartSettingsDb,
  CheckinsFilters,
  CheckinsRow
} from "./types";


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
    values.push(spaceLayer || defaultSpaceLayer);
    queryFilters.push(`space_layer = $${values.length}`);

    values.push(timeLayer || defaultTimeLayer);
    queryFilters.push(`time_layer = $${values.length}`);


    if (time) {
      const [min, max] = time;
      values.push(min);
      queryFilters.push(`time > $${values.length}`);
      values.push(max);
      queryFilters.push(`time <= $${values.length}`);
    }

    if(points && Object.keys(points).length > 0) {
      values.push(Math.floor(Number(points.leftTop.x)));
      queryFilters.push(`tile_x >= $${values.length}`);
      values.push(Math.round(Number(points.rightBottom.x)));
      queryFilters.push(`tile_x <= $${values.length}`);

      values.push(Math.round(Number(points.leftTop.y)));
      queryFilters.push(`tile_y <= $${values.length}`)
      values.push(Math.floor(Number(points.rightBottom.y)));
      queryFilters.push(`tile_y >= $${values.length}`)
    }

    return { queryFilters, values};

  }
}
