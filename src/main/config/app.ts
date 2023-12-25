import express from 'express';
import setupRoutes from './routes';
import setupMiddewares from './middleware';

const app = express();

setupMiddewares(app);
setupRoutes(app);

export default app;