import { Request, Response, NextFunction } from 'express';
import { MetricInput } from './types';

export const validateMetricQuery = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { ip, startTime, endTime, interval } = req.query;

  if (!ip || !startTime || !endTime || !interval) {
    res.status(400).json({
      error: 'Missing required query parameters: ip, startTime, endTime, interval',
    });
    return;
  }

  const intervalNumber = Number(interval);
  if (isNaN(intervalNumber)) {
    res.status(400).json({ error: 'Invalid interval: must be a number' });
    return;
  }

  if (intervalNumber % 60 !== 0) {
    res.status(400).json({ error: 'Invalid interval: must be a multiple of 60' });
    return;
  }

  
  (req as any).validatedInput = {
    ip: ip as string,
    startTime: startTime as string,
    endTime: endTime as string,
    interval: intervalNumber,
  };

  next();
};
