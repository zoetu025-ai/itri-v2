import { useEffect, useId, useRef, useState } from 'react';
import { AssistantSelector } from '../AssistantSelector/AssistantSelector.jsx';
import { Icon } from '../Icon/Icon.jsx';
import { IconButton } from '../IconButton/IconButton.jsx';
import styles from './SearchBar.module.css';

export const DEFAULT_SUGGESTIONS = [
  {
    type: 'item',
    text: 'How much advance notice do I need to give before taking a leave of absence?',
  },
  {
    type: 'item',
    text: 'Will I still be eligible for benefits during my leave of absence?',
  },
  {
    type: 'item',
    text: 'What happens if I need to extend my leave of absence?',
  },
  {
    type: 'item',
    text: 'How will my return to work be handled?',
  },
  { type: 'section', label: 'ITRI' },
  {
    type: 'item',
    text: 'How long can I take for a leave of absence?',
  },
  {
    type: 'item',
    text: 'How much advance notice do I need to give before taking a leave of absence?',
  },
  {
    type: 'item',
    text: 'What happens if I need to extend my leave of absence?',
  },
  {
    type: 'item',
    text: 'How will my return to work be handled?',
  },
  { type: 'section', label: 'All users' },
  {
    type: 'item',
    text: 'How much advance notice do I need to give before taking a leave of absence?',
  },
  {
    type: 'item',
    text: 'How long can I take for a leave of absence?',
  },
];

export function SearchBar({
  variant = 'default',
  placeholder = 'What would you like to search today?',
  value = '',
  onChange,
  onAdd,
  onAssistantClick,
  onVoice,
  onSubmit,
  onSuggestionSelect,
  assistantLabel,
  suggestions = DEFAULT_SUGGESTIONS,
  className = '',
}) {
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef(null);
  const listId = useId();

  const itemEntries = suggestions
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => entry.type === 'item');

  useEffect(() => {
    if (!suggestionsOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setSuggestionsOpen(false);
        setActiveIndex(-1);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSuggestionsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [suggestionsOpen]);

  const applySuggestion = (text) => {
    onChange?.({ target: { value: text } });
    onSuggestionSelect?.(text);
    setSuggestionsOpen(false);
    setActiveIndex(-1);
  };

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
    <section
      ref={rootRef}
      className={`${styles.card} ${className}`.trim()}
      aria-label="Search"
    >
      <div className={styles.textAreaWrap}>
        <textarea
          className={styles.textArea}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setSuggestionsOpen(true)}
          onClick={() => setSuggestionsOpen(true)}
          onKeyDown={(event) => {
            if (suggestionsOpen && itemEntries.length > 0) {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                setActiveIndex((current) =>
                  current < itemEntries.length - 1 ? current + 1 : 0,
                );
                return;
              }
              if (event.key === 'ArrowUp') {
                event.preventDefault();
                setActiveIndex((current) =>
                  current > 0 ? current - 1 : itemEntries.length - 1,
                );
                return;
              }
              if (event.key === 'Enter' && !event.shiftKey && activeIndex >= 0) {
                event.preventDefault();
                applySuggestion(itemEntries[activeIndex].entry.text);
                return;
              }
            }

            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              setSuggestionsOpen(false);
              onSubmit?.(event);
            }
          }}
          rows={4}
          aria-expanded={suggestionsOpen}
          aria-controls={suggestionsOpen ? listId : undefined}
          aria-autocomplete="list"
          role="combobox"
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

      {suggestionsOpen ? (
        <div className={styles.suggestions} id={listId} role="listbox" aria-label="Popular questions">
          {suggestions.map((entry, index) => {
            if (entry.type === 'section') {
              return (
                <div key={`section-${entry.label}-${index}`} className={styles.suggestionSection}>
                  {entry.label}
                </div>
              );
            }

            const itemOrder = itemEntries.findIndex(({ index: itemIndex }) => itemIndex === index);
            const isActive = itemOrder === activeIndex;

            return (
              <button
                key={`item-${index}-${entry.text}`}
                type="button"
                role="option"
                aria-selected={isActive}
                className={`${styles.suggestionItem} ${isActive ? styles.suggestionItemActive : ''}`.trim()}
                onMouseEnter={() => setActiveIndex(itemOrder)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => applySuggestion(entry.text)}
              >
                {entry.text}
              </button>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
