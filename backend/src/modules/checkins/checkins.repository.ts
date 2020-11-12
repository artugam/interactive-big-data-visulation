import BasePostgresRepository from "../../globals/modules/base-postgres.repository";


export default class CheckinsRepository extends BasePostgresRepository {
  async findChartData() {
    return this.query('SELECT * from checkins').then(response => response?.rows);
  }
}
