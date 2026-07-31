import { Icon } from '../Icon/Icon.jsx';
import styles from './Badge.module.css';

export function Badge({
  label = 'all.json',
  icon = 'file',
  variant = 'neutral',
  onClick,
  className = '',
}) {
  const classes = [
    styles.badge,
    variant === 'action' ? styles.action : styles.neutral,
    onClick ? styles.clickable : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <Icon name={icon} size={16} alt="" />
      <span className={styles.label}>{label}</span>
    </>
  );

  if (onClick) {
    return (
      <button type="button" className={classes} onClick={onClick}>
        {content}
      </button>
    );
  }

  return <span className={classes}>{content}</span>;
}
