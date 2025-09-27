import React from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import styles from './WeatherDetailsHeader.module.scss';

interface WeatherDetailsHeaderProps {
  cityName: string;
  onBack: () => void;
  onUpdate: () => void;
  loading?: boolean;
}

export function WeatherDetailsHeader({
  cityName,
  onBack,
  onUpdate,
  loading = false,
}: WeatherDetailsHeaderProps) {
  return (
    <div className={styles.header}>
      <button className={styles.backButton} onClick={onBack}>
        <ArrowLeft size={20} />
        Back
      </button>
      <h1 className={styles.title}>{cityName}</h1>
      <button
        className={styles.refreshButton}
        onClick={onUpdate}
        disabled={loading}
      >
        <RefreshCw size={20} className={loading ? styles.spinning : ''} />
        Refresh
      </button>
    </div>
  );
}

