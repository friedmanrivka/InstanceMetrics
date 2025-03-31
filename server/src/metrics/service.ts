import { cloudwatch, ec2 } from '../config/aws';
import { MetricInput, MetricDataPoint } from './types';

const getInstanceIdByIp = async (ip: string): Promise<string | null> => {
  try {
    const result = await ec2.describeInstances({
      Filters: [
        {
          Name: 'private-ip-address',
          Values: [ip],
        },
      ],
    }).promise();

    const reservations = result.Reservations ?? [];

    for (const res of reservations) {
      const instances = res.Instances ?? [];
      for (const inst of instances) {
        if (inst.InstanceId) return inst.InstanceId;
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching instance by IP:', error);
    throw new Error(`Error checking instance for IP ${ip}`);
  }
};

export const getCpuMetrics = async (input: MetricInput): Promise<MetricDataPoint[]> => {
  const instanceId = await getInstanceIdByIp(input.ip);
  if (!instanceId) {
    throw new Error(`Instance with IP ${input.ip} not found`);  
  }
  const params = {
    StartTime: new Date(input.startTime),
    EndTime: new Date(input.endTime),
    MetricName: 'CPUUtilization',
    Namespace: 'AWS/EC2',
    Period: input.interval,
    Statistics: ['Average'],
    Dimensions: [
      {
        Name: 'InstanceId',
        Value: instanceId
      }
    ]
  };

  try {
    const response = await cloudwatch.getMetricStatistics(params).promise();
    return response.Datapoints?.map(dp => ({
      timestamp: dp.Timestamp?.toISOString() || '',
      value: dp.Average || 0,
    })) || [];
  } catch (error) {
    console.error('Error fetching CPU metrics:', error);
    throw new Error('Error fetching CPU metrics.');
  }
};
