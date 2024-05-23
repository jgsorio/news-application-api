import express, { Application } from 'express';
import router from './routes';
import cors from 'cors';

class App {
    public app: Application;
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use('/uploads', express.static('uploads'));
    }

    routes() {
        this.app.use('/api', router);
    }
}

export default new App().app;
