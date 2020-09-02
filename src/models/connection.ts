import 'reflect-metadata';
import { MYSQL } from '@config/index';
import {
  Connection,
  createConnection,
} from 'typeorm';
import models from '@models/index';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const getConnection = async (): Promise<Connection> => {

  const connectionOptions: MysqlConnectionOptions = {
    type: 'mysql',
    database: MYSQL.DATABASE,
    host: MYSQL.HOST,
    port: MYSQL.PORT,
    username: MYSQL.USERNAME,
    password: MYSQL.PASSWORD,
    synchronize: MYSQL.SYNC,
    charset: 'utf8mb4_unicode_ci',
    logging: false,
    entities: models,
  };

  return createConnection(connectionOptions);
};
