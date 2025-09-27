'use client';

import React from 'react';
import { WeatherData, City } from '@/types/weather';
import { WeatherCardHeader, WeatherCardInfo, WeatherCardActions } from '@/components/weather';
import styles from './WeatherCard.module.scss';

interface WeatherCardProps {
  city: City;
  weather: WeatherData;
  onRemove: () => void;
  onUpdate: () => void;
  onViewDetails: () => void;
  loading?: boolean;
}

export function WeatherCard({
  city,
  weather,
  onRemove,
  onUpdate,
  onViewDetails,
  loading = false,
}: WeatherCardProps) {
  const handleUpdate = () => {
    onUpdate();
  };

  const handleRemove = () => {
    onRemove();
  };

  const handleViewDetails = () => {
    onViewDetails();
  };

  return (
    <div className={styles.weatherCard}>
      <WeatherCardHeader
        cityName={city.name}
        country={city.country}
        onRemove={handleRemove}
      />
      
      <WeatherCardInfo weather={weather} />
      
      <WeatherCardActions
        onUpdate={handleUpdate}
        onViewDetails={handleViewDetails}
        loading={loading}
      />
    </div>
  );
}
