import React from 'react';
import { render, screen } from '@testing-library/react';
import { WeatherIcon } from '../WeatherIcon/WeatherIcon';

jest.mock('@/services/weatherApi', () => ({
  getWeatherIconUrl: jest.fn((icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`),
}));

describe('WeatherIcon', () => {
  const mockProps = {
    iconCode: '01d',
    description: 'clear sky',
  };

  it('should render weather icon correctly', () => {
    render(<WeatherIcon {...mockProps} />);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'clear sky');
    expect(img.getAttribute('src')).toContain('openweathermap.org/img/wn/01d@2x.png');
  });

  it('should render with custom size', () => {
    render(
      <WeatherIcon
        {...mockProps}
        size={100}
      />
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('width', '100');
    expect(img).toHaveAttribute('height', '100');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <WeatherIcon
        {...mockProps}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render with default size when not provided', () => {
    render(<WeatherIcon {...mockProps} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('width', '64');
    expect(img).toHaveAttribute('height', '64');
  });
});
