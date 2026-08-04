import { useEffect, useId, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon.jsx';
import styles from './AssistantSelector.module.css';

export const DEFAULT_ASSISTANTS = [
  { id: 'retrieval', label: '🤖 Retrieval assistant' },
  { id: 'work-order', label: '🤖 Work Order status tracking assistant' },
  { id: 'retrieval-template', label: '🤖 Retrieval assistant template' },
  { id: 'audit-moda', label: '🤖 Audit assistant_moda' },
];

export function AssistantSelector({
  label,
  value,
  options = DEFAULT_ASSISTANTS,
  onClick,
  onChange,
  className = '',
}) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(options[0]?.id ?? '');
  const rootRef = useRef(null);
  const listId = useId();

  const resolvedId = value ?? selectedId;
  const selectedOption =
    options.find((option) => option.id === resolvedId) ?? options[0];
  const displayLabel = label ?? selectedOption?.label ?? '🤖 Retrieval assistant';

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const handleToggle = () => {
    setOpen((current) => !current);
    onClick?.();
  };

  const handleSelect = (option) => {
    if (value === undefined) {
      setSelectedId(option.id);
    }
    onChange?.(option);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={`${styles.root} ${className}`.trim()}>
      <button
        type="button"
        className={styles.selector}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
      >
        <Icon name="avatar" size="md" alt="" />
        <span className={styles.label}>{displayLabel}</span>
        <Icon name="chevron-down" size="sm" alt="" />
      </button>

      {open ? (
        <div className={styles.menu} id={listId} role="listbox" aria-label="Assistants">
          {options.map((option) => {
            const selected = option.id === resolvedId;
            return (
              <button
                key={option.id}
                type="button"
                role="option"
                aria-selected={selected}
                className={`${styles.menuItem} ${selected ? styles.menuItemSelected : ''}`.trim()}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
