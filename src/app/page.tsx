import React from 'react';
import { Metadata } from 'next';
import { WeatherHeader } from '@/components/home/WeatherHeader/WeatherHeader';
import { WeatherGrid } from '@/components/home/WeatherGrid/WeatherGrid';
import { AddCityForm } from '@/components/home/AddCityForm/AddCityForm';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Get real-time weather information for cities around the world.',
};

export default function Home() {
  return (
    <div className={styles.container}>
      <WeatherHeader />
      <AddCityForm />
      <WeatherGrid />
    </div>
  );
}