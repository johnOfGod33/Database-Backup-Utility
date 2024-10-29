import { DatabaseParams } from "../databaseParams.js";
import pg from "pg";
import chalk from "chalk";

const { Client } = pg;

export default class Psql {
  private databaseParams: DatabaseParams;

  constructor(params: DatabaseParams) {
    this.databaseParams = params;
  }

  async connection() {
    const uri = `postgresql://${this.databaseParams.username}:${this.databaseParams.password}@${this.databaseParams.host}:${this.databaseParams.port}/${this.databaseParams.database}`;

    const client = new Client({ connectionString: uri });

    try {
      console.log(chalk.yellow(`Starting connection test to : ${uri}`));

      await client.connect();

      console.info(chalk.green("Test sucess"));
    } catch (err: any) {
      console.error(`Failed to connect to database`);
      console.error(`Error : ${err.message}`);
    } finally {
      client.end();
    }
  }
  getBackupCommand() {
    return "";
  }
}
