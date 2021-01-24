import CheckinsService from "../../checkins.service";
import {AvailableSettings, CheckinsChartFilters} from "../../types";
import Chart3D from "../Chart3D";
import {RefObject} from "react";

export interface CheckinsChartProps {
  service: CheckinsService,
  filters: CheckinsChartFilters,
  onAvailableSettingChange?: (settings: AvailableSettings['chart']) => void,
  chart3d?: RefObject<Chart3D>,
  onSettingChange: (name: string, value: number | number[] | boolean | string | object) => void;
}
