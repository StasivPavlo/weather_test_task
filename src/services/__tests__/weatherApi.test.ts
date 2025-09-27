import {
  getCurrentWeather,
  getCurrentWeatherByCoords,
  getWeatherForecastByCoords,
  getWeatherIconUrl,
} from '../weatherApi';

global.fetch = jest.fn();

const mockWeatherResponse = {
  id: 1,
  name: 'London',
  coord: { lat: 51.5074, lon: -0.1278 },
  main: {
    temp: 15,
    feels_like: 13,
    humidity: 80,
    pressure: 1013,
  },
  weather: [{ main: 'Clouds', description: 'overcast clouds', icon: '04d' }],
  wind: { speed: 3.5, deg: 200 },
  visibility: 10000,
  dt: 1640995200,
};

const mockForecastResponse = {
  list: [
    {
      dt: 1640995200,
      main: { temp: 15, feels_like: 13 },
      weather: [{ main: 'Clouds', description: 'overcast clouds', icon: '04d' }],
    },
    {
      dt: 1641000000,
      main: { temp: 18, feels_like: 16 },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    },
  ],
};

describe('weatherApi', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('getCurrentWeather', () => {
    it('should fetch weather data by city name', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockWeatherResponse,
      });

      const result = await getCurrentWeather('London');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('q=London'),
        expect.objectContaining({
          headers: { 'Accept': 'application/json' }
        })
      );
      expect(result).toEqual(mockWeatherResponse);
    });

    it('should throw error for invalid city', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
        text: jest.fn().mockResolvedValue('City not found'),
      };
      
      (fetch as jest.Mock).mockResolvedValue(mockResponse);

      await expect(getCurrentWeather('InvalidCity')).rejects.toThrow('City not found. Please check the city name and try again.');
    });
  });

  describe('getCurrentWeatherByCoords', () => {
    it('should fetch weather data by coordinates', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockWeatherResponse,
      });

      const result = await getCurrentWeatherByCoords(51.5074, -0.1278);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('lat=51.5074&lon=-0.1278'),
        expect.objectContaining({
          headers: { 'Accept': 'application/json' }
        })
      );
      expect(result).toEqual(mockWeatherResponse);
    });
  });

  describe('getWeatherForecastByCoords', () => {
    it('should fetch weather forecast by coordinates', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockForecastResponse,
      });

      const result = await getWeatherForecastByCoords(51.5074, -0.1278);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('lat=51.5074&lon=-0.1278'),
        expect.objectContaining({
          headers: { 'Accept': 'application/json' }
        })
      );
      expect(result).toEqual(mockForecastResponse);
    });
  });

  describe('getWeatherIconUrl', () => {
    it('should return correct icon URL', () => {
      const iconUrl = getWeatherIconUrl('04d');
      expect(iconUrl).toBe('https://openweathermap.org/img/wn/04d@2x.png');
    });
  });
});
