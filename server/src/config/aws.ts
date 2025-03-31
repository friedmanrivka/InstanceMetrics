process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const cloudwatch = new AWS.CloudWatch();
export const ec2 = new AWS.EC2();