import Link from 'next/link';
import { Home, Cloud } from 'lucide-react';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Cloud className={styles.icon} size={64} />
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>
        <p className={styles.description}>
          The weather page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className={styles.homeButton}>
          <Home size={20} />
          Go Home
        </Link>
      </div>
    </div>
  );
}
