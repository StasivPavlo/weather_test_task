export const formatTemperature = (temp: number): string => {
  if (typeof temp !== 'number' || isNaN(temp)) {
    return 'N/A°C';
  }
  return `${Math.round(temp)}°C`;
};

export const formatWindSpeed = (speed: number): string => {
  if (typeof speed !== 'number' || isNaN(speed) || speed < 0) {
    return 'N/A km/h';
  }
  return `${Math.round(speed * 3.6)} km/h`;
};

export const formatTime = (timestamp: number): string => {
  if (typeof timestamp !== 'number' || isNaN(timestamp) || timestamp <= 0) {
    return 'N/A';
  }
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getWindDirection = (deg: number): string => {
  if (typeof deg !== 'number' || isNaN(deg)) {
    return 'N/A';
  }
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(deg / 45) % 8];
};

export const formatVisibility = (visibility: number): string => {
  if (typeof visibility !== 'number' || isNaN(visibility) || visibility < 0) {
    return 'N/A km';
  }
  return `${Math.round(visibility / 1000)} km`;
};

