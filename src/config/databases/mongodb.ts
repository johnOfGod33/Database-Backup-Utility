import { MongoClient } from "mongodb";
import { DatabaseParams } from "../databaseParams.js";
import chalk from "chalk";

export default class MongoDb {
  private databaseParams: DatabaseParams;

  constructor(params: DatabaseParams) {
    this.databaseParams = params;
  }

  async connection() {
    let uri: string;

    if (
      this.databaseParams.host === "localhost" ||
      this.databaseParams.host == "127.0.0.1"
    ) {
      uri = `mongodb://${this.databaseParams.host}:${this.databaseParams.port}/${this.databaseParams.database}`;
    } else {
      uri = `mongodb+srv://${this.databaseParams.username}:${this.databaseParams.password}@${this.databaseParams.host}/${this.databaseParams.database}`;
    }

    const client = new MongoClient(uri);

    try {
      console.log(chalk.yellow(`Starting connection test to : ${uri}`));

      await client.connect();

      console.info(chalk.green("Test sucess"));
    } catch (err: any) {
      console.error(`Failed to connect to database`);
      console.error(`Error : ${err.message}`);
    } finally {
      await client.close();
    }
  }
  getBackupCommand() {
    if (
      this.databaseParams.host === "localhost" ||
      this.databaseParams.host == "127.0.0.1"
    ) {
      return `mongodump -d ${this.databaseParams.database} -o ./Backup/mongodb/${this.databaseParams.database}`;
    }
    return `mongodump -h ${this.databaseParams.host}:${this.databaseParams.port} -d ${this.databaseParams.database} -u ${this.databaseParams.username} -p ${this.databaseParams.password} -o ./Backup/mongodb/${this.databaseParams.database}`;
  }
}
