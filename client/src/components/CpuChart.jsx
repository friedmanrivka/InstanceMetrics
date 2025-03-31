import { Line } from 'react-chartjs-2';
import {Chart as ChartJS,LineElement,PointElement,LinearScale,TimeScale,Title,Tooltip,Legend,Filler,CategoryScale,} from 'chart.js';
import { Box, Typography } from '@mui/material';

ChartJS.register(LineElement,PointElement,LinearScale,TimeScale,Title,Tooltip,Legend,Filler,CategoryScale);

function CpuChart({ labels = [], data = [] }) {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'CPU Usage (%)',
        data,
        fill: false,
        borderColor: '#1976d2',
        backgroundColor: '#1976d2',
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'CPU %',
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '1rem', height: 'calc(100vh - 200px)' }}>
      <Typography variant="h5" align="center" gutterBottom>
        CPU Usage Over Time
      </Typography>
      <Line data={chartData} options={options} />
    </Box>
  );
}

export default CpuChart;
