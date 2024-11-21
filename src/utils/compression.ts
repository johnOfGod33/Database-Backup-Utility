import stream from "stream";
import zlib from "zlib";
import fs from "fs";
import util from "util";
import chalk from "chalk";

const { promisify } = util;
const { createWriteStream, createReadStream } = fs;
const { pipeline } = stream;
const { createGzip } = zlib;
const pipe = promisify(pipeline);

const compression = async (
  input: NodeJS.ReadableStream | string,
  outpout: string
) => {
  try {
    const gzip = createGzip();
    const destination = createWriteStream(outpout);

    if (typeof input == "string") {
      const source = createReadStream(input);
      await pipe(source, gzip, destination);
    } else {
      await pipe(input, gzip, destination);
    }

    console.log(chalk.green("Compression success"));
  } catch (error: any) {
    console.error("An error occurred :", error.message);
    process.exitCode = 1;
  }
};

export default compression;
