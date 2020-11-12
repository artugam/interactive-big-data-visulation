import CheckinsRepository from "./checkins.repository";

export default class CheckinsService {
  constructor(protected readonly checkinsRepository: CheckinsRepository) {
  }

  async chartData() {
    return this.checkinsRepository.findChartData();
  }
}
