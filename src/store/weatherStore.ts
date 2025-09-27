import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WeatherData, WeatherForecast, City, WeatherState } from '@/types/weather';
import { weatherApi } from '@/services/weatherApi';
import { ERROR_MESSAGES } from '@/constants/weather';

interface WeatherStore extends WeatherState {
  addCity: (cityName: string) => Promise<void>;
  removeCity: (cityName: string) => void;
  updateWeather: (cityName: string) => Promise<void>;
  updateForecast: (cityName: string) => Promise<void>;
  refreshAllWeather: () => Promise<void>;
  setWeatherData: (cityName: string, weather: WeatherData) => void;
  setForecastData: (cityName: string, forecast: WeatherForecast) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set, get) => {
      const handleError = (error: unknown, defaultMessage: string) => {
        set({
          loading: false,
          error: error instanceof Error ? error.message : defaultMessage,
        });
      };

      return {
        cities: [],
        weatherData: {},
        forecastData: {},
        loading: false,
        error: null,

        addCity: async (cityName: string) => {
          set({ loading: true, error: null });
          
          try {
            const weatherData = await weatherApi.getCurrentWeather(cityName);
            const city: City = {
              id: weatherData.id,
              name: weatherData.name,
              country: weatherData.country,
              coord: weatherData.coord,
            };

            set((state) => {
              const existingCity = state.cities.find(c => c.name === city.name);
              if (existingCity) {
                return {
                  ...state,
                  loading: false,
                  error: ERROR_MESSAGES.CITY_ALREADY_EXISTS,
                };
              }

              return {
                cities: [...state.cities, city],
                weatherData: {
                  ...state.weatherData,
                  [city.name]: weatherData,
                },
                loading: false,
                error: null,
              };
            });
          } catch (error) {
            handleError(error, ERROR_MESSAGES.FAILED_TO_ADD_CITY);
          }
        },

      removeCity: (cityName: string) => {
        set((state) => {
          const newWeatherData = { ...state.weatherData };
          const newForecastData = { ...state.forecastData };
          delete newWeatherData[cityName];
          delete newForecastData[cityName];

          return {
            cities: state.cities.filter(city => city.name !== cityName),
            weatherData: newWeatherData,
            forecastData: newForecastData,
          };
        });
      },

        updateWeather: async (cityName: string) => {
          set({ loading: true, error: null });
          
          try {
            const weatherData = await weatherApi.getCurrentWeather(cityName);

            set((state) => ({
              weatherData: {
                ...state.weatherData,
                [cityName]: weatherData,
              },
              loading: false,
              error: null,
            }));
          } catch (error) {
            handleError(error, ERROR_MESSAGES.FAILED_TO_UPDATE_WEATHER);
          }
        },

        updateForecast: async (cityName: string) => {
          set({ loading: true, error: null });
          
          try {
            const forecastData = await weatherApi.getWeatherForecast(cityName);

            set((state) => ({
              forecastData: {
                ...state.forecastData,
                [cityName]: forecastData,
              },
              loading: false,
              error: null,
            }));
          } catch (error) {
            handleError(error, ERROR_MESSAGES.FAILED_TO_UPDATE_FORECAST);
          }
        },

        refreshAllWeather: async () => {
          set({ loading: true, error: null });
          
          try {
            const { cities } = get();
            const promises = cities.map(city => 
              weatherApi.getCurrentWeather(city.name)
            );

            const weatherDataArray = await Promise.all(promises);
            const newWeatherData: Record<string, WeatherData> = {};

            weatherDataArray.forEach(weatherData => {
              newWeatherData[weatherData.name] = weatherData;
            });

            set({
              weatherData: newWeatherData,
              loading: false,
              error: null,
            });
          } catch (error) {
            handleError(error, ERROR_MESSAGES.FAILED_TO_REFRESH_WEATHER);
          }
        },

        setWeatherData: (cityName: string, weather: WeatherData) => {
          set((state) => ({
            weatherData: {
              ...state.weatherData,
              [cityName]: weather,
            },
          }));
        },

        setForecastData: (cityName: string, forecast: WeatherForecast) => {
          set((state) => ({
            forecastData: {
              ...state.forecastData,
              [cityName]: forecast,
            },
          }));
        },

        setLoading: (loading: boolean) => set({ loading }),
        setError: (error: string | null) => set({ error }),
        clearError: () => set({ error: null }),
      };
    },
    {
      name: 'weather-storage',
      partialize: (state: WeatherStore) => ({
        cities: state.cities,
        weatherData: state.weatherData,
        forecastData: state.forecastData,
      }),
    }
  )
);
