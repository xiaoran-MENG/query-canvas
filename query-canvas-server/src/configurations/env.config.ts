import dotenv from 'dotenv';
import { bool, cleanEnv, port, str } from 'envalid';

dotenv.config();

export const envConfig = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
    PORT: port({ default: 5100 }),
    DB_HOST: str(),
    DB_PORT: port({ default: 5432 }),
    DB_USERNAME: str(),
    DB_PASSWORD: str(),
    DB_DATABASE: str(),
    DB_SSL: bool({ default: false }),
    SECRET_KEY_ONE: str(),
    SECRET_KEY_TWO: str(),
    ANGULAR_URL: str(),
    JWT_ACCESS_SECRET: str(),
});
