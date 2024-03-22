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

export let config = {
  mongo: {
    connectionString: process.env.MONGO_CONNECTION,
  },
};

const isExists = fs.existsSync(configFilePath);

if (isExists) {
  const yaml = fs.readFileSync(configFilePath, 'utf8');
  config = YAML.parse(yaml);
}
