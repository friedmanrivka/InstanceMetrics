export const GetTimeRange = (timePeriod) => {
  const now = new Date();
  let start;

  switch (timePeriod) {
    case 'Last 30 Minutes':
      start = new Date(now.getTime() - 30 * 60 * 1000);
      break;
    case 'Last 2 Hours':
      start = new Date(now.getTime() - 2 * 60 * 60 * 1000);
      break;
    case 'Last 3 Days':
      start = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
      break;
    case 'Last Month':
      start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    default:
      start = new Date(now.getTime() - 30 * 60 * 1000);
  }

  return {
    startTime: start.toISOString(),
    endTime: now.toISOString(),
  };
};
