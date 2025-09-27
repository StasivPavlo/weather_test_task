import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { WeatherDetails } from '../WeatherDetails/WeatherDetails';
import { WeatherData, WeatherForecast } from '@/types/weather';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/services/weatherApi', () => ({
  getWeatherForecast: jest.fn(),
  getWeatherIconUrl: jest.fn((icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

jest.mock('@/store/weatherStore', () => ({
  useWeatherStore: jest.fn(),
}));

import { useWeatherStore } from '@/store/weatherStore';

const mockUseWeatherStore = useWeatherStore as jest.MockedFunction<typeof useWeatherStore>;

const mockWeatherData: WeatherData = {
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
};

const mockForecastData: WeatherForecast = {
  list: [
    {
      dt: 1640995200,
      main: { temp: 15, feels_like: 13, temp_min: 12, temp_max: 18, pressure: 1013, humidity: 80 },
      weather: [{ id: 1, main: 'Clouds', description: 'overcast clouds', icon: '04d' }],
      wind: { speed: 3.5, deg: 200 },
      visibility: 10000,
      clouds: { all: 75 },
      dt_txt: '2022-01-01 12:00:00',
    },
    {
      dt: 1641000000,
      main: { temp: 18, feels_like: 16, temp_min: 15, temp_max: 20, pressure: 1015, humidity: 70 },
      weather: [{ id: 2, main: 'Clear', description: 'clear sky', icon: '01d' }],
      wind: { speed: 2.5, deg: 180 },
      visibility: 15000,
      clouds: { all: 25 },
      dt_txt: '2022-01-01 14:00:00',
    },
  ],
  city: {
    id: 1,
    name: 'London',
    country: 'GB',
    coord: { lat: 51.5074, lon: -0.1278 },
    sunrise: 1640952000,
    sunset: 1640995200,
  },
};

describe('WeatherDetails', () => {
  const mockProps = {
    cityName: 'London',
    weather: mockWeatherData,
    forecast: mockForecastData,
    loading: false,
  };

  const mockUpdateWeather = jest.fn();
  const mockUpdateForecast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseWeatherStore.mockReturnValue({
      weatherData: {},
      forecastData: {},
      loading: false,
      error: null,
      updateWeather: mockUpdateWeather,
      updateForecast: mockUpdateForecast,
    } as unknown as ReturnType<typeof useWeatherData>);
  });

  it('should render weather details correctly', async () => {
    await act(async () => {
      render(<WeatherDetails {...mockProps} />);
    });

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('15°C')).toBeInTheDocument();
    expect(screen.getByText('overcast clouds')).toBeInTheDocument();
  });

  it('should call updateWeather and updateForecast when refresh button is clicked', async () => {
    mockUpdateWeather.mockResolvedValue(undefined);
    mockUpdateForecast.mockResolvedValue(undefined);

    await act(async () => {
      render(<WeatherDetails {...mockProps} />);
    });

    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    
    await act(async () => {
      refreshButton.click();
    });

    await waitFor(() => {
      expect(mockUpdateWeather).toHaveBeenCalledWith('London');
      expect(mockUpdateForecast).toHaveBeenCalledWith('London');
    });
  });

  it('should handle update errors gracefully', async () => {
    mockUpdateWeather.mockRejectedValue(new Error('Update failed'));
    mockUpdateForecast.mockRejectedValue(new Error('Update failed'));

    await act(async () => {
      render(<WeatherDetails {...mockProps} />);
    });

    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    
    await act(async () => {
      refreshButton.click();
    });

    await waitFor(() => {
      expect(mockUpdateWeather).toHaveBeenCalledWith('London');
      expect(mockUpdateForecast).toHaveBeenCalledWith('London');
    });
  });
});
