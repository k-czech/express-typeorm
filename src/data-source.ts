import { DataSource } from "typeorm";
import { User } from "./entities/User.ts";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password1",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [User],
});