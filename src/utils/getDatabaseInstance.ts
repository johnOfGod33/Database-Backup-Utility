import { DatabaseParams } from "../config/databaseParams.js";
import MongoDb from "../config/databases/mongodb.js";
import MySql from "../config/databases/mysql.js";
import Psql from "../config/databases/psql.js";

const getDatabaseInstance = (
  type: string | undefined,
  params: DatabaseParams
): MySql | MongoDb | Psql | null => {
  if (type === "mongodb") {
    return new MongoDb(params);
  }

  if (type === "mysql") {
    return new MySql(params);
  }

  if (type == "postegresql") {
    return new Psql(params);
  }

  return new MongoDb(params);
};

export default getDatabaseInstance;
