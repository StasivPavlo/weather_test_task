import { renderHook, act } from '@testing-library/react';
import { useWeatherStore } from '../weatherStore';

jest.mock('@/services/weatherApi', () => ({
  weatherApi: {
    getCurrentWeather: jest.fn(),
    getCurrentWeatherByCoords: jest.fn(),
  },
}));

import { weatherApi } from '@/services/weatherApi';

const mockWeatherData = {
  id: 1,
  name: 'London',
  country: 'GB',
  coord: { lat: 51.5074, lon: -0.1278 },
  main: {
    temp: 15,
    feels_like: 13,
    temp_min: 10,
    temp_max: 20,
    humidity: 80,
    pressure: 1013,
  },
  weather: [{ id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04d' }],
  wind: { speed: 3.5, deg: 200 },
  visibility: 10000,
  clouds: { all: 90 },
  dt: 1640995200,
  sys: { sunrise: 1640952000, sunset: 1640991600 },
};

const mockForecastData = {
  list: [
    {
      dt: 1640995200,
      main: { temp: 15, feels_like: 13, temp_min: 10, temp_max: 20, pressure: 1013, humidity: 80 },
      weather: [{ id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04d' }],
      wind: { speed: 3.5, deg: 200 },
      visibility: 10000,
      clouds: { all: 90 },
      dt_txt: '2022-01-01 12:00:00',
    },
    {
      dt: 1641000000,
      main: { temp: 18, feels_like: 16, temp_min: 15, temp_max: 22, pressure: 1015, humidity: 70 },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
      wind: { speed: 2.5, deg: 180 },
      visibility: 15000,
      clouds: { all: 10 },
      dt_txt: '2022-01-01 14:00:00',
    },
  ],
  city: {
    id: 1,
    name: 'London',
    country: 'GB',
    coord: { lat: 51.5074, lon: -0.1278 },
    sunrise: 1640952000,
    sunset: 1640991600,
  },
};

describe('weatherStore', () => {
  beforeEach(() => {
    useWeatherStore.getState().clearError();
    useWeatherStore.setState({
      cities: [],
      weatherData: {},
      loading: false,
      error: null,
    });
  });

  describe('addCity', () => {
    it('should add a new city successfully', async () => {
      (weatherApi.getCurrentWeather as jest.Mock).mockResolvedValue(mockWeatherData);

      const { result } = renderHook(() => useWeatherStore());

      await act(async () => {
        await result.current.addCity('London');
      });

      expect(result.current.cities).toHaveLength(1);
      expect(result.current.cities[0].name).toBe('London');
      expect(result.current.weatherData['London']).toMatchObject(mockWeatherData);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should handle duplicate city', async () => {
      (weatherApi.getCurrentWeather as jest.Mock).mockResolvedValue(mockWeatherData);

      const { result } = renderHook(() => useWeatherStore());

      await act(async () => {
        await result.current.addCity('London');
      });

      await act(async () => {
        await result.current.addCity('London');
      });

      expect(result.current.cities).toHaveLength(1);
      expect(result.current.error).toBe('City already exists');
    });

    it('should handle API error', async () => {
      (weatherApi.getCurrentWeather as jest.Mock).mockRejectedValue(new Error('City not found'));

      const { result } = renderHook(() => useWeatherStore());

      await act(async () => {
        await result.current.addCity('InvalidCity');
      });

      expect(result.current.cities).toHaveLength(0);
      expect(result.current.error).toBe('City not found');
      expect(result.current.loading).toBe(false);
    });
  });

  describe('removeCity', () => {
    it('should remove a city successfully', () => {
      const { result } = renderHook(() => useWeatherStore());

      act(() => {
        useWeatherStore.setState({
          cities: [{ id: 1, name: 'London', country: 'GB', coord: { lat: 51.5074, lon: -0.1278 } }],
          weatherData: { 'London': mockWeatherData },
        });
      });

      act(() => {
        result.current.removeCity('London');
      });

      expect(result.current.cities).toHaveLength(0);
      expect(result.current.weatherData['London']).toBeUndefined();
    });
  });

  describe('updateWeather', () => {
    it('should update weather data for existing city', async () => {
      const updatedWeatherData = { ...mockWeatherData, main: { ...mockWeatherData.main, temp: 20 } };
      (weatherApi.getCurrentWeather as jest.Mock).mockResolvedValue(updatedWeatherData);

      const { result } = renderHook(() => useWeatherStore());

      act(() => {
        useWeatherStore.setState({
          cities: [{ id: 1, name: 'London', country: 'GB', coord: { lat: 51.5074, lon: -0.1278 } }],
          weatherData: { 'London': mockWeatherData },
        });
      });

      await act(async () => {
        await result.current.updateWeather('London');
      });

      expect(result.current.weatherData['London'].main.temp).toBe(20);
      expect(result.current.loading).toBe(false);
    });
  });

  describe('clearError', () => {
    it('should clear error state', () => {
      const { result } = renderHook(() => useWeatherStore());

      act(() => {
        useWeatherStore.setState({ error: 'Some error' });
      });

      expect(result.current.error).toBe('Some error');

      act(() => {
        result.current.clearError();
      });

      expect(result.current.error).toBeNull();
    });
  });

  describe('setWeatherData', () => {
    it('should set weather data for a city', () => {
      const { result } = renderHook(() => useWeatherStore());

      act(() => {
        result.current.setWeatherData('London', mockWeatherData);
      });

      expect(result.current.weatherData['London']).toEqual(mockWeatherData);
    });

    it('should update existing weather data for a city', () => {
      const { result } = renderHook(() => useWeatherStore());

      act(() => {
        result.current.setWeatherData('London', mockWeatherData);
      });

      expect(result.current.weatherData['London']).toEqual(mockWeatherData);

      const updatedWeatherData = { ...mockWeatherData, main: { ...mockWeatherData.main, temp: 25 } };
      act(() => {
        result.current.setWeatherData('London', updatedWeatherData);
      });

      expect(result.current.weatherData['London']).toEqual(updatedWeatherData);
      expect(result.current.weatherData['London'].main.temp).toBe(25);
    });
  });

  describe('setForecastData', () => {
    it('should set forecast data for a city', () => {
      const { result } = renderHook(() => useWeatherStore());

      act(() => {
        result.current.setForecastData('London', mockForecastData);
      });

      expect(result.current.forecastData['London']).toEqual(mockForecastData);
    });

    it('should update existing forecast data for a city', () => {
      const { result } = renderHook(() => useWeatherStore());

      act(() => {
        result.current.setForecastData('London', mockForecastData);
      });

      expect(result.current.forecastData['London']).toEqual(mockForecastData);
      expect(result.current.forecastData['London'].list).toHaveLength(2);

      const newForecastItem = {
        dt: 1641004800,
        main: { temp: 22, feels_like: 20, temp_min: 18, temp_max: 25, pressure: 1020, humidity: 60 },
        weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }],
        wind: { speed: 4.0, deg: 150 },
        visibility: 12000,
        clouds: { all: 20 },
        dt_txt: '2022-01-01 16:00:00',
      };

      const updatedForecastData = { ...mockForecastData, list: [...mockForecastData.list, newForecastItem] };
      act(() => {
        result.current.setForecastData('London', updatedForecastData);
      });

      expect(result.current.forecastData['London']).toEqual(updatedForecastData);
      expect(result.current.forecastData['London'].list).toHaveLength(3);
      expect(result.current.forecastData['London'].list[2].main.temp).toBe(22);
    });
  });
});
