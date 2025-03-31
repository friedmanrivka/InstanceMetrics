import { useState } from 'react';
import { Box, TextField, MenuItem, Button, Typography } from '@mui/material';
import { validateForm } from '../utils/validation'; 

function InputForm({ onSubmit }) {
  const [timePeriod, setTimePeriod] = useState('');
  const [interval, setInterval] = useState('');
  const [ip, setIp] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm({ interval, ip });

    if (Object.keys(validationErrors).length === 0) {
      if (onSubmit) {
        onSubmit({ timePeriod, interval, ip });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#f5f5f5',
        paddingY: 2,
        boxSizing: 'border-box',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 2,
          borderRadius: 2,
          boxShadow: 2,
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          top: 0,
        }}
        noValidate
      >
        <Typography variant="h6" sx={{ minWidth: 220 }}>
          AWS Instance CPU Usage by IP
        </Typography>

        <TextField
          select
          label="Time Period"
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          size="small"
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="Last 30 Minutes">Last 30 Minutes</MenuItem>
          <MenuItem value="Last 2 Hours">Last 2 Hours</MenuItem>
          <MenuItem value="Last 3 Days">Last 3 Days</MenuItem>
          <MenuItem value="Last Month">Last Month</MenuItem>
        </TextField>

        <TextField
          label="Period"
          type="text"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          size="small"
          error={Boolean(errors.interval)}
          helperText={errors.interval}
          sx={{ minWidth: 160 }}
        />

        <TextField
          label="IP Address"
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          size="small"
          error={Boolean(errors.ip)}
          helperText={errors.ip}
          sx={{ minWidth: 180 }}
        />

        <Button variant="contained" color="primary" type="submit" sx={{ height: 40 }}>
          Load
        </Button>
      </Box>
    </Box>
  );
}

export default InputForm;
