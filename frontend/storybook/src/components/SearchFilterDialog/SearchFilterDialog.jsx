import { useEffect, useId, useState } from 'react';
import { Icon } from '../Icon/Icon.jsx';
import styles from './SearchFilterDialog.module.css';

export const DEFAULT_FILE_TYPES = [
  { id: 'pdf', label: 'PDF (.pdf)', chipLabel: 'PDF' },
  { id: 'presentation', label: 'Presentation (.ppt, .pptx)', chipLabel: 'Presentation' },
  { id: 'document', label: 'Document (.doc, .docx)', chipLabel: 'Document' },
  { id: 'spreadsheet', label: 'Spreadsheet (.xls, .xlsx, .csv)', chipLabel: 'Spreadsheet' },
  { id: 'web', label: 'Web (.html, .htm)', chipLabel: 'Web' },
  { id: 'plain-text', label: 'Plain text (.txt, .json, .md)', chipLabel: 'Plain text' },
  { id: 'image', label: 'Image (.jpg, .jpeg, .png, .bmp, .dib, .webp, .tif, .tiff)', chipLabel: 'Image' },
];

export const DEFAULT_FILE_DATE_OPTIONS = [
  { value: '', label: 'Select' },
  { value: 'any', label: 'Any time' },
  { value: 'week', label: 'Past week' },
  { value: 'month', label: 'Past month' },
  { value: 'year', label: 'Past year' },
];

export const DEFAULT_FOLDER_OPTIONS = [
  { value: '', label: 'Select' },
  { value: 'all', label: 'All folders' },
];

const EMPTY_FILTERS = {
  fileDate: '',
  fileTypes: [],
  folder: '',
};

export function SearchFilterDialog({
  open = false,
  value = EMPTY_FILTERS,
  fileTypes = DEFAULT_FILE_TYPES,
  fileDateOptions = DEFAULT_FILE_DATE_OPTIONS,
  folderOptions = DEFAULT_FOLDER_OPTIONS,
  onConfirm,
  onClose,
  className = '',
}) {
  const titleId = useId();
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    if (open) {
      setDraft({
        fileDate: value.fileDate ?? '',
        fileTypes: [...(value.fileTypes ?? [])],
        folder: value.folder ?? '',
      });
    }
  }, [open, value]);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const toggleFileType = (id) => {
    setDraft((current) => {
      const nextTypes = current.fileTypes.includes(id)
        ? current.fileTypes.filter((item) => item !== id)
        : [...current.fileTypes, id];
      return { ...current, fileTypes: nextTypes };
    });
  };

  const handleReset = () => {
    setDraft({ ...EMPTY_FILTERS, fileTypes: [] });
  };

  const handleConfirm = () => {
    onConfirm?.(draft);
    onClose?.();
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className={`${styles.overlay} ${className}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={handleOverlayClick}
    >
      <div className={styles.dialog}>
        <div className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            Search Filter
          </h2>
          <button
            type="button"
            className={styles.closeButton}
            aria-label="Close search filter"
            onClick={onClose}
          >
            <Icon name="cancel" size="sm" alt="" />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="search-filter-file-date">
              File Date
            </label>
            <div className={styles.selectWrap}>
              <select
                id="search-filter-file-date"
                className={`${styles.select} ${draft.fileDate ? styles.selectFilled : ''}`.trim()}
                value={draft.fileDate}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, fileDate: event.target.value }))
                }
              >
                {fileDateOptions.map((option) => (
                  <option key={option.value || 'empty'} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className={styles.selectIcon} aria-hidden="true">
                <Icon name="chevron-down" size="sm" alt="" />
              </span>
            </div>
          </div>

          <div className={styles.fieldStart}>
            <span className={styles.label}>File Type</span>
            <div className={styles.fileTypes} role="group" aria-label="File Type">
              {fileTypes.map((type) => {
                const checked = draft.fileTypes.includes(type.id);
                return (
                  <button
                    key={type.id}
                    type="button"
                    className={styles.checkItem}
                    role="checkbox"
                    aria-checked={checked}
                    onClick={() => toggleFileType(type.id)}
                  >
                    <span
                      className={`${styles.checkbox} ${checked ? styles.checkboxChecked : ''}`.trim()}
                      aria-hidden="true"
                    >
                      {checked ? <span className={styles.checkboxMark} /> : null}
                    </span>
                    <span className={styles.checkLabel}>{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="search-filter-folder">
              Folder
            </label>
            <div className={styles.selectWrap}>
              <select
                id="search-filter-folder"
                className={`${styles.select} ${draft.folder ? styles.selectFilled : ''}`.trim()}
                value={draft.folder}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, folder: event.target.value }))
                }
              >
                {folderOptions.map((option) => (
                  <option key={option.value || 'empty'} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className={styles.selectIcon} aria-hidden="true">
                <Icon name="chevron-down" size="sm" alt="" />
              </span>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.resetButton} onClick={handleReset}>
            Reset
          </button>
          <button type="button" className={styles.confirmButton} onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
