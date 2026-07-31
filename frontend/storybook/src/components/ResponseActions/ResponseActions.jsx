import { Icon } from '../Icon/Icon.jsx';
import styles from './ResponseActions.module.css';

export function ResponseActions({
  variant = 'full',
  page = 2,
  total = 3,
  onPrev,
  onNext,
  onThumbUp,
  onThumbDown,
  onTryAgain,
  onCopy,
  onDiagnosis,
  className = '',
}) {
  return (
    <div className={`${styles.actions} ${className}`.trim()}>
      <div className={styles.pagination}>
        <button type="button" className={styles.pageBtn} onClick={onPrev} aria-label="Previous">
          <Icon name="chevron-right" size="sm" alt="" className={styles.flip} />
        </button>
        <span>{page}</span>
        <span className={styles.sep} aria-hidden="true" />
        <span>{total}</span>
        <button type="button" className={styles.pageBtn} onClick={onNext} aria-label="Next">
          <Icon name="chevron-right" size="sm" alt="" />
        </button>
      </div>

      <button type="button" className={styles.iconOnly} onClick={onThumbUp} aria-label="Thumbs up">
        <Icon name="thumb-up" size="md" alt="" />
      </button>
      <button type="button" className={styles.iconOnly} onClick={onThumbDown} aria-label="Thumbs down">
        <Icon name="thumb-down" size="md" alt="" />
      </button>

      {variant === 'full' ? (
        <>
          <button type="button" className={styles.textBtn} onClick={onTryAgain}>
            <Icon name="again" size="md" alt="" />
            <span>Try again</span>
          </button>
          <button type="button" className={styles.textBtn} onClick={onCopy}>
            <Icon name="copy" size="md" alt="" />
            <span>Copy</span>
          </button>
          <button type="button" className={styles.textBtn} onClick={onDiagnosis}>
            <Icon name="bug" size="md" alt="" />
            <span>AI Diagnosis</span>
          </button>
        </>
      ) : null}
    </div>
  );
}
