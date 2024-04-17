import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);
app.use((req, res, next) => {
  res.status(404).send('Desculpe, essa rota nao existe.');
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Algo de errado nao esta certo!');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;