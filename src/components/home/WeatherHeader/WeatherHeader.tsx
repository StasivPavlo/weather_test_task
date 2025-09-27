'use client';

import React from 'react';
import { Cloud, RefreshCw } from 'lucide-react';
import { useWeatherStore } from '@/store/weatherStore';
import { Button } from '@/components/ui';
import styles from './WeatherHeader.module.scss';

export function WeatherHeader() {
  const { cities, loading, refreshAllWeather } = useWeatherStore();
  const citiesCount = cities.length;
  return (
    <div className={styles.header}>
      <div className={styles.titleSection}>
        <Cloud className={styles.titleIcon} size={32} />
        <h1 className={styles.title}>Weather App</h1>
      </div>
      {citiesCount > 0 && (
        <Button
          variant="secondary"
          size="medium"
          onClick={refreshAllWeather}
          loading={loading}
        >
          <RefreshCw size={20} className={loading ? styles.spinning : ''} />
          Refresh All
        </Button>
      )}
    </div>
  );
}

