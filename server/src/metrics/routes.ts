import { Router } from 'express';
import { getMetrics } from './controller';
 import {validateMetricQuery} from './validateMetricQuery';

const router = Router();

router.get('/',validateMetricQuery, getMetrics);

export default router;