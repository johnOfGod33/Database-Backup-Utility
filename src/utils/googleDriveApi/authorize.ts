import fs from "fs/promises";
import path, { dirname, resolve } from "path";
import process from "process";
import { authenticate } from "@google-cloud/local-auth";
import { google, Auth } from "googleapis";
import { fileURLToPath } from "url";

const DIRNAME = dirname(fileURLToPath(import.meta.url));
const SCOPES = ["https://www.googleapis.com/auth/drive"];
const TOKEN_PATH = resolve(DIRNAME, "../../token.json");
const CREDENTIALS_PATH = resolve(DIRNAME, "../../credentials.json");

const loadTokenIfExist = async (): Promise<Auth.OAuth2Client | null> => {
  try {
    const tokenContent = await fs.readFile(TOKEN_PATH, "utf-8");
    const token = JSON.parse(tokenContent);

    return google.auth.fromJSON(token) as Auth.OAuth2Client;
  } catch (err: any) {
    console.log("TOKEN NOT FOUND: ", err.message);

    return null;
  }
};

const saveToken = async (client: Auth.OAuth2Client): Promise<void> => {
  const credentialsContent = await fs.readFile(CREDENTIALS_PATH, "utf-8");
  let keys = JSON.parse(credentialsContent);
  keys = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: keys.client_id,
    client_secret: keys.client_secret,
    refresh_token: client.credentials.refresh_token,
  });

  await fs.writeFile(TOKEN_PATH, payload);
};

const authorize = async (): Promise<Auth.OAuth2Client> => {
  let client = await loadTokenIfExist();

  if (client) {
    return client;
  }

  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });

  if (client.credentials) {
    await saveToken(client);
  }

  return client;
};

export default authorize;
