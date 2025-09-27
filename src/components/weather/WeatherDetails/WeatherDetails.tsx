'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { WeatherData, WeatherForecast } from '@/types/weather';
import { useWeatherData } from '@/hooks/useWeatherData';
import { WeatherDetailsHeader, CurrentWeatherInfo, WeatherDetailsGrid, TemperatureChart } from '@/components';
import styles from './WeatherDetails.module.scss';


interface WeatherDetailsProps {
  cityName: string;
  weather: WeatherData;
  forecast?: WeatherForecast;
  loading?: boolean;
}

export function WeatherDetails({
  cityName,
  weather: initialWeather,
  forecast: initialForecast,
}: WeatherDetailsProps) {
  const router = useRouter();
  const { 
    weather, 
    forecast, 
    loading, 
    updateWeather 
  } = useWeatherData({
    cityName,
    initialWeather,
    initialForecast,
    autoUpdate: true,
  });

  const handleBack = () => {
    router.back();
  };

  if (!weather) {
    return null;
  }

  return (
    <div className={styles.weatherDetails}>
      <WeatherDetailsHeader
        cityName={cityName}
        onBack={handleBack}
        onUpdate={updateWeather}
        loading={loading}
      />

      <div className={styles.content}>
        <CurrentWeatherInfo weather={weather} />
        
        <WeatherDetailsGrid weather={weather} />
        
        <TemperatureChart
          forecast={forecast}
          loading={loading}
        />
      </div>
    </div>
  );
}
