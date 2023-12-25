import "reflect-metadata";
import { AppdataSource } from './app/shared/infra/db/data-source';
import app from './main/config/app';

const port = process.env.PORT;

AppdataSource.initialize().then(() => {
    app.listen(port, () => console.log('server running'));
})