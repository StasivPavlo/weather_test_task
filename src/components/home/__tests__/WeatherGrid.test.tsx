import React from 'react';
import { render, screen } from '@testing-library/react';
import { WeatherGrid } from '../WeatherGrid/WeatherGrid';
import { City, WeatherData } from '@/types/weather';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/store/weatherStore', () => ({
  useWeatherStore: jest.fn(),
}));

import { useWeatherStore } from '@/store/weatherStore';

const mockUseWeatherStore = useWeatherStore as jest.MockedFunction<typeof useWeatherStore>;

const mockCities: City[] = [
  {
    id: 1,
    name: 'London',
    country: 'GB',
    coord: { lat: 51.5074, lon: -0.1278 },
  },
  {
    id: 2,
    name: 'Paris',
    country: 'FR',
    coord: { lat: 48.8566, lon: 2.3522 },
  },
];

const mockWeatherData: Record<string, WeatherData> = {
  'London': {
    id: 1,
    name: 'London',
    country: 'GB',
    coord: { lat: 51.5074, lon: -0.1278 },
    main: {
      temp: 15,
      feels_like: 13,
      temp_min: 12,
      temp_max: 18,
      humidity: 80,
      pressure: 1013,
    },
    weather: [{ id: 1, main: 'Clouds', description: 'overcast clouds', icon: '04d' }],
    wind: { speed: 3.5, deg: 200 },
    visibility: 10000,
    clouds: { all: 75 },
    sys: { sunrise: 1640952000, sunset: 1640995200 },
    dt: 1640995200,
  },
  'Paris': {
    id: 2,
    name: 'Paris',
    country: 'FR',
    coord: { lat: 48.8566, lon: 2.3522 },
    main: {
      temp: 18,
      feels_like: 16,
      temp_min: 15,
      temp_max: 21,
      humidity: 70,
      pressure: 1015,
    },
    weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
    wind: { speed: 2.1, deg: 150 },
    visibility: 15000,
    clouds: { all: 20 },
    sys: { sunrise: 1640952000, sunset: 1640995200 },
    dt: 1640995200,
  },
};

describe('WeatherGrid', () => {
  const mockRemoveCity = jest.fn();
  const mockUpdateWeather = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseWeatherStore.mockReturnValue({
      cities: mockCities,
      weatherData: mockWeatherData,
      loading: false,
      removeCity: mockRemoveCity,
      updateWeather: mockUpdateWeather,
    } as unknown as ReturnType<typeof useWeatherStore>);
  });

  it('should render weather cards for all cities', () => {
    render(<WeatherGrid />);

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });

  it('should not render cards for cities without weather data', () => {
    const citiesWithoutWeather = [
      ...mockCities,
      {
        id: 3,
        name: 'Berlin',
        country: 'DE',
        coord: { lat: 52.5200, lon: 13.4050 },
      },
    ];

    mockUseWeatherStore.mockReturnValue({
      cities: citiesWithoutWeather,
      weatherData: mockWeatherData,
      loading: false,
      removeCity: mockRemoveCity,
      updateWeather: mockUpdateWeather,
    } as unknown as ReturnType<typeof useWeatherStore>);

    render(<WeatherGrid />);

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.queryByText('Berlin')).not.toBeInTheDocument();
  });

  it('should handle empty cities array', () => {
    mockUseWeatherStore.mockReturnValue({
      cities: [],
      weatherData: {},
      loading: false,
      removeCity: mockRemoveCity,
      updateWeather: mockUpdateWeather,
    } as unknown as ReturnType<typeof useWeatherStore>);

    render(<WeatherGrid />);

    expect(screen.queryByText('London')).not.toBeInTheDocument();
    expect(screen.queryByText('Paris')).not.toBeInTheDocument();
  });
});
