import { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon.jsx';
import styles from './JsonPanel.module.css';

const DEFAULT_JSON = `{
  "totalSize": 5,
  "totalBehalfSize": 3,
  "records": [
    {
      "doc_unit": "chunk",
      "chunk_idx": 9,
      "doc_modify_time": "2026-04-27 16:28:43",
      "is_local_download": true,
      "chunk_image_url": null,
      "raw_file_filesize": 43503,
      "preview_pdf_filesize": -1,
      "data_type_id": 12,
      "filesystem_structure_id": 22673,
      "download_url": "",
      "parent_path": "/data/338198/開發者",
      "id": "8652065877704578540",
      "keyword": "",
      "chunk_type": "text",
      "doc_filename": "all.json",
      "has_md_preview": false,
      "sub_doc_name": "第1頁",
      "has_preview": true,
      "add_knowledge_time": "2026-04-27 16:28:43",
      "plain_text_data": [
        "\\"post_id\\": 4198344,\\n            \\"work_order_id\\": 338198,\\n            \\"type\\": \\"Update\\","
      ],
      "favorite_id": null,
      "favorite_category_id": null,
      "favorite_category_name": null
    },
    {
      "doc_unit": "chunk",
      "chunk_idx": 10,
      "doc_modify_time": "2026-04-27 16:30:12",
      "is_local_download": true,
      "chunk_image_url": null,
      "raw_file_filesize": 51280,
      "preview_pdf_filesize": -1,
      "data_type_id": 12,
      "filesystem_structure_id": 22674,
      "download_url": "",
      "parent_path": "/data/338198/開發者",
      "id": "8652065877704578541",
      "keyword": "",
      "chunk_type": "text",
      "doc_filename": "all.json",
      "has_md_preview": false,
      "sub_doc_name": "第2頁",
      "has_preview": true,
      "add_knowledge_time": "2026-04-27 16:30:12",
      "plain_text_data": [
        "\\"post_id\\": 4198345,\\n            \\"work_order_id\\": 338198,\\n            \\"type\\": \\"Create\\","
      ],
      "favorite_id": null,
      "favorite_category_id": null,
      "favorite_category_name": null
    }
  ],
  "groupBy": {
    "total_groups": 3
  },
  "rerank_model_id": null,
  "tn_app_id": 10
}`;

export function JsonPanel({
  title = 'JSON',
  content = DEFAULT_JSON,
  searchValue = '',
  onSearchChange,
  onExpand,
  onCopy,
  onClose,
  defaultSearchOpen = false,
  variant = 'panel',
  className = '',
}) {
  const isFull = variant === 'full';
  const [searchOpen, setSearchOpen] = useState(defaultSearchOpen || isFull);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  const panel = (
    <aside
      className={`${styles.panel} ${isFull ? styles.fullPanel : ''} ${className}`.trim()}
      role={isFull ? 'dialog' : undefined}
      aria-modal={isFull ? true : undefined}
      aria-label={isFull ? title : undefined}
    >
      <header className={styles.titleRow}>
        <h2 className={styles.title}>{title}</h2>
        <button type="button" className={styles.iconBtnSm} onClick={onClose} aria-label="Close">
          <Icon name="cancel" size={14} alt="" />
        </button>
      </header>

      <div className={styles.toolbar}>
        {searchOpen ? (
          <label className={`${styles.search} ${isFull ? styles.searchFull : ''}`.trim()}>
            <input
              ref={searchInputRef}
              value={searchValue}
              onChange={onSearchChange}
              placeholder="Search"
              aria-label="Search JSON"
            />
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
            >
              <Icon name="search" size={20} alt="" className={styles.searchIcon} />
            </button>
          </label>
        ) : (
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
          >
            <Icon name="search" size={20} alt="" />
          </button>
        )}
        <button type="button" className={styles.iconBtn} onClick={onCopy} aria-label="Copy">
          <Icon name="copy" size={20} alt="" />
        </button>
        {!isFull ? (
          <button type="button" className={styles.iconBtn} onClick={onExpand} aria-label="Expand">
            <Icon name="open-in-new" size={20} alt="" />
          </button>
        ) : null}
      </div>

      <pre className={styles.code}>{content}</pre>
    </aside>
  );

  if (!isFull) return panel;

  return (
    <div className={styles.fullOverlay} onClick={onClose}>
      <div className={styles.fullShell} onClick={(event) => event.stopPropagation()}>
        {panel}
      </div>
    </div>
  );
}
