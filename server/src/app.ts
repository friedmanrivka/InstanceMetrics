import express from 'express';
import metricsRoutes from './metrics/routes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/metrics', metricsRoutes); 

export default app;