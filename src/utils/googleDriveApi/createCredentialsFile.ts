import fs from "fs";
import path from "path";
import getCredentialsVar from "../../config/getCredentialsVar.js";

const createCredentialsFile = async (directoryPath: string) => {
  const { CLIENT_ID, CLIENT_SECRET } = getCredentialsVar();

  console.log(CLIENT_ID, CLIENT_SECRET);
  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error(
      "Les variables d'environnement CLIENT_ID, ou CLIENT_SECRET sont manquantes."
    );
    return;
  }

  const CREDENTIALS_PATH = path.join(directoryPath, "credentials.json");

  if (fs.existsSync(CREDENTIALS_PATH)) {
    return;
  }

  const credentials = {
    installed: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uris: ["http://localhost"],
    },
  };

  fs.writeFileSync(CREDENTIALS_PATH, JSON.stringify(credentials, null, 2));
  console.log(`Le fichier credentials.json a été créé dans ${directoryPath}`);
};

export default createCredentialsFile;
