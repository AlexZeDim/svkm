import * as mongoose from 'mongoose';
import { config } from '@svkm/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(config.mongo.connectionString),
  },
];
