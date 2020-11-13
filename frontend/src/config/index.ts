import {AppSettings} from "./types";

export async function loadSettings(): Promise<AppSettings> {
  return {
    apiUrl: 'http://localhost:8090'
  }
}
