import React from 'react';
import { LucideIcon } from 'lucide-react';
import styles from './DetailCard.module.scss';

interface DetailCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
}

export function DetailCard({
  icon: Icon,
  label,
  value,
  className = '',
}: DetailCardProps) {
  return (
    <div className={`${styles.detailCard} ${className}`}>
      <Icon className={styles.detailIcon} />
      <div className={styles.detailContent}>
        <span className={styles.detailLabel}>{label}</span>
        <span className={styles.detailValue}>{value}</span>
      </div>
    </div>
  );
}

