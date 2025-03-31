export function validateForm({ interval, ip }) {
    const errors = {};
  
    if (!/^\d+$/.test(interval) || parseInt(interval, 10) <= 0) {
      errors.interval = 'Interval must be a positive number';
    }
  
    if (
      !/^(\d{1,3}\.){3}\d{1,3}$/.test(ip) ||
      !ip.split('.').every(num => Number(num) >= 0 && Number(num) <= 255)
    ) {
      errors.ip = 'IP address must be a valid IPv4 address (0-255)';
    }
  
   return errors;
  }
  