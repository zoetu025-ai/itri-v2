import { Icon } from '../Icon/Icon.jsx';
import styles from './IconButton.module.css';

export function IconButton({
  icon,
  iconSize = 'md',
  label,
  onClick,
  className = '',
  type = 'button',
  ...rest
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`.trim()}
      onClick={onClick}
      aria-label={label}
      {...rest}
    >
      <Icon name={icon} size={iconSize} alt="" />
    </button>
  );
}
