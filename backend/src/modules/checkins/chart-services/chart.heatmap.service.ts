import {CheckinsChartData, CheckinsFilters, CheckinsRow, MinMax} from "../types";

export default class ChartHeatmapService {
  build(data: CheckinsRow[], params: CheckinsFilters): CheckinsChartData {

    const {points} = params;
    const map = new Map<string, MinMax>();
    // let rangeMax = Number(data[0].tile_x);
    // let rangeMin = Number(data[0].tile_x);
    let rangeMax = points ? this.pointsMax(points) : Number(data[0].tile_x);
    let rangeMin = points ? this.pointsMin(points) : Number(data[0].tile_x);
    for (const {tile_x, tile_y, cnt} of data) {
      const value = Number(cnt);
      const key = tile_x + ";" + tile_y;
      const current = map.get(key);
      if (!current) {
        map.set(key, {
          max: value,
          min: 0
        });
        continue;
      }
      if (current.min > value) {
        current.min = value;
      }
      if (current.max < value) {
        current.max = value;
      }
      if(points) {
        if(Number(tile_x) > rangeMax) {
          rangeMax = Number(tile_x);
        }
        if(Number(tile_y) > rangeMax) {
          rangeMax = Number(tile_y);
        }
        if(Number(tile_x) < rangeMin) {
          rangeMin = Number(tile_x);
        }
        if(Number(tile_y) < rangeMin) {
          rangeMin = Number(tile_y);
        }
      }

    }

    const outData: CheckinsChartData = {
      data: [],
      range: [rangeMin, rangeMax]
    };
    const outX: number[] = [];
    const outY: number[] = [];
    const outZ: number[] = [];
    for (const key of map.keys()) {
      const [x, y] = key.split(';')
      const {min, max} = map.get(key) as MinMax;
      const minPoint = {
        x: Number(x),
        y: Number(y),
        z: min
      }

      const maxPoint = {
        x: Number(x),
        y: Number(y),
        z: max
      }
      const spaceLayer = 7;
      const size = Math.pow(spaceLayer, 2);
      // const minPointSize = size / 2;
      const minPointSize = 0.5;
      // const minPointSize = size;

      const
        point1 = {x: minPoint.x - minPointSize, y: minPoint.y - minPointSize, z: minPoint.z},
        point2 = {x: minPoint.x - minPointSize, y: minPoint.y + minPointSize, z: minPoint.z},
        point3 = {x: minPoint.x + minPointSize, y: minPoint.y + minPointSize, z: minPoint.z},
        point4 = {x: minPoint.x + minPointSize, y: minPoint.y - minPointSize, z: minPoint.z},

        point11 = {x: minPoint.x - minPointSize, y: minPoint.y - minPointSize, z: maxPoint.z},
        point21 = {x: minPoint.x - minPointSize, y: minPoint.y + minPointSize, z: maxPoint.z},
        point31 = {x: minPoint.x + minPointSize, y: minPoint.y + minPointSize, z: maxPoint.z},
        point41 = {x: minPoint.x + minPointSize, y: minPoint.y - minPointSize, z: maxPoint.z};
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


      // outData.data.push({
      //   x: parsedx,
      //   y: parsedy,
      //   z: parsedz,
      //   type: 'heatmap'
      // });
      outData.data.push({
        x: [Number(x)],
        y: [Number(y)],
        z: [max],
        type: 'heatmap'
      });
      // outX.push(Number(x));
      // outY.push(Number(y));
      // outZ.push(Number(max));
    }
    // outData.data.push({
    //   x: outX,
    //   y: outY,
    //   z: outZ,
    //   type: 'heatmap'
    // });

    return outData;
  }

  pointsMax(points: CheckinsFilters['points']): number {

    let out = points?.leftTop.x;
    if(out && points && out < points?.leftTop.y) {
      out = points?.leftTop.y;
    }
    if(out && points && out < points?.rightBottom.x) {
      out = points?.rightBottom.x;
    }
    if(out && points && out < points?.rightBottom.y) {
      out = points?.rightBottom.y;
    }
    return out as number;
  }

  pointsMin(points: CheckinsFilters['points']): number {
    let out = points?.leftTop.x;
    if(out && points && out > points?.leftTop.y) {
      out = points?.leftTop.y;
    }
    if(out && points && out > points?.rightBottom.x) {
      out = points?.rightBottom.x;
    }
    if(out && points && out > points?.rightBottom.y) {
      out = points?.rightBottom.y;
    }
    return out as number;
  }
}
