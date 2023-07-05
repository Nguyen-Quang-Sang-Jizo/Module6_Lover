import {DataSource} from "typeorm";
import * as dotenv from "dotenv";
dotenv.config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: +process.env.PORTDB,
    username: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.DATABASE,
    synchronize: true,
    entities: ["dist/src/entity/*{.js,.ts}"], // typeorm loads entities from this directory
    migrations: ['src/migrations/**/*{.ts,.js}'],
})