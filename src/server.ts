import express from 'express';
import cors from 'cors';
import "reflect-metadata";
import { routesApp } from './routes';
import { AppdataSource } from './app/shared/infra/db/data-source';

const allowerOrigins = ['*']

export const options: cors.CorsOptions = {
    origin: allowerOrigins
}

const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT; 

routesApp(app)

AppdataSource.initialize().then(() => {
    app.listen(port, () => console.log('server running'));
})