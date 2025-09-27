import React from 'react';
import { render, screen } from '@testing-library/react';
import { TemperatureDisplay } from '../TemperatureDisplay/TemperatureDisplay';

describe('TemperatureDisplay', () => {
  it('should render temperature correctly', () => {
    render(<TemperatureDisplay temperature={25} />);

    expect(screen.getByText('25°C')).toBeInTheDocument();
  });

  it('should render negative temperature correctly', () => {
    render(<TemperatureDisplay temperature={-5} />);

    expect(screen.getByText('-5°C')).toBeInTheDocument();
  });

  it('should render zero temperature correctly', () => {
    render(<TemperatureDisplay temperature={0} />);

    expect(screen.getByText('0°C')).toBeInTheDocument();
  });

  it('should render decimal temperature correctly', () => {
    render(<TemperatureDisplay temperature={25.7} />);

    expect(screen.getByText('26°C')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <TemperatureDisplay temperature={25} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
