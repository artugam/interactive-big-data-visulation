import {QueryConfig, QueryResult, QueryResultRow} from "pg";
import PostgresClient from "./postgres.client";
import {response} from "express";

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
      const connection = await this.client.connect();
      const response = await connection.query(queryTextOrConfig, values);
      await connection.release();

      console.log(JSON.stringify({query: queryTextOrConfig, values}))
      return response;
    } catch (e) {
      console.log('Postgres Error');
      console.log(e);
    }
  };
}
