import { Router } from 'express';

interface ICustomRouter {
  getRouter(): Router;
}

export default ICustomRouter;
