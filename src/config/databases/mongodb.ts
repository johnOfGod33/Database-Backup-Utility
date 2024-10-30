import { DatabaseParams } from "../databaseParams.js";

export default class MongoDb {
  private databaseParams: DatabaseParams;

  constructor(params: DatabaseParams) {
    this.databaseParams = params;
  }

  getBackupCommand() {
    if (
      this.databaseParams.host === "localhost" ||
      this.databaseParams.host == "127.0.0.1"
    ) {
      return `mongodump -d ${this.databaseParams.database} -o ${this.databaseParams.database}`;
    }
    return `mongodump -h ${this.databaseParams.host}:${this.databaseParams.port} -d ${this.databaseParams.database} -u ${this.databaseParams.username} -p ${this.databaseParams.password} -o ./Backup/mongodb/${this.databaseParams.database}`;
  }
}
