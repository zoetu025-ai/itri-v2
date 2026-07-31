import { Icon } from '../Icon/Icon.jsx';
import styles from './ClearChatButton.module.css';

export function ClearChatButton({ onClick, className = '', label = 'New Chat' }) {
  return (
    <button
      type="button"
      className={`${styles.button} ${className}`.trim()}
      onClick={onClick}
    >
      <Icon name="chatbox" size="md" alt="" />
      <span>{label}</span>
    </button>
  );
}
