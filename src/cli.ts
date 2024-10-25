#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import figlet from "figlet";
import chalk from "chalk";
import boxen from "boxen";

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

yargs(hideBin(process.argv))
  .command(
    "*",
    "backcup test",
    (yargs) => {
      return yargs.option("database", {
        alias: "d",
        type: "string",
        default: "mysql",
        description: "your database name",
      });
    },
    (argv) => {
      console.log(argv.database);
    }
  )
  .parse();
