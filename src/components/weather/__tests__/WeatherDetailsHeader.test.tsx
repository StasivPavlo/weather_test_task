import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { WeatherDetailsHeader } from '../WeatherDetailsHeader/WeatherDetailsHeader';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

describe('WeatherDetailsHeader', () => {
  const mockProps = {
    cityName: 'London',
    onBack: jest.fn(),
    onUpdate: jest.fn(),
    loading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render city name and buttons', () => {
    render(<WeatherDetailsHeader {...mockProps} />);

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument();
  });

  it('should call onBack when back button is clicked', () => {
    render(<WeatherDetailsHeader {...mockProps} />);

    const backButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButton);

    expect(mockProps.onBack).toHaveBeenCalledTimes(1);
  });

  it('should call onUpdate when refresh button is clicked', () => {
    render(<WeatherDetailsHeader {...mockProps} />);

    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);

    expect(mockProps.onUpdate).toHaveBeenCalledTimes(1);
  });

  it('should disable refresh button when loading', () => {
    render(
      <WeatherDetailsHeader
        {...mockProps}
        loading={true}
      />
    );

    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    expect(refreshButton).toBeDisabled();
  });

  it('should show loading state on refresh button when loading', () => {
    render(
      <WeatherDetailsHeader
        {...mockProps}
        loading={true}
      />
    );

    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    const icon = refreshButton.querySelector('svg');
    expect(icon).toHaveClass('spinning');
  });

  it('should not disable back button when loading', () => {
    render(
      <WeatherDetailsHeader
        {...mockProps}
        loading={true}
      />
    );

    const backButton = screen.getByRole('button', { name: /back/i });
    expect(backButton).not.toBeDisabled();
  });
});
