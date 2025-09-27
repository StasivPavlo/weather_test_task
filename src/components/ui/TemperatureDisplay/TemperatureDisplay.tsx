import React from 'react';
import { formatTemperature } from '@/utils/weatherFormatters';

interface TemperatureDisplayProps {
  temperature: number;
  className?: string;
  showUnit?: boolean;
}

export function TemperatureDisplay({
  temperature,
  className = '',
  showUnit = true,
}: TemperatureDisplayProps) {
  const formattedTemp = showUnit 
    ? formatTemperature(temperature)
    : Math.round(temperature).toString();

  return (
    <span className={className}>
      {formattedTemp}
    </span>
  );
}

