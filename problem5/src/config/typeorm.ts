import { DataSource } from 'typeorm';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5434'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD + '',
    // database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        path.join(__dirname, '../**/*.entity{.ts,.js}'),
    ],
});

