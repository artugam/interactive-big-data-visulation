export interface CheckinsChart {
  data: {
    x: number[],
    y: number[],
    z: number[]
  }[],
  settings: {
    time: {
      max: number,
      min: number
    },
    range: number[]
  }
}

export interface CheckinsChartGlobalSettings {
  settings: {
    spaceLayer: {
      max: number,
      min: number
    },
    timeLayer: {
      max: number,
      min: number
    }
  }
}

export enum ChartType {
  BOXES = 'boxes',
  TILES = 'tiles',
}

export interface CheckinsFilters {
  spaceLayer?: number;
  timeLayer?: number;
  time?: number;
  type: ChartType;
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
