import CheckinsRepository from "./checkins.repository";
import {
  CheckinsChartData,
  ChartTrace, ChartType, CheckinsChartGlobalSettings, CheckinsChartGlobalSettingsDb,
  CheckinsChartSettings,
  CheckinsChartSettingsDb,
  CheckinsFilters,
  CheckinsRequestParams
} from "./types";
import ChartBoxesService from "./chart-services/chart.boxes.service";
import ChartTilesService from "./chart-services/chart.tiles.service";
import {response} from "express";
import {settings} from "cluster";
import ChartHeatmapService from "./chart-services/chart.heatmap.service";


export default class CheckinsService {

  /**
   *
   * @param {CheckinsRepository} checkinsRepository
   */
  constructor(protected readonly checkinsRepository: CheckinsRepository) {
  }

  /**
   *
   * @param {CheckinsRequestParams} params
   * @returns {Promise<[ChartTrace[], CheckinsChartSettings]>}
   */
  async chartData(params: CheckinsRequestParams): Promise<[ChartTrace[], CheckinsChartSettings]> {
    return Promise.all([
      this.checkinsData(params),
      this.availableChartSettings(params)
    ]).then(response => {
      const [checkinsData, settings] = response;
      settings.range = checkinsData.range;
      return [
        checkinsData.data,
        settings
      ]
    });
  }

  async availableChartSettings(params: CheckinsRequestParams): Promise<CheckinsChartSettings> {
    return this.checkinsRepository.findSettings(params)
      .then((settingsDb: CheckinsChartSettingsDb) => {
        const {time_min, time_max} = settingsDb;
        return {
          time: {
            max: time_max,
            min: time_min
          }
        };
      });
  }

  async availableChartGlobalSettings (): Promise<CheckinsChartGlobalSettings>  {
    return this.checkinsRepository.findGlobalSettings()
      .then((settingsDb: CheckinsChartGlobalSettingsDb) => {
        const {space_layer_min, space_layer_max, time_layer_max, time_layer_min} = settingsDb;
        return {
          spaceLayer: {
            min: space_layer_min,
            max: space_layer_max
          },
          timeLayer: {
            max: time_layer_max,
            min: time_layer_min
          }
        };
      });
  }

  /**
   *
   * @param {CheckinsFilters} params
   * @returns {Promise<ChartTrace[]>}
   */
  async checkinsData(params: CheckinsFilters): Promise<CheckinsChartData> {
    const data = await this.checkinsRepository.findChartData(params);

    switch (params.type) {
      case ChartType.TILES:
        return new ChartTilesService().build(data);
      case ChartType.HEATMAP:
        return new ChartHeatmapService().build(data, params);
    }

    return new ChartBoxesService().build(data, params);
  }

}
