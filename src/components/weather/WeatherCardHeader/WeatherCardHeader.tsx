import React from 'react';
import { Trash2 } from 'lucide-react';
import styles from './WeatherCardHeader.module.scss';

interface WeatherCardHeaderProps {
  cityName: string;
  country: string;
  onRemove: () => void;
}

export function WeatherCardHeader({
  cityName,
  country,
  onRemove,
}: WeatherCardHeaderProps) {
  return (
    <div className={styles.cardHeader}>
      <div className={styles.cityInfo}>
        <h3 className={styles.cityName}>{cityName}</h3>
        <span className={styles.country}>{country}</span>
      </div>
      <button
        className={styles.removeButton}
        onClick={onRemove}
        aria-label={`Remove ${cityName} from weather list`}
        title={`Remove ${cityName} from weather list`}
      >
        <Trash2 size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

