import chalk from "chalk";
import { DatabaseParams } from "../databaseParams.js";
import mysql2 from "mysql2";

export default class MySql {
  private databaseParams: DatabaseParams;

  constructor(params: DatabaseParams) {
    this.databaseParams = params;
  }

  async connection() {
    const uri = `mysql://${this.databaseParams.username}:${this.databaseParams.password}@${this.databaseParams.host}:${this.databaseParams.port}/${this.databaseParams.database}`;

    const database = mysql2.createConnection(uri);

    try {
      console.log(chalk.yellow(`Starting connection test to : ${uri}`));

      database.connect((err) => {
        if (err) throw err;

        console.info(chalk.green("Test sucess"));
      });
    } catch (err: any) {
      console.error(`Failed to connect to database`);
      console.error(`Error : ${err.message}`);
    } finally {
      database.end();
    }
  }
}
