import { useState } from 'react';
import InputForm from './InputForm'
import CpuChart from './CpuChart';
import getCpuMetrics from '../services/metricsApi';
import { GetTimeRange } from './GetTimeRange';

function MetricsContainer() {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [errorMessage,setErorrMessage]=useState("");

  const handleFormSubmit = async ({ ip, interval, timePeriod }) => {
    const { startTime, endTime } = GetTimeRange(timePeriod);

    const params = {
      ip,
      interval,
      startTime,
      endTime,
    };

    console.log('Sending params:', params);

    try {
      const response = await getCpuMetrics(params);
      const sorted = response.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
      setLabels(sorted.map((point) => point.timestamp));
      setData(sorted.map((point) => point.value));
      setErorrMessage("");
    } catch (err) {
      console.error('Error loading metrics:', err);
      setErorrMessage(err.message);

    }
  };

  return (
    <>
    
      <InputForm onSubmit={handleFormSubmit} />
      {errorMessage && <div style={{ color: 'red', marginBottom: '5px', textAlign: 'center' }}>{errorMessage}</div>} 
      {data.length > 0 && <CpuChart labels={labels} data={data} />}
    </>
  );
}

export default MetricsContainer;
