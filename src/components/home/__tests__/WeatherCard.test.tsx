import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { WeatherCard } from '../WeatherCard/WeatherCard';
import { City, WeatherData } from '@/types/weather';

jest.mock('@/services/weatherApi', () => ({
  getWeatherIconUrl: jest.fn((icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`),
}));

const mockCity: City = {
  id: 1,
  name: 'London',
  country: 'GB',
  coord: {
    lat: 51.5074,
    lon: -0.1278,
  },
};

const mockWeather: WeatherData = {
  id: 1,
  name: 'London',
  country: 'GB',
  coord: {
    lat: 51.5074,
    lon: -0.1278,
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
  ],
  main: {
    temp: 20,
    feels_like: 22,
    temp_min: 18,
    temp_max: 25,
    pressure: 1013,
    humidity: 65,
  },
  wind: {
    speed: 3.5,
    deg: 180,
  },
  visibility: 10000,
  clouds: {
    all: 0,
  },
  dt: 1640995200,
  sys: {
    sunrise: 1640952000,
    sunset: 1640991600,
  },
};

const mockProps = {
  city: mockCity,
  weather: mockWeather,
  onRemove: jest.fn(),
  onUpdate: jest.fn(),
  onViewDetails: jest.fn(),
  loading: false,
};

describe('WeatherCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders city information correctly', () => {
    render(<WeatherCard {...mockProps} />);
    
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('GB')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
    expect(screen.getByText('clear sky')).toBeInTheDocument();
  });

  it('renders weather details', () => {
    render(<WeatherCard {...mockProps} />);
    
    expect(screen.getByText('22°C')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('13 km/h')).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', () => {
    render(<WeatherCard {...mockProps} />);
    
    const removeButton = screen.getByLabelText('Remove London from weather list');
    fireEvent.click(removeButton);
    
    expect(mockProps.onRemove).toHaveBeenCalledWith();
  });

  it('calls onUpdate when update button is clicked', () => {
    render(<WeatherCard {...mockProps} />);
    
    const updateButton = screen.getByRole('button', { name: /update weather data/i });
    fireEvent.click(updateButton);
    
    expect(mockProps.onUpdate).toHaveBeenCalledWith();
  });

  it('calls onViewDetails when details button is clicked', () => {
    render(<WeatherCard {...mockProps} />);
    
    const detailsButton = screen.getByRole('button', { name: /view detailed weather information/i });
    fireEvent.click(detailsButton);
    
    expect(mockProps.onViewDetails).toHaveBeenCalledWith();
  });

  it('shows loading state when loading is true', () => {
    render(<WeatherCard {...mockProps} loading={true} />);
    
    const updateButton = screen.getByRole('button', { name: /updating weather data/i });
    expect(updateButton).toBeInTheDocument();
    expect(updateButton).toBeDisabled();
  });

  it('disables update button when loading', () => {
    render(<WeatherCard {...mockProps} loading={true} />);
    
    const updateButton = screen.getByRole('button', { name: /updating weather data/i });
    expect(updateButton).toBeDisabled();
  });
});
