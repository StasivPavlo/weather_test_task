import React from 'react';
import { WeatherData } from '@/types/weather';
import { DetailCard } from '@/components/ui/DetailCard/DetailCard';
import { Wind, Droplets, Eye, Cloud, Sunrise, Sunset } from 'lucide-react';
import { formatWindSpeed, formatTime, getWindDirection, formatVisibility } from '@/utils/weatherFormatters';
import styles from './WeatherDetailsGrid.module.scss';

interface WeatherDetailsGridProps {
  weather: WeatherData;
}

export function WeatherDetailsGrid({ weather }: WeatherDetailsGridProps) {
  return (
    <div className={styles.detailsGrid}>
      <DetailCard
        icon={Wind}
        label="Wind"
        value={`${formatWindSpeed(weather.wind.speed)} ${getWindDirection(weather.wind.deg)}`}
        className={styles.detailCard}
      />

      <DetailCard
        icon={Droplets}
        label="Humidity"
        value={`${weather.main.humidity}%`}
        className={styles.detailCard}
      />

      <DetailCard
        icon={Eye}
        label="Visibility"
        value={formatVisibility(weather.visibility)}
        className={styles.detailCard}
      />

      <DetailCard
        icon={Cloud}
        label="Cloudiness"
        value={`${weather.clouds.all}%`}
        className={styles.detailCard}
      />

      <DetailCard
        icon={Sunrise}
        label="Sunrise"
        value={formatTime(weather.sys.sunrise)}
        className={styles.detailCard}
      />

      <DetailCard
        icon={Sunset}
        label="Sunset"
        value={formatTime(weather.sys.sunset)}
        className={styles.detailCard}
      />
    </div>
  );
}

