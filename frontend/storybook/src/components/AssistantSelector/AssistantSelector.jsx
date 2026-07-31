import { Icon } from '../Icon/Icon.jsx';
import styles from './AssistantSelector.module.css';

export function AssistantSelector({
  label = '🤖 Retrieval assistant',
  onClick,
  className = '',
}) {
  return (
    <button
      type="button"
      className={`${styles.selector} ${className}`.trim()}
      onClick={onClick}
      aria-haspopup="listbox"
    >
      <Icon name="avatar" size="md" alt="" />
      <span className={styles.label}>{label}</span>
      <Icon name="chevron-down" size="sm" alt="" />
    </button>
  );
}
