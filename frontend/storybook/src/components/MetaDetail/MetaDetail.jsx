import { Icon } from '../Icon/Icon.jsx';
import styles from './MetaDetail.module.css';

export function MetaDetail({ icon = 'token', children, className = '' }) {
  return (
    <div className={`${styles.detail} ${className}`.trim()}>
      <Icon name={icon} size="md" alt="" />
      <span className={styles.text}>{children}</span>
    </div>
  );
}
