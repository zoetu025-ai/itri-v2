import styles from './NewChatConfirmDialog.module.css';

export function NewChatConfirmDialog({
  open = true,
  title = 'Start new chat and clear history?',
  description = 'All current message data will be lost.',
  onStart,
  onCancel,
  className = '',
}) {
  if (!open) return null;

  return (
    <div
      className={`${styles.overlay} ${className}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-chat-confirm-title"
      aria-describedby="new-chat-confirm-desc"
    >
      <div className={styles.dialog}>
        <div className={styles.body}>
          <p id="new-chat-confirm-title" className={styles.title}>
            {title}
          </p>
          <p id="new-chat-confirm-desc" className={styles.description}>
            {description}
          </p>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.startBtn} onClick={onStart}>
            Start
          </button>
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
