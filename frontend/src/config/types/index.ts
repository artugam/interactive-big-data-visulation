
export enum EnvEnum {
  DEV,
  PROD
}

export interface AppSettings {
  env: EnvEnum,
  api: {
    url: string
  }
}
