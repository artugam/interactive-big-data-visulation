import {Client, Pool, PoolConfig} from "pg";

export default class PostgresClient extends Pool {

  private static instance: PostgresClient;

  constructor(protected readonly params: any) {
    super(params);
  }

  static getInstance(params?: PoolConfig): PostgresClient {
    if(!PostgresClient.instance) {
      if(!params) {
        params = {
          user: 'admin',
          host: 'magistry-postgresql',
          database: 'admin',
          password: 'admin',
          port: 5432,
          max: 20
        };
      }
      PostgresClient.instance = new PostgresClient(params);
    }

    return PostgresClient.instance;
  }
}
