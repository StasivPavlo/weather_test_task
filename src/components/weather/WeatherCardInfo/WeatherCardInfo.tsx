import React from 'react';
import { WeatherData } from '@/types/weather';
import { WeatherIcon } from '@/components/ui/WeatherIcon/WeatherIcon';
import { TemperatureDisplay } from '@/components/ui/TemperatureDisplay/TemperatureDisplay';
import { formatWindSpeed } from '@/utils/weatherFormatters';
import styles from './WeatherCardInfo.module.scss';

interface WeatherCardInfoProps {
  weather: WeatherData;
}

export function WeatherCardInfo({ weather }: WeatherCardInfoProps) {
  return (
    <div className={styles.weatherInfo}>
      <div className={styles.mainWeather}>
        <WeatherIcon
          iconCode={weather.weather[0].icon}
          description={weather.weather[0].description}
          className={styles.weatherIcon}
          size={48}
        />
        <TemperatureDisplay
          temperature={weather.main.temp}
          className={styles.temperature}
        />
      </div>
      
      <div className={styles.weatherDescription}>
        {weather.weather[0].description}
      </div>

      <div className={styles.weatherDetails}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Feels like</span>
          <span className={styles.detailValue}>
            <TemperatureDisplay temperature={weather.main.feels_like} />
          </span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Humidity</span>
          <span className={styles.detailValue}>{weather.main.humidity}%</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Wind</span>
          <span className={styles.detailValue}>
            {formatWindSpeed(weather.wind.speed)}
          </span>
        </div>
      </div>
    </div>
  );
}

