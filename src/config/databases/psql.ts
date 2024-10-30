import { DatabaseParams } from "../databaseParams.js";

export default class Psql {
  private databaseParams: DatabaseParams;

  constructor(params: DatabaseParams) {
    this.databaseParams = params;
  }

  getBackupCommand() {
    return `pg_dump "host=${this.databaseParams.host} port=${this.databaseParams.port} dbname=${this.databaseParams.database} user=${this.databaseParams.username} password=${this.databaseParams.password}" > ${this.databaseParams.database}.sql`;
  }
}
