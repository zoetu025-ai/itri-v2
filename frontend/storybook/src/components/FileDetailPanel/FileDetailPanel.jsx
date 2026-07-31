import { Icon } from '../Icon/Icon.jsx';
import styles from './FileDetailPanel.module.css';

const DEFAULT_FIELDS = [
  { icon: 'file-source', label: 'File Source', value: 'CSI' },
  { icon: 'path', label: 'File Path', value: '/ data / 336491 / doc-2.json' },
  { icon: 'file-meta', label: 'File Size', value: '/ data / 336491 / doc-2.json' },
  { icon: 'file-id', label: 'File ID', value: '336491' },
  { icon: 'file-copy', label: 'Page', value: '2' },
  { icon: 'time', label: 'File Date', value: '2026/04/23 03:02:52' },
  { icon: 'time', label: 'Last Date', value: '2026/04/23 03:02:52' },
];

export function buildFileDetailFields(source) {
  const path = source?.path ?? '/ data / 336491 / doc-2.json';

  return DEFAULT_FIELDS.map((field) => {
    if (field.label === 'File Path' || field.label === 'File Size') {
      return { ...field, value: path };
    }

    return field;
  });
}

export function FileDetailPanel({
  title = 'all.json',
  fields = DEFAULT_FIELDS,
  onClose,
  className = '',
}) {
  return (
    <aside className={`${styles.panel} ${className}`.trim()}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.actions}>
          <button type="button" className={styles.iconBtn} onClick={onClose} aria-label="Close">
            <Icon name="cancel" size={14} alt="" />
          </button>
        </div>
      </header>

      <div className={styles.fields}>
        {fields.map((field) => (
          <div key={field.label} className={styles.field}>
            <Icon name={field.icon} size={24} alt="" className={styles.fieldIcon} />
            <div className={styles.fieldText}>
              <span className={styles.label}>{field.label}</span>
              <span className={styles.value}>{field.value}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
