import { getConnection } from '@models/connection';
import { Container } from 'typedi';
import { useContainer } from 'typeorm';
import * as logger from '@lib/logger';

const load = async () => {
  useContainer(Container);
  await getConnection();
  logger.info('[DB] Sync');
};

export default load;
