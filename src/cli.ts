#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import figlet from "figlet";
import chalk from "chalk";
import boxen from "boxen";
import MongoDb from "./config/databases/mongodb.js";
import { getDatabaseParams } from "./config/databaseParams.js";

console.log(
  boxen(
    chalk.blue(
      figlet.textSync("backup db", {
        font: "Slant",
        horizontalLayout: "full",
        verticalLayout: "default",
      })
    ),
    { padding: 1, margin: 1, borderStyle: "double", borderColor: "blue" }
  )
);

const cli = yargs(hideBin(process.argv)).command(
  "*",
  "backcup database",
  (yargs) => {
    return yargs
      .option("type", {
        alias: "t",
        type: "string",
        default: "mongodb",
        description:
          "Type of database to back up (postgresql | mysql | sqlite | mongodb)",
      })
      .option("username", {
        alias: "u",
        type: "string",
        description: "Username credential to connect to the database",
      })
      .option("password", {
        alias: "p",
        type: "string",
        description: "Password credential to connect to the database",
      })
      .option("host", {
        alias: "h",
        type: "string",
        description: "Database host address (localhost or an IP address)",
      })
      .option("port", {
        alias: "P",
        type: "number",
        description: "Port number where the database is listening",
      })
      .option("database", {
        alias: "d",
        type: "string",
        description: "Name of the database to be backed up",
      });
  },
  (argv) => {
    (async () => {
      const databaseParams = getDatabaseParams(
        argv.username,
        argv.password,
        argv.host,
        argv.port,
        argv.database
      );

      const mongodb = new MongoDb(databaseParams);

      console.info("Connection Testing:");

      await mongodb.connection();
    })();
  }
);

cli.parse();
