export interface DatabaseParams {
  username?: string;
  password?: string;
  host?: string;
  port?: number;
  database?: string;
  filename?: string;
}

export const getDatabaseParams = (
  username?: string,
  password?: string,
  host?: string,
  port?: number,
  database?: string,
  filename?: string
): DatabaseParams => {
  return {
    username,
    password,
    host,
    port,
    database,
    filename,
  };
};
