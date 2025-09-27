import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { WeatherHeader } from '../WeatherHeader/WeatherHeader';

jest.mock('@/store/weatherStore', () => ({
  useWeatherStore: jest.fn(),
}));

import { useWeatherStore } from '@/store/weatherStore';

const mockUseWeatherStore = useWeatherStore as jest.MockedFunction<typeof useWeatherStore>;

describe('WeatherHeader', () => {
  const mockRefreshAllWeather = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseWeatherStore.mockReturnValue({
      cities: [
        { id: 1, name: 'London', country: 'GB', coord: { lat: 51.5074, lon: -0.1278 } },
        { id: 2, name: 'Paris', country: 'FR', coord: { lat: 48.8566, lon: 2.3522 } },
        { id: 3, name: 'Berlin', country: 'DE', coord: { lat: 52.5200, lon: 13.4050 } },
      ],
      loading: false,
      refreshAllWeather: mockRefreshAllWeather,
    } as unknown as ReturnType<typeof useWeatherStore>);
  });

  it('should render title and refresh button when cities exist', () => {
    render(<WeatherHeader />);

    expect(screen.getByText('Weather App')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /refresh all/i })).toBeInTheDocument();
  });

  it('should not render refresh button when no cities', () => {
    mockUseWeatherStore.mockReturnValue({
      cities: [],
      loading: false,
      refreshAllWeather: mockRefreshAllWeather,
    } as unknown as ReturnType<typeof useWeatherStore>);

    render(<WeatherHeader />);

    expect(screen.getByText('Weather App')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /refresh all/i })).not.toBeInTheDocument();
  });

  it('should call refreshAllWeather when refresh button is clicked', () => {
    render(<WeatherHeader />);

    const refreshButton = screen.getByRole('button', { name: /refresh all/i });
    fireEvent.click(refreshButton);

    expect(mockRefreshAllWeather).toHaveBeenCalledTimes(1);
  });

  it('should disable refresh button when loading', () => {
    mockUseWeatherStore.mockReturnValue({
      cities: [
        { id: 1, name: 'London', country: 'GB', coord: { lat: 51.5074, lon: -0.1278 } },
      ],
      loading: true,
      refreshAllWeather: mockRefreshAllWeather,
    } as unknown as ReturnType<typeof useWeatherStore>);

    render(<WeatherHeader />);

    const refreshButton = screen.getByRole('button', { name: /refresh all/i });
    expect(refreshButton).toBeDisabled();
  });

  it('should show spinning icon when loading', () => {
    mockUseWeatherStore.mockReturnValue({
      cities: [
        { id: 1, name: 'London', country: 'GB', coord: { lat: 51.5074, lon: -0.1278 } },
      ],
      loading: true,
      refreshAllWeather: mockRefreshAllWeather,
    } as unknown as ReturnType<typeof useWeatherStore>);

    render(<WeatherHeader />);

    const refreshButton = screen.getByRole('button', { name: /refresh all/i });
    const icon = refreshButton.querySelector('svg');
    expect(icon).toHaveClass('spinning');
  });
});
