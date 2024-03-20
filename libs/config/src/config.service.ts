import path from 'path';
import fs from 'node:fs';
import YAML from 'yaml';
import * as process from 'node:process';

const configFilePath = path.join(
  __dirname,
  '..',
  'config',
  `${process.env.NODE_ENV}.yml`,
);

console.log(configFilePath);

// const yaml = fs.readFileSync(configFilePath, 'utf8');
// const config = YAML.parse();

export const config = {
  mongo: {
    connectionString: process.env.MONGO_CONNECTION,
  },
};
