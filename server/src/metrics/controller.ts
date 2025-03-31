import { Request, Response } from 'express';
import { getCpuMetrics } from './service';
import { MetricInput } from './types';

export const getMetrics = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const input = (req as any).validatedInput as MetricInput;
    
    const data = await getCpuMetrics(input);
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching metrics:', error);

    if (error.code === 'InvalidParameterValue') {
      res.status(400).json({ error: error.message });
      return;    }

    res.status(500).json({ error: 'Internal server error' });
  }
};