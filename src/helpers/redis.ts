import * as redis from 'redis';
import { config } from 'dotenv';
config();

const connection = () => {
    return redis.createClient({
        password: process.env.REDIS_PASSWORD,
        socket: {
            host: process.env.REDIS_URL,
            port: 15643
        }
    });
}

export { connection }
