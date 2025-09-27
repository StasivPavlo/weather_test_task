import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmptyState } from '../EmptyState/EmptyState';

describe('EmptyState', () => {
  it('should render correctly', () => {
    render(<EmptyState />);

    expect(screen.getByText('No cities added yet')).toBeInTheDocument();
    expect(screen.getByText('Add a city above to start tracking the weather')).toBeInTheDocument();
  });

  it('should render cloud icon', () => {
    render(<EmptyState />);

    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});
