import { WeatherData, WeatherForecast } from '@/types/weather';
import { WEATHER_CONSTANTS, ERROR_MESSAGES } from '@/constants/weather';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

if (!API_KEY) {
  throw new Error(ERROR_MESSAGES.API_KEY_MISSING);
}

const createWeatherUrl = (endpoint: string, params: Record<string, string> = {}): string => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('appid', API_KEY);
  url.searchParams.set('units', 'metric');
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
};

const makeWeatherRequest = async <T>(
  endpoint: string, 
  params: Record<string, string> = {}, 
  retries: number = WEATHER_CONSTANTS.RETRY_ATTEMPTS
): Promise<T> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const url = createWeatherUrl(endpoint, params);
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        let errorMessage = `Weather API error: ${response.status} ${response.statusText}`;
        
        if (response.status === 401) {
          errorMessage = ERROR_MESSAGES.INVALID_API_KEY;
        } else if (response.status === 404) {
          errorMessage = ERROR_MESSAGES.CITY_NOT_FOUND;
        } else if (response.status === 429) {
          errorMessage = ERROR_MESSAGES.RATE_LIMIT_EXCEEDED;
        } else if (response.status >= 500) {
          errorMessage = ERROR_MESSAGES.SERVICE_UNAVAILABLE;
        }
        
        if (attempt === retries) {
          throw new Error(errorMessage);
        }
        
        await new Promise(resolve => setTimeout(resolve, WEATHER_CONSTANTS.RETRY_DELAY * attempt));
        continue;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (attempt === retries) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
      }
      
      await new Promise(resolve => setTimeout(resolve, WEATHER_CONSTANTS.RETRY_DELAY * attempt));
    }
  }
  
  throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
};

export const getCurrentWeather = async (cityName: string): Promise<WeatherData> => {
  return makeWeatherRequest<WeatherData>('/weather', { q: cityName });
};

export const getCurrentWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  return makeWeatherRequest<WeatherData>('/weather', { 
    lat: lat.toString(), 
    lon: lon.toString() 
  });
};

export const getWeatherForecast = async (cityName: string): Promise<WeatherForecast> => {
  return makeWeatherRequest<WeatherForecast>('/forecast', { q: cityName });
};

export const getWeatherForecastByCoords = async (lat: number, lon: number): Promise<WeatherForecast> => {
  return makeWeatherRequest<WeatherForecast>('/forecast', { 
    lat: lat.toString(), 
    lon: lon.toString(),
  });
};

export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const weatherApi = {
  getCurrentWeather,
  getCurrentWeatherByCoords,
  getWeatherForecast,
  getWeatherForecastByCoords,
  getWeatherIconUrl,
};
