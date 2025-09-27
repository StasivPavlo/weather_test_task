import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddCityForm } from '../AddCityForm/AddCityForm';

jest.mock('@/store/weatherStore', () => ({
  useWeatherStore: jest.fn(),
}));

import { useWeatherStore } from '@/store/weatherStore';

const mockUseWeatherStore = useWeatherStore as jest.MockedFunction<typeof useWeatherStore>;

describe('AddCityForm', () => {
  const mockAddCity = jest.fn();
  const mockClearError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseWeatherStore.mockReturnValue({
      loading: false,
      error: null,
      addCity: mockAddCity,
      clearError: mockClearError,
    } as unknown as ReturnType<typeof useWeatherStore>);
  });

  it('renders form elements correctly', () => {
    render(<AddCityForm />);
    
    expect(screen.getByPlaceholderText('Enter city name...')).toBeInTheDocument();
    expect(screen.getByText('Add City')).toBeInTheDocument();
  });

  it('calls addCity when form is submitted with valid input', async () => {
    render(<AddCityForm />);
    
    const input = screen.getByPlaceholderText('Enter city name...');
    const submitButton = screen.getByText('Add City');
    
    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockAddCity).toHaveBeenCalledWith('London');
    });
  });

  it('does not call addCity when form is submitted with empty input', () => {
    render(<AddCityForm />);
    
    const submitButton = screen.getByText('Add City');
    fireEvent.click(submitButton);
    
    expect(mockAddCity).not.toHaveBeenCalled();
  });

  it('trims whitespace from input before submitting', async () => {
    render(<AddCityForm />);
    
    const input = screen.getByPlaceholderText('Enter city name...');
    const submitButton = screen.getByText('Add City');
    
    fireEvent.change(input, { target: { value: '  London  ' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockAddCity).toHaveBeenCalledWith('London');
    });
  });

  it('clears input after successful submission', async () => {
    mockAddCity.mockResolvedValue(undefined);
    render(<AddCityForm />);
    
    const input = screen.getByPlaceholderText('Enter city name...') as HTMLInputElement;
    const submitButton = screen.getByText('Add City');
    
    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });

  it('shows loading state when loading is true', () => {
    mockUseWeatherStore.mockReturnValue({
      loading: true,
      error: null,
      addCity: mockAddCity,
      clearError: mockClearError,
    } as unknown as ReturnType<typeof useWeatherStore>);

    render(<AddCityForm />);
    
    expect(screen.getByText('Adding...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter city name...')).toBeDisabled();
    expect(screen.getByText('Adding...')).toBeDisabled();
  });

  it('disables add button when input is empty', () => {
    render(<AddCityForm />);
    
    const submitButton = screen.getByText('Add City');
    expect(submitButton).toBeDisabled();
  });

  it('enables add button when input has value', () => {
    render(<AddCityForm />);
    
    const input = screen.getByPlaceholderText('Enter city name...');
    const submitButton = screen.getByText('Add City');
    
    fireEvent.change(input, { target: { value: 'London' } });
    
    expect(submitButton).not.toBeDisabled();
  });

  it('displays error message when error is provided', () => {
    const errorMessage = 'City not found';
    mockUseWeatherStore.mockReturnValue({
      loading: false,
      error: errorMessage,
      addCity: mockAddCity,
      clearError: mockClearError,
    } as unknown as ReturnType<typeof useWeatherStore>);

    render(<AddCityForm />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('does not display error message when error is null', () => {
    render(<AddCityForm />);
    
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });
});
