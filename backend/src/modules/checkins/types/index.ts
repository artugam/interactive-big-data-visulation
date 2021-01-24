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
  min: number;
  max: number;
}

export interface ChartTrace {
  x: number[],
  y: number[],
  z: number[],
  type?: string;

}

export interface CheckinsChartData {
  data: ChartTrace[],
  range: number[]
}

export interface CheckinsRequestParams extends CheckinsFilters {}

export enum ChartType {
  BOXES = 'boxes',
  TILES = 'tiles',
  HEATMAP = 'heatmap',
}

export interface CheckinsFilters {
  spaceLayer?: number;
  timeLayer?: number;
  time?: number[];
  type?: ChartType;
  points?: {
    leftTop: {
      x: number;
      y: number;
    },
    rightBottom: {
      x: number;
      y: number;
    }
  }
}

export interface CheckinsChartSettingsDb {
  time_max: number;
  time_min: number;
}

export interface CheckinsChartGlobalSettingsDb {
  space_layer_max: number;
  space_layer_min: number;
  time_layer_max: number;
  time_layer_min: number;
}

export interface CheckinsChartGlobalSettings {
  spaceLayer: MinMax;
  timeLayer: MinMax;
}

export interface CheckinsChartSettings {
  time: MinMax;
  range?: number[]
}

export interface ChartDataResponse {
  data: ChartTrace[];
  settings: CheckinsChartSettings;
}
