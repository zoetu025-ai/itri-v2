import styles from './ChatHistory.module.css';

export function ChatHistory({ items = [], activeId, onSelect, className = '' }) {
  return (
    <nav className={`${styles.history} ${className}`.trim()} aria-label="Chat history">
      <ul className={styles.list}>
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id} className={styles.listItem}>
              <button
                type="button"
                className={`${styles.item} ${isActive ? styles.active : ''}`.trim()}
                onClick={() => onSelect?.(item.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={styles.text}>{item.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
