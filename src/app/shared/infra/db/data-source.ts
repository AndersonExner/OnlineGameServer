import { DataSource } from 'typeorm';
import { UserEntity } from './entities';
import { InitialCreate1703446792394 } from './migrations';
require ('dotenv').config();

export const AppdataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT!),
    username: process.env.DB_USER,
    password: process.env.DB_USER_PWD,
    database: process.env.DATABASE_NAME,
    logging: false,
    ssl: false,
    entities: [UserEntity],
    migrations: [InitialCreate1703446792394],
    synchronize: false
});