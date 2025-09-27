'use client';

import React from 'react';
import { WeatherForecast } from '@/types/weather';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WEATHER_CONSTANTS } from '@/constants/weather';
import styles from './TemperatureChart.module.scss';

interface TemperatureChartProps {
  forecast: WeatherForecast | null;
  loading?: boolean;
}

export function TemperatureChart({
  forecast,
  loading = false,
}: TemperatureChartProps) {
  const prepareChartData = () => {
    if (!forecast) return [];

    return forecast.list
      .filter((item, index) => index % WEATHER_CONSTANTS.FORECAST_INTERVAL === 0)
      .slice(0, WEATHER_CONSTANTS.MAX_FORECAST_ITEMS)
      .map((item) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
          hour: '2-digit',
        }),
        temp: Math.round(item.main.temp),
        feelsLike: Math.round(item.main.feels_like),
        humidity: item.main.humidity,
      }));
  };

  const chartData = prepareChartData();

  if (loading) {
    return (
      <div className={styles.forecastSection}>
        <h3 className={styles.forecastTitle}>24-Hour Temperature Forecast</h3>
        <div className={styles.chartContainer}>
          <div className={styles.loading}>Loading forecast...</div>
        </div>
      </div>
    );
  }

  if (!forecast) {
    return null;
  }

  return (
    <div className={styles.forecastSection}>
      <h3 className={styles.forecastTitle}>24-Hour Temperature Forecast</h3>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={WEATHER_CONSTANTS.CHART_HEIGHT}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis 
              dataKey="time" 
              stroke="rgba(0,0,0,0.7)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(0,0,0,0.7)"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
              }}
              formatter={(value: number, name: string) => [
                `${value}°C`,
                name === 'temp' ? 'Temperature' : 'Feels Like'
              ]}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke={WEATHER_CONSTANTS.CHART_COLORS.TEMPERATURE}
              strokeWidth={3}
              dot={{ fill: WEATHER_CONSTANTS.CHART_COLORS.TEMPERATURE, strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="feelsLike"
              stroke={WEATHER_CONSTANTS.CHART_COLORS.FEELS_LIKE}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: WEATHER_CONSTANTS.CHART_COLORS.FEELS_LIKE, strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

