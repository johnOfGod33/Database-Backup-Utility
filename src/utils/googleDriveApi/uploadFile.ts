import { google, Auth } from "googleapis";
import fs from "fs";

const uploadFile = async (
  name: string,
  filePath: string,
  authClient: Auth.OAuth2Client
) => {
  const service = google.drive({ version: "v3", auth: authClient });
  const requestBody = { name, fields: "id" };
  const media = {
    mimeType: "application/gzip",
    body: fs.createReadStream(filePath),
  };

  try {
    const file = await service.files.create({
      uploadType: "resumable",
      requestBody,
      media,
    });
    console.log("File Id:", file.data.id);
    return file.data.id;
  } catch (err) {
    throw err;
  }
};

export default uploadFile;
