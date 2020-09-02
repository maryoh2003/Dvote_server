import 'dotenv/config';

import { PORT } from '@config/index';

import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorMiddleware from '@middleware/error.middleware';
import * as logger from '@lib/logger';
import Container from 'typedi';
import APIRouter from '../routers';
import path from 'path';

const load = async () => {
  const app: express.Application = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/static', express.static(path.join(__dirname, '../../public')));
  app.use('/api', Container.get(APIRouter).getRouter());

  app.use(errorMiddleware);

  const server: http.Server = http.createServer(app);

  server.listen(PORT, () => {
    logger.info(`Server is Running ${PORT}`);
  });
};

export default load;


