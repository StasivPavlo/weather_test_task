import React from 'react';
import { WeatherData } from '@/types/weather';
import { WeatherIcon } from '@/components/ui/WeatherIcon/WeatherIcon';
import { TemperatureDisplay } from '@/components/ui/TemperatureDisplay/TemperatureDisplay';
import styles from './CurrentWeatherInfo.module.scss';

interface CurrentWeatherInfoProps {
  weather: WeatherData;
}

export function CurrentWeatherInfo({ weather }: CurrentWeatherInfoProps) {
  return (
    <div className={styles.currentWeather}>
      <div className={styles.mainInfo}>
        <TemperatureDisplay
          temperature={weather.main.temp}
          className={styles.temperature}
        />
        <div className={styles.weatherInfo}>
          <WeatherIcon
            iconCode={weather.weather[0].icon}
            description={weather.weather[0].description}
            className={styles.weatherIcon}
            size={80}
          />
          <div className={styles.description}>
            <h2>{weather.weather[0].description}</h2>
            <p>Feels like <TemperatureDisplay temperature={weather.main.feels_like} /></p>
          </div>
        </div>
      </div>
    </div>
  );
}

