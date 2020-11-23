
export interface CheckinsRow {
  space_layer: number;
  time_layer: number;
  tile_x: string;
  tile_y: string;
  time: number;
  cnt: string;
  cnt_log: string;
}

export interface MinMax {
  zMin: number;
  zMax: number;
}

export interface ChartTrace {
  x: number[],
  y: number[],
  z: number[]
}

export interface CheckinsRequestParams extends CheckinsFilters {};

export interface CheckinsFilters {
  spaceLayer?: number;
  timeLayer?: number;
  time?: number;
}
