import { Icon } from '../Icon/Icon.jsx';
import styles from './TextButton.module.css';

export function TextButton({
  icon,
  children,
  onClick,
  className = '',
  type = 'button',
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`.trim()}
      onClick={onClick}
    >
      {icon ? <Icon name={icon} size="md" alt="" /> : null}
      <span>{children}</span>
    </button>
  );
}
