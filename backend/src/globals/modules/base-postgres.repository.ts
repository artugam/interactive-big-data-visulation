import {QueryConfig, QueryResult, QueryResultRow} from "pg";
import PostgresClient from "./postgres.client";

export default class BasePostgresRepository {
  protected client: PostgresClient;

  /**
   *
   */
  constructor() {
    this.client = PostgresClient.getInstance();
  }

  /**
   *
   * @param {string | QueryConfig<I>} queryTextOrConfig
   * @param {I} values
   * @returns {Promise<QueryResult<R> | undefined>}
   */
  async query<R extends QueryResultRow = any, I extends any[] = any[]>(
    queryTextOrConfig: string | QueryConfig<I>,
    values?: I,
  ): Promise<QueryResult<R> | undefined> {
    try {
      // @ts-ignore
      if(!this.client['_connected']) {
        await this.client.connect();
      }
      console.log({query: queryTextOrConfig, values});
      return this.client.query(queryTextOrConfig, values);
    } catch (e) {
      console.log('Postgres Error');
      console.log(e);
    }
  };
}
