import React from 'react';
import { RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import styles from './WeatherCardActions.module.scss';

interface WeatherCardActionsProps {
  onUpdate: () => void;
  onViewDetails: () => void;
  loading?: boolean;
}

export function WeatherCardActions({
  onUpdate,
  onViewDetails,
  loading = false,
}: WeatherCardActionsProps) {
  return (
    <div className={styles.cardActions} role="group" aria-label="Weather card actions">
      <Button
        variant="primary"
        size="medium"
        onClick={onUpdate}
        loading={loading}
        aria-label={loading ? "Updating weather data..." : "Update weather data"}
        aria-describedby={loading ? "loading-status" : undefined}
      >
        <RefreshCw 
          size={16} 
          className={loading ? styles.spinning : ''} 
          aria-hidden="true"
        />
        {loading ? 'Updating...' : 'Update'}
        {loading && <span id="loading-status" className="sr-only">Weather data is being updated</span>}
      </Button>
      
      <Button
        variant="outline"
        size="medium"
        onClick={onViewDetails}
        aria-label="View detailed weather information"
      >
        <span>Details</span>
        <ArrowRight size={16} aria-hidden="true" />
      </Button>
    </div>
  );
}

