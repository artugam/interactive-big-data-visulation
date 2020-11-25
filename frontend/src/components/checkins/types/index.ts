export interface CheckinsChart {
  x: number[],
  y: number[],
  z: number[]
}

export interface CheckinsFilters {
  spaceLayer?: number;
  timeLayer?: number;
  time?: number[];
  axes: boolean,
  perspective: boolean,
  light: boolean,
  structure: 'tiles' | 'boxes' | 'mesh'
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
}
