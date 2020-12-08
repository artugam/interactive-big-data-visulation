import {loadSettings} from "../../config";
import axios, {AxiosInstance, AxiosResponse} from "axios";
import { CheckinsChart, CheckinsAvailableSettings, CheckinsChartFilters} from "./types";
import { EnvEnum} from "../../config/types";

export default class CheckinsService {

  /**
   *
   * @type {AxiosInstance}
   * @protected
   */
  protected client: AxiosInstance;

  /**
   *
   * @param {string} hostname
   * @param {EnvEnum} env
   */
  constructor(hostname: string, env: EnvEnum) {
    this.client = axios.create({
      baseURL: hostname
    });

    if(env === EnvEnum.PROD) {
      return;
    }
    this.client.interceptors.response.use((response: AxiosResponse) => {
      console.log({
        status: response.status,
        url: response.config.url
      });
      return Promise.resolve(response);
    }, (error) => {
      console.log({error});
      return Promise.resolve(error);
    })
  }

  /**
   *
   * @returns {Promise<CheckinsAvailableSettings>}
   */
  async loadAvailableSettings(): Promise<CheckinsAvailableSettings> {
    return this.client.get('/checkins/chart/global-settings').then(data => data.data);
  }

  /**
   *
   * @param {CheckinsChartFilters} params
   * @returns {Promise<CheckinsChart>}
   */
  async loadChartData(params: CheckinsChartFilters): Promise<CheckinsChart> {
    return this.client.get('/checkins/chart', {params}).then(data => data.data);
  }
}

let service: CheckinsService;
/**
 *
 * @returns {Promise<CheckinsService>}
 */
export function createCheckinsServiceInstance(): CheckinsService {
  if(!service) {
    const {api: {url}, env} = loadSettings();
    service = new CheckinsService(url, env);
  }
  return service;
}
