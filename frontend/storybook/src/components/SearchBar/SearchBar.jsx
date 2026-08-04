import { useEffect, useId, useRef, useState } from 'react';
import { AssistantSelector } from '../AssistantSelector/AssistantSelector.jsx';
import { Icon } from '../Icon/Icon.jsx';
import { IconButton } from '../IconButton/IconButton.jsx';
import { SearchFilterDialog, DEFAULT_FILE_TYPES } from '../SearchFilterDialog/SearchFilterDialog.jsx';
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

export const DEFAULT_EXTENSIONS = [
  { id: 'tavily', label: 'Tavily' },
  { id: 'customer-intake', label: 'Customer intake' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'dispatch-scheduling', label: 'Dispatch Scheduling' },
];

export function SearchBar({
  variant = 'default',
  placeholder = 'What would you like to search today?',
  value = '',
  onChange,
  onAdd,
  onFilter,
  onUpload,
  onFiltersChange,
  onAssistantClick,
  onAssistantChange,
  onVoice,
  onSubmit,
  onSuggestionSelect,
  onExtensionsChange,
  assistantLabel,
  suggestions = DEFAULT_SUGGESTIONS,
  extensions = DEFAULT_EXTENSIONS,
  selectedExtensions: selectedExtensionsProp,
  defaultSelectedExtensions = [],
  className = '',
}) {
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [extensionsOpen, setExtensionsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    fileDate: '',
    fileTypes: [],
    folder: '',
  });
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedExtensions, setSelectedExtensions] = useState(defaultSelectedExtensions);
  const [attachments, setAttachments] = useState([]);
  const rootRef = useRef(null);
  const fileInputRef = useRef(null);
  const listId = useId();
  const addMenuId = useId();

  const resolvedSelected =
    selectedExtensionsProp !== undefined ? selectedExtensionsProp : selectedExtensions;

  const itemEntries = suggestions
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => entry.type === 'item');

  const closeMenus = () => {
    setAddMenuOpen(false);
    setExtensionsOpen(false);
  };

  const closeSuggestions = () => {
    setSuggestionsOpen(false);
    setActiveIndex(-1);
  };

  useEffect(() => {
    if (!suggestionsOpen && !addMenuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        closeSuggestions();
        closeMenus();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeSuggestions();
        closeMenus();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [suggestionsOpen, addMenuOpen]);

  const applySuggestion = (text) => {
    onChange?.({ target: { value: text } });
    onSuggestionSelect?.(text);
    closeSuggestions();
  };

  const toggleAddMenu = () => {
    setAddMenuOpen((open) => {
      const next = !open;
      if (next) {
        closeSuggestions();
        onAdd?.();
      } else {
        setExtensionsOpen(false);
      }
      return next;
    });
  };

  const updateExtensions = (next) => {
    if (selectedExtensionsProp === undefined) {
      setSelectedExtensions(next);
    }
    onExtensionsChange?.(next);
  };

  const toggleExtension = (id) => {
    const next = resolvedSelected.includes(id)
      ? resolvedSelected.filter((item) => item !== id)
      : [...resolvedSelected, id];
    updateExtensions(next);
  };

  const removeExtension = (id) => {
    updateExtensions(resolvedSelected.filter((item) => item !== id));
  };

  const removeAttachment = (id) => {
    setAttachments((current) => current.filter((item) => item.id !== id));
  };

  const updateFilters = (next) => {
    setFilters(next);
    onFiltersChange?.(next);
  };

  const removeFileTypeFilter = (id) => {
    updateFilters({
      ...filters,
      fileTypes: filters.fileTypes.filter((item) => item !== id),
    });
  };

  const handleFilter = () => {
    onFilter?.();
    closeMenus();
    setFilterOpen(true);
  };

  const handleUpload = () => {
    onUpload?.();
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const label = file.name.split('.').pop()?.toUpperCase() || 'FILE';
      setAttachments((current) => [
        ...current,
        { id: `${file.name}-${Date.now()}`, label },
      ]);
    }
    event.target.value = '';
    closeMenus();
  };

  const selectedExtensionChips = extensions.filter((ext) =>
    resolvedSelected.includes(ext.id),
  );

  const selectedFileTypeChips = DEFAULT_FILE_TYPES.filter((type) =>
    filters.fileTypes.includes(type.id),
  );

  const chips = [
    ...selectedExtensionChips.map((ext) => ({
      id: `ext-${ext.id}`,
      label: ext.label,
      variant: 'filled',
      onRemove: () => removeExtension(ext.id),
    })),
    ...selectedFileTypeChips.map((type) => ({
      id: `filetype-${type.id}`,
      label: type.chipLabel,
      variant: 'outline',
      onRemove: () => removeFileTypeFilter(type.id),
    })),
    ...attachments.map((file) => ({
      id: `file-${file.id}`,
      label: file.label,
      variant: 'outline',
      onRemove: () => removeAttachment(file.id),
    })),
  ];

  const addMenu = addMenuOpen ? (
    <div className={styles.addMenuWrap}>
      <div
        className={styles.addMenu}
        id={addMenuId}
        role="menu"
        aria-label="Add attachment options"
      >
        <button
          type="button"
          role="menuitem"
          className={styles.addMenuItem}
          onMouseEnter={() => setExtensionsOpen(false)}
          onClick={handleFilter}
        >
          <Icon name="filter" size="md" alt="" />
          <span>Filter</span>
        </button>
        <button
          type="button"
          role="menuitem"
          className={styles.addMenuItem}
          onMouseEnter={() => setExtensionsOpen(false)}
          onClick={handleUpload}
        >
          <Icon name="upload" size="md" alt="" />
          <span>Upload attachment</span>
        </button>
        <button
          type="button"
          role="menuitem"
          className={`${styles.addMenuItem} ${extensionsOpen ? styles.addMenuItemActive : ''}`.trim()}
          aria-haspopup="menu"
          aria-expanded={extensionsOpen}
          onMouseEnter={() => setExtensionsOpen(true)}
          onFocus={() => setExtensionsOpen(true)}
          onClick={() => setExtensionsOpen((open) => !open)}
        >
          <Icon name="business-center" size="md" alt="" />
          <span className={styles.addMenuItemLabel}>Extensions</span>
          <Icon name="chevron-right" size="sm" alt="" />
        </button>
      </div>

      {extensionsOpen ? (
        <div
          className={styles.extensionsMenu}
          role="menu"
          aria-label="Extensions"
          onMouseEnter={() => setExtensionsOpen(true)}
        >
          {extensions.map((ext) => {
            const checked = resolvedSelected.includes(ext.id);
            return (
              <button
                key={ext.id}
                type="button"
                role="menuitemcheckbox"
                aria-checked={checked}
                className={styles.addMenuItem}
                onClick={() => toggleExtension(ext.id)}
              >
                <span
                  className={`${styles.checkbox} ${checked ? styles.checkboxChecked : ''}`.trim()}
                  aria-hidden="true"
                >
                  {checked ? <span className={styles.checkboxMark} /> : null}
                </span>
                <span>{ext.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  ) : null;

  const chipRow =
    chips.length > 0 ? (
      <div className={styles.chips} aria-label="Selected filters and attachments">
        {chips.map((chip) => (
          <span
            key={chip.id}
            className={`${styles.chip} ${chip.variant === 'outline' ? styles.chipOutline : styles.chipFilled}`.trim()}
          >
            <span className={styles.chipLabel}>{chip.label}</span>
            <button
              type="button"
              className={styles.chipRemove}
              aria-label={`Remove ${chip.label}`}
              onClick={chip.onRemove}
            >
              <Icon name="cancel-steel" size="sm" alt="" />
            </button>
          </span>
        ))}
      </div>
    ) : null;

  const fileInput = (
    <input
      ref={fileInputRef}
      type="file"
      className={styles.hiddenFileInput}
      tabIndex={-1}
      aria-hidden="true"
      onChange={handleFileChange}
    />
  );

  const filterDialog = (
    <SearchFilterDialog
      open={filterOpen}
      value={filters}
      onConfirm={(next) => {
        updateFilters(next);
      }}
      onClose={() => setFilterOpen(false)}
    />
  );

  if (variant === 'compact') {
    return (
      <section
        ref={rootRef}
        className={`${styles.compact} ${className}`.trim()}
        aria-label="Search"
      >
        <div className={styles.addAnchor}>
          <IconButton
            icon="add"
            label="Add attachment"
            onClick={toggleAddMenu}
            aria-expanded={addMenuOpen}
            aria-controls={addMenuOpen ? addMenuId : undefined}
          />
          {addMenu}
        </div>
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
        {fileInput}
        {filterDialog}
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
          onFocus={() => {
            closeMenus();
            setSuggestionsOpen(true);
          }}
          onClick={() => {
            closeMenus();
            setSuggestionsOpen(true);
          }}
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
              closeSuggestions();
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
          <div className={styles.addAnchor}>
            <IconButton
              icon="add"
              label="Add attachment"
              onClick={toggleAddMenu}
              aria-expanded={addMenuOpen}
              aria-controls={addMenuOpen ? addMenuId : undefined}
            />
            {addMenu}
          </div>
          <AssistantSelector
            label={assistantLabel}
            onClick={onAssistantClick}
            onChange={onAssistantChange}
          />
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

      {chipRow}

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

      {fileInput}
      {filterDialog}
    </section>
  );
}
