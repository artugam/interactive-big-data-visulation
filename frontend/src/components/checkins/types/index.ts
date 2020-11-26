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
  time?: number[];
  axes: boolean,
  perspective: boolean,
  light: boolean,
  structure: 'tiles' | 'boxes' | 'mesh'
  type: ChartType;
  points?: PointsRange;
}

export interface GlobalsData {
  settings: {
    spaceLayer: {
      min: number,
      max: number
    },
    timeLayer: {
      min: number,
      max: number
    },
    time: {
      min: number,
      max: number
    }
  }
  time?: number;
  type?: ChartType;
  points?: PointsRange;
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
