'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useWeatherStore } from '@/store/weatherStore';
import { WeatherCard } from '../WeatherCard/WeatherCard';
import { EmptyState } from '@/components/ui';
import styles from './WeatherGrid.module.scss';

export function WeatherGrid() {
  const router = useRouter();
  const {
    cities,
    weatherData,
    removeCity,
    updateWeather,
  } = useWeatherStore();
  
  const [updatingCities, setUpdatingCities] = React.useState<Set<string>>(new Set());

  const handleRemoveCity = (cityName: string) => {
    removeCity(cityName);
  };

  const handleUpdateWeather = async (cityName: string) => {
    setUpdatingCities(prev => new Set(prev).add(cityName));
    try {
      await updateWeather(cityName);
    } catch {
    } finally {
      setUpdatingCities(prev => {
        const newSet = new Set(prev);
        newSet.delete(cityName);
        return newSet;
      });
    }
  };

  const handleViewDetails = (cityName: string) => {
    router.push(`/weather/${encodeURIComponent(cityName)}`);
  };

  if (cities.length === 0) {
    return <EmptyState />;
  }
  return (
    <div className={styles.weatherGrid}>
      {cities.map((city) => {
        const weather = weatherData[city.name];
        if (!weather) return null;

        return (
          <WeatherCard
            key={city.name}
            city={city}
            weather={weather}
            onRemove={() => handleRemoveCity(city.name)}
            onUpdate={() => handleUpdateWeather(city.name)}
            onViewDetails={() => handleViewDetails(city.name)}
            loading={updatingCities.has(city.name)}
          />
        );
      })}
    </div>
  );
}

