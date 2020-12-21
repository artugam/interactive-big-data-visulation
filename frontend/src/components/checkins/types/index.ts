
export interface MinMax {
  min: number;
  max: number;
}

export interface CheckinsChart {
  data: {
    x: number[],
    y: number[],
    z: number[]
  }[],
  settings: {
    time: MinMax,
    range: number[]
  }
}

export interface CheckinsAvailableSettings {
  settings: {
    spaceLayer: MinMax,
    timeLayer: MinMax
  }
}

export enum ChartType {
  BOXES = 'boxes',
  MESH = 'mesh',
  TILES = 'tiles',
  HEATMAP = 'heatmap'
}

export interface CheckinsChartFilters {
  spaceLayer?: number;
  timeLayer?: number;
  time?: number[];
  axes: boolean,
  perspective: boolean,
  light: boolean,
  type: ChartType;
  points?: PointsRange;
}

export interface AvailableSettings {
  global: {
    spaceLayer: MinMax,
    timeLayer: MinMax,
    time?: number;
    type?: ChartType;
  },
  chart: {
    time: MinMax
  }
}

export interface PointsRange {
  leftTop: {
    x: number;
    y: number;
  },
  rightBottom: {
    x: number;
    y: number;
  }
}


export interface CheckinsState {
  usedSettings: CheckinsChartFilters,
  availableSettings: AvailableSettings
}
