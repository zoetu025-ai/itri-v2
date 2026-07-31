import { assetPath } from '../../lib/assetPath.js';
import styles from './Logo.module.css';

export function Logo({ className = '', size = 150, onClick }) {
  const content = (
    <div
      className={`${styles.logo} ${className}`.trim()}
      style={{ width: size, height: size }}
    >
      <img
        src={assetPath('/assets/icons/logo.svg')}
        alt="iCourt"
        width={size}
        height={size}
        className={styles.image}
      />
    </div>
  );

  if (!onClick) return content;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Go to home"
      style={{ padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
    >
      {content}
    </button>
  );
}
