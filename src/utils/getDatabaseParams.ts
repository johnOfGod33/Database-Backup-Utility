import inquirer from "inquirer";
import { DatabaseParams } from "../config/databaseParams.js";

const getDatabaseParams = async (): Promise<DatabaseParams | null> => {
  try {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Type of database to back up",
        choices: ["mongodb", "mysql", "postgresql", "sqlite"],
        default: "mongodb",
      },
      {
        type: "input",
        name: "username",
        message: "Enter the username to connect to the database:",
        when: (answers) => answers.type !== "sqlite",
      },
      {
        type: "password",
        name: "password",
        message: "Enter the password to connect to the database:",
        when: (answers) => answers.type !== "sqlite",
      },
      {
        type: "input",
        name: "host",
        message:
          "Enter the database host address (localhost or an IP address):",
        default: "localhost",
        when: (answers) => answers.type !== "sqlite",
      },
      {
        type: "number",
        name: "port",
        message: "Enter the port number where the database is listening:",
        when: (answers) => answers.type !== "sqlite",
        default: (answers) => {
          switch (answers.type) {
            case "mongodb":
              return 27017;
            case "mysql":
              return 3306;
            case "postgresql":
              return 5432;
            default:
              return 0;
          }
        },
      },
      {
        type: "input",
        name: "database",
        message: "Enter the name of the database to be backed up:",
        when: (answers) => answers.type !== "sqlite",
      },
    ]);

    return answers;
  } catch (error: any) {
    console.error(
      "An error occurred while getting database configuration:",
      error.message
    );
    return null;
  }
};

export default getDatabaseParams;
