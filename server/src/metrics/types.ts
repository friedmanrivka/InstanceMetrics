export interface MetricInput {
    ip: string;
    startTime: string; 
    endTime: string;   
    interval: number;  
  }
  
  export interface MetricDataPoint {
    timestamp: string;
    value: number;
  }