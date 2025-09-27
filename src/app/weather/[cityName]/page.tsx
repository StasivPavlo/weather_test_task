import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WeatherDetails } from '@/components/weather/WeatherDetails/WeatherDetails';
import { WeatherData, WeatherForecast } from '@/types/weather';
import { getWeatherForecast, getCurrentWeather } from '@/services/weatherApi';

interface WeatherDetailPageProps {
  params: Promise<{ cityName: string }>;
}


const getWeatherData = async (cityName: string): Promise<{ city: { id: number; name: string; country: string; coord: { lat: number; lon: number } }; weather: WeatherData; forecast: WeatherForecast } | null> => {
  try {
    const [weather, forecast] = await Promise.all([
      getCurrentWeather(cityName),
      getWeatherForecast(cityName)
    ]);
    
    const city = {
      id: weather.id,
      name: weather.name,
      country: weather.country,
      coord: weather.coord
    };

    return { city, weather, forecast };
  } catch {
    return null;
  }
};

export const revalidate = 300;

export async function generateMetadata({ params }: WeatherDetailPageProps): Promise<Metadata> {
  const { cityName } = await params;
  const decodedCityName = decodeURIComponent(cityName);
  
  return {
    title: `${decodedCityName} Weather`,
    description: `Current weather information for ${decodedCityName}`,
  };
}

export default async function WeatherDetailPage({ params }: WeatherDetailPageProps) {
  const { cityName } = await params;
  const decodedCityName = decodeURIComponent(cityName);
  const data = await getWeatherData(decodedCityName);
  
  if (!data) {
    notFound();
  }

  const { weather, forecast } = data;

  return (
    <WeatherDetails
      cityName={decodedCityName}
      weather={weather}
      forecast={forecast}
      loading={false}
    />
  );
}
