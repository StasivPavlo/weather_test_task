export const WEATHER_CONSTANTS = {
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  CACHE_REVALIDATE: 300,
  FORECAST_INTERVAL: 2,
  MAX_FORECAST_ITEMS: 8,
  WEATHER_ICON_SIZE: {
    SMALL: 24,
    MEDIUM: 48,
    LARGE: 64,
  },
  CHART_HEIGHT: 300,
  CHART_COLORS: {
    TEMPERATURE: '#667eea',
    FEELS_LIKE: '#764ba2',
  },
  GRID_MIN_WIDTH: 320,
  GRID_GAP: '1.5rem',
} as const;

export const ERROR_MESSAGES = {
  API_KEY_MISSING: 'Weather API key is not configured. Please set NEXT_PUBLIC_WEATHER_API_KEY environment variable.',
  INVALID_API_KEY: 'Invalid API key. Please check your weather API configuration.',
  CITY_NOT_FOUND: 'City not found. Please check the city name and try again.',
  RATE_LIMIT_EXCEEDED: 'API rate limit exceeded. Please try again later.',
  SERVICE_UNAVAILABLE: 'Weather service is temporarily unavailable. Please try again later.',
  NETWORK_ERROR: 'Failed to fetch weather data. Please check your internet connection.',
  CITY_ALREADY_EXISTS: 'City already exists',
  FAILED_TO_ADD_CITY: 'Failed to add city',
  FAILED_TO_UPDATE_WEATHER: 'Failed to update weather',
  FAILED_TO_UPDATE_FORECAST: 'Failed to update forecast',
  FAILED_TO_REFRESH_WEATHER: 'Failed to refresh weather',
} as const;
