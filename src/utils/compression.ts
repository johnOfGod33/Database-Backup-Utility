import stream from "stream";
import zlib from "zlib";
import fs from "fs";
import util from "util";
import chalk from "chalk";

const { promisify } = util;
const { createWriteStream } = fs;
const { pipeline } = stream;
const { createGzip } = zlib;
const pipe = promisify(pipeline);

const compression = async (
  inputStream: NodeJS.ReadableStream,
  outpout: string
) => {
  try {
    const gzip = createGzip();
    const destination = createWriteStream(outpout);

    await pipe(inputStream, gzip, destination);

    console.log(chalk.green("Compression success"));
  } catch (error: any) {
    console.error("An error occurred :", error.message);
    process.exitCode = 1;
  }
};

export default compression;
