import { assetPath } from '../../lib/assetPath.js';
import styles from './Icon.module.css';

const SIZES = {
  sm: 14,
  md: 20,
  lg: 60,
};

export function Icon({ name, size = 'md', className = '', alt = '' }) {
  const dimension = typeof size === 'number' ? size : SIZES[size] ?? SIZES.md;

  return (
    <span
      className={`${styles.icon} ${className}`.trim()}
      style={{ width: dimension, height: dimension }}
    >
      <img
        src={assetPath(`/assets/icons/${name}.svg`)}
        alt={alt}
        width={dimension}
        height={dimension}
        className={styles.image}
      />
    </span>
  );
}
