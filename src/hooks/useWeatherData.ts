import { useEffect, useState } from 'react';
import { useWeatherStore } from '@/store/weatherStore';
import { WeatherData, WeatherForecast } from '@/types/weather';

interface UseWeatherDataOptions {
  cityName: string;
  initialWeather?: WeatherData;
  initialForecast?: WeatherForecast;
  autoUpdate?: boolean;
}

export const useWeatherData = ({
  cityName,
  initialWeather,
  initialForecast,
  autoUpdate = true,
}: UseWeatherDataOptions) => {
  const {
    weatherData,
    forecastData,
    loading: storeLoading,
    error,
    updateWeather,
    updateForecast,
  } = useWeatherStore();
  
  const [forecastLoading, setForecastLoading] = useState(false);
  
  const weather = weatherData[cityName] || initialWeather;
  const forecast = forecastData[cityName] || initialForecast;
  const loading = storeLoading || false;

  useEffect(() => {
    if (autoUpdate) {
      if (!initialWeather && !weatherData[cityName]) {
        updateWeather(cityName);
      }
      if (!initialForecast && !forecastData[cityName]) {
        updateForecast(cityName);
      }
    }
  }, [
    cityName,
    initialWeather,
    initialForecast,
    weatherData,
    forecastData,
    updateWeather,
    updateForecast,
    autoUpdate,
  ]);

  const handleUpdate = async () => {
    if (!weather) return;
    
    setForecastLoading(true);
    try {
      await Promise.all([
        updateWeather(cityName),
        updateForecast(cityName)
      ]);
    } catch {
    } finally {
      setForecastLoading(false);
    }
  };

  return {
    weather,
    forecast,
    loading: loading || forecastLoading,
    error,
    updateWeather: handleUpdate,
  };
};
