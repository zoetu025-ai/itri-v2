import { Icon } from '../Icon/Icon.jsx';
import styles from './IconButton.module.css';

export function IconButton({
  icon,
  iconSize = 'md',
  label,
  onClick,
  className = '',
  type = 'button',
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`.trim()}
      onClick={onClick}
      aria-label={label}
    >
      <Icon name={icon} size={iconSize} alt="" />
    </button>
  );
}
