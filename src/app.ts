import express, { Application, Request, Response } from 'express';
import globalErrorMiddleware from './app/middlewares/globalErrorMiddleware';
import router from './app/routes';

const app: Application = express();

app.use(express.json());

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use(globalErrorMiddleware);

export default app;
