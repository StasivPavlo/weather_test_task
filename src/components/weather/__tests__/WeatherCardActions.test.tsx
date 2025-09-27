import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { WeatherCardActions } from '../WeatherCardActions/WeatherCardActions';

describe('WeatherCardActions', () => {
  const mockProps = {
    onUpdate: jest.fn(),
    onViewDetails: jest.fn(),
    loading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render both buttons', () => {
    render(<WeatherCardActions {...mockProps} />);

    expect(screen.getByRole('button', { name: /update weather data/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view detailed weather information/i })).toBeInTheDocument();
  });

  it('should call onUpdate when refresh button is clicked', () => {
    render(<WeatherCardActions {...mockProps} />);

    const refreshButton = screen.getByRole('button', { name: /update weather data/i });
    fireEvent.click(refreshButton);

    expect(mockProps.onUpdate).toHaveBeenCalledTimes(1);
  });

  it('should call onViewDetails when view details button is clicked', () => {
    render(<WeatherCardActions {...mockProps} />);

    const viewDetailsButton = screen.getByRole('button', { name: /view detailed weather information/i });
    fireEvent.click(viewDetailsButton);

    expect(mockProps.onViewDetails).toHaveBeenCalledTimes(1);
  });

  it('should disable refresh button when loading', () => {
    render(
      <WeatherCardActions
        {...mockProps}
        loading={true}
      />
    );

    const refreshButton = screen.getByRole('button', { name: /updating weather data/i });
    expect(refreshButton).toBeDisabled();
  });

  it('should show loading state on refresh button when loading', () => {
    render(
      <WeatherCardActions
        {...mockProps}
        loading={true}
      />
    );

    const refreshButton = screen.getByRole('button', { name: /updating weather data/i });
    const icon = refreshButton.querySelector('svg');
    expect(icon).toHaveClass('spinning');
  });

  it('should not disable view details button when loading', () => {
    render(
      <WeatherCardActions
        {...mockProps}
        loading={true}
      />
    );

    const viewDetailsButton = screen.getByRole('button', { name: /view detailed weather information/i });
    expect(viewDetailsButton).not.toBeDisabled();
  });
});
