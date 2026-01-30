import express, { json } from 'express';
import morgan from 'morgan';
import { mainRouter } from './main/main.router.ts';

export const app = express();

app.use(json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
    return res.status(200).end('OK');
});

app.use(mainRouter);
