import CheckinsService from "../../checkins.service";
import {AvailableSettings, CheckinsChartFilters} from "../../types";

export interface CheckinsChartProps {
  service: CheckinsService,
  filters: CheckinsChartFilters,
  onAvailableSettingChange?: (settings: AvailableSettings['chart']) => void
}
