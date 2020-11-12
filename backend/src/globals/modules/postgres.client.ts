import {Client} from "pg";

export default class PostgresClient extends Client{

  private static instance: PostgresClient;

  constructor(protected readonly params: any) {
    super(params);
  }

  static getInstance(params?: any): PostgresClient {
    if(!PostgresClient.instance) {
      if(!params) {
        params = {
          user: 'admin',
          host: 'magistry-postgresql',
          database: 'admin',
          password: 'admin',
          port: 5432,
        };
      }
      PostgresClient.instance = new PostgresClient(params);
    }

    return PostgresClient.instance;
  }
}
