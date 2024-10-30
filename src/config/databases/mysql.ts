import { DatabaseParams } from "../databaseParams.js";

export default class MySql {
  private databaseParams: DatabaseParams;

  constructor(params: DatabaseParams) {
    this.databaseParams = params;
  }

  getBackupCommand() {
    return `mysqldump -u ${this.databaseParams.username} -p${this.databaseParams.password} -h ${this.databaseParams.host} -P ${this.databaseParams.port} ${this.databaseParams.database} > ${this.databaseParams.database}.sql`;
  }
}
