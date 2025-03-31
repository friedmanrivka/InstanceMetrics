import axios from 'axios';
const API_URL = 'http://localhost:3001/api/metrics';

export const getCpuMetrics = async ({ ip, startTime, endTime, interval }) => {
  try {
    const response = await axios.get(API_URL, {params: { ip, startTime, endTime, interval,
      },
    });
   return response.data;
  } catch (error) {
    if (error.response?.status === 500) {
      throw new Error("Instance with this IP not found.");
    }
    throw error;  
  }
};

export default getCpuMetrics;
