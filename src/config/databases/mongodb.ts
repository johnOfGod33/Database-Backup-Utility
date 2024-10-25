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
      await client.connect();

      console.info(chalk.green("Connected to MongoDB database"));
    } catch (error: any) {
      console.error(`Error connecting to the database: ${error.message}`);
    } finally {
      await client.close();
      console.log(chalk.green("close mongodb connection"));
    }
  }
}
