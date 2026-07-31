import styles from './Tabs.module.css';

export function Tabs({ items = [], activeId, onChange, className = '' }) {
  return (
    <div className={`${styles.tabs} ${className}`.trim()} role="tablist">
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`${styles.tab} ${isActive ? styles.active : ''}`.trim()}
            onClick={() => onChange?.(item.id)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
