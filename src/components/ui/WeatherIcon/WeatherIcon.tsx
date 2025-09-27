import React from 'react';
import Image from 'next/image';
import { getWeatherIconUrl } from '@/services/weatherApi';

interface WeatherIconProps {
  iconCode: string;
  description: string;
  className?: string;
  size?: number;
}

export function WeatherIcon({
  iconCode,
  description,
  className = '',
  size = 64,
}: WeatherIconProps) {
  return (
    <Image
      src={getWeatherIconUrl(iconCode)}
      alt={description}
      className={className}
      width={size}
      height={size}
      unoptimized
    />
  );
}

