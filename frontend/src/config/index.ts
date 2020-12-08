import {AppSettings, EnvEnum} from "./types";

export function loadSettings(): AppSettings {
  return {
    env: EnvEnum.DEV,
    api: {
      url: 'http://localhost:8090'
    }
  }
}
