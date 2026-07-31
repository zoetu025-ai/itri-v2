import { AssistantSelector } from '../AssistantSelector/AssistantSelector.jsx';
import { Icon } from '../Icon/Icon.jsx';
import { IconButton } from '../IconButton/IconButton.jsx';
import styles from './SearchBar.module.css';

export function SearchBar({
  variant = 'default',
  placeholder = 'What would you like to search today?',
  value = '',
  onChange,
  onAdd,
  onAssistantClick,
  onVoice,
  onSubmit,
  assistantLabel,
  className = '',
}) {
  if (variant === 'compact') {
    return (
      <section
        className={`${styles.compact} ${className}`.trim()}
        aria-label="Search"
      >
        <IconButton icon="add" label="Add attachment" onClick={onAdd} />
        <input
          className={styles.compactInput}
          placeholder={placeholder || 'Enter your question'}
          value={value}
          onChange={onChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              onSubmit?.(event);
            }
          }}
        />
        <button
          type="button"
          className={styles.voiceButton}
          onClick={onVoice}
          aria-label="Voice input"
        >
          <Icon name="microphone" size="md" alt="" />
        </button>
        <IconButton icon="arrow-right" label="Submit search" onClick={onSubmit} />
      </section>
    );
  }

  return (
    <section className={`${styles.card} ${className}`.trim()} aria-label="Search">
      <div className={styles.textAreaWrap}>
        <textarea
          className={styles.textArea}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              onSubmit?.(event);
            }
          }}
          rows={4}
        />
      </div>

      <div className={styles.toolbar}>
        <div className={styles.toolbarStart}>
          <IconButton icon="add" label="Add attachment" onClick={onAdd} />
          <AssistantSelector label={assistantLabel} onClick={onAssistantClick} />
        </div>

        <div className={styles.toolbarEnd}>
          <button
            type="button"
            className={styles.voiceButton}
            onClick={onVoice}
            aria-label="Voice input"
          >
            <Icon name="microphone" size="md" alt="" />
          </button>
          <IconButton icon="arrow-right" label="Submit search" onClick={onSubmit} />
        </div>
      </div>
    </section>
  );
}
