export interface CheckinsChart {
  x: number[],
  y: number[],
  z: number[]
}

export interface CheckinsFilters {
  spaceLayer?: number;
  timeLayer?: number;
  time?: number;
}
