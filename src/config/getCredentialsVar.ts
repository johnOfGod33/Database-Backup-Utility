import dotenv from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const envPath = resolve(dirname(fileURLToPath(import.meta.url)), "../../.env");

dotenv.config({
  path: envPath,
});

const getCredentialsVar = () => {
  const { CLIENT_ID, CLIENT_SECRET } = process.env;

  return { CLIENT_ID, CLIENT_SECRET };
};

export default getCredentialsVar;
