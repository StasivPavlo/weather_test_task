import React from 'react';
import { render, screen } from '@testing-library/react';
import { DetailCard } from '../DetailCard/DetailCard';
import { Cloud } from 'lucide-react';

describe('DetailCard', () => {
  const mockProps = {
    icon: Cloud,
    label: 'Humidity',
    value: '80%',
  };

  it('should render correctly', () => {
    render(<DetailCard {...mockProps} />);

    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    const { container } = render(
      <DetailCard {...mockProps} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render icon correctly', () => {
    render(<DetailCard {...mockProps} />);

    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});
