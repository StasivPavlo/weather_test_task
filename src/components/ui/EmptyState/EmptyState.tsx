import React from 'react';
import { Cloud } from 'lucide-react';
import styles from './EmptyState.module.scss';

export function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <Cloud className={styles.emptyIcon} size={64} />
      <h2 className={styles.emptyTitle}>No cities added yet</h2>
      <p className={styles.emptyDescription}>
        Add a city above to start tracking the weather
      </p>
    </div>
  );
}

