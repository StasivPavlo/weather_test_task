'use client';

import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useWeatherStore } from '@/store/weatherStore';
import { Button } from '@/components/ui';
import styles from './AddCityForm.module.scss';

export function AddCityForm() {
  const { loading, error, addCity, clearError } = useWeatherStore();
  const [cityName, setCityName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cityName.trim()) {
      clearError();
      await addCity(cityName.trim());
      setCityName('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  return (
    <div className={styles.addCityForm}>
      <form onSubmit={handleSubmit} className={styles.form} role="search" aria-label="Add city to weather list">
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <Search className={styles.searchIcon} size={20} aria-hidden="true" />
            <input
              type="text"
              value={cityName}
              onChange={handleInputChange}
              placeholder="Enter city name..."
              className={styles.input}
              disabled={loading}
              aria-label="City name"
              aria-describedby={error ? "error-message" : undefined}
              aria-invalid={!!error}
              autoComplete="off"
              autoCapitalize="words"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="medium"
            loading={loading}
            disabled={!cityName.trim()}
            aria-label={loading ? "Adding city..." : "Add city to weather list"}
            aria-describedby={error ? "error-message" : undefined}
          >
            <Plus size={20} aria-hidden="true" />
            {loading ? 'Adding...' : 'Add City'}
          </Button>
        </div>
        {error && (
          <div 
            id="error-message"
            className={styles.errorMessage}
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
