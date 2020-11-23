import CheckinsRepository from "./checkins.repository";
import {ChartTrace, CheckinsFilters, MinMax} from "./types";


export default class CheckinsService {

  /**
   *
   * @param {CheckinsRepository} checkinsRepository
   */
  constructor(protected readonly checkinsRepository: CheckinsRepository) {
  }

  /**
   *
   * @param {CheckinsFilters} params
   * @returns {Promise<ChartTrace[]>}
   */
  async chartData(params: CheckinsFilters): Promise<ChartTrace[]> {
    const data = await this.checkinsRepository.findChartData(params);
    const outData = [];
    const map = new Map<string, MinMax>();

    for (const {tile_x, tile_y, cnt} of data) {
      const value = Number(cnt);
      const key = tile_x + ";" + tile_y;
      const current = map.get(key);
      if (!current) {
        map.set(key, {
          zMax: value,
          zMin: 0
        });
        continue;
      }
      if(current.zMin > value) {
        current.zMin = value;
      }
      if(current.zMax < value) {
        current.zMax = value;
      }
    }

    for (const key of map.keys()) {
      const [x, y] = key.split(';')
      const {zMin, zMax} = map.get(key) as MinMax;
      const minPoint = {
        x: Number(x),
        y: Number(y),
        z: zMin
      }

      const maxPoint = {
        x: Number(x),
        y: Number(y),
        z: zMax
      }
      const spaceLayer = 7;
      const size = Math.pow(spaceLayer ,2);
      // const minPointSize = size / 2;
      const minPointSize = 0.5;
      // const minPointSize = size;

      const
        point1 = { x: minPoint.x - minPointSize, y: minPoint.y - minPointSize, z: minPoint.z},
        point2 = { x: minPoint.x - minPointSize, y: minPoint.y + minPointSize, z: minPoint.z},
        point3 = { x: minPoint.x + minPointSize, y: minPoint.y + minPointSize, z: minPoint.z},
        point4 = { x: minPoint.x + minPointSize, y: minPoint.y - minPointSize, z: minPoint.z},

        point11 = { x: minPoint.x - minPointSize, y: minPoint.y - minPointSize, z: maxPoint.z},
        point21 = { x: minPoint.x - minPointSize, y: minPoint.y + minPointSize, z: maxPoint.z},
        point31 = { x: minPoint.x + minPointSize, y: minPoint.y + minPointSize, z: maxPoint.z},
        point41 = { x: minPoint.x + minPointSize, y: minPoint.y - minPointSize, z: maxPoint.z};
      const points = [
        point1,
        point2,
        point3,
        point4,
        point11,
        point21,
        point31,
        point41,
      ];

      const parsedx = points.map(item => item.x);
      const parsedy = points.map(item => item.y);
      const parsedz = points.map(item => item.z);


      outData.push({
        x: parsedx,
        y: parsedy,
        z: parsedz
      });
    }

    return outData;
  }
}
