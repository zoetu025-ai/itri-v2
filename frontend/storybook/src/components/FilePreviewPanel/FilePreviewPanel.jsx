import { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon.jsx';
import styles from './FilePreviewPanel.module.css';

const DEFAULT_CONTENT = `{
work order:{
WO#:328105
project_name:"NJ CAD/RMS - Hunterdon County Regional"
phase_name:"DEVELOPMENT PHASE"
short_desc:"Hunterdon County > Fire RMS > STAGING-SITE (Cloud) > Personnel Lite is not configured correctly for Fire Departments"
status:"Closed"
post_by:"LAPORTA, STEVEN J"
assign_to:null
post_date:"2024-10-31T22:04:00.310000"
work_order_level:"All Staff Level"
}
updates:[
{
post_id:3636010
work_order_id:328105
type:"Comment"
post_by:"LIAO, WEI-CHU"
post_date:"2024-11-14T00:22:53.020000"
comment:"Hi Steve,

I have assigned the "MY - PERSONNEL" inboxes to all Fire Departments, all Personnel Users Group (Lite), and all Personnel General Group (Lite)
Also assigned the "SUPERVISOR PERSONNEL" inboxes to all Fire Departments, all Personnel Users Group (Lite), and all Personnel Supervisor Group (Lite)

I only touched the inboxes. I did not modify any groups or other permissions. Thus, Annandale Fire may still have problems with groups/permissions/inboxes, which I will handle in WO#[328368].

Please review on Hunterdon Staging. Thanks."
fs_name:null
comment_level:"All Staff Level"
}
{
post_id:3624507
work_order_id:328105
type:"Comment"
post_by:"LAPORTA, STEVEN J"
post_date:"2024-11-05T05:47:58.853000"
comment:"CP,

Thank you and Wei-Chu. I tested/reviewed the HCDPS staging-site (https://hunterdonrmsstage.infoshare.cloud/RMS) and the work that Wei-Chu did for Clinton and Kingwood w`;

const FULL_VIEW_CONTENT = `{
  "totalSize": 5,
  "totalGrpSize": 3,
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
        "\\"post_id\\": 4198344,\\n            \\"work_order_id\\": 338198,\\n            \\"type\\": \\"Update\\",\\n            \\"post_by\\": \\"HSIEH, SEAN\\",\\n            \\"post_date\\": \\"2025-12-08T13:35:29.757000\\",\\n            \\"comment\\": \\"changed assigned_to from \\\\\\"HSIEH, SEAN\\\\\\" to \\\\,\\n        {\\n            \\"post_id\\": 4196812,\\n            , the only thing you'll need to adjust is the\\r\\nactual con"
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

export const DEFAULT_SOURCE_SNIPPETS = [
  {
    parts: [
      { text: '(Lite)\r\nAlso assigned the "SUPERVISOR ' },
      { text: 'PERSONNEL', highlight: true },
      { text: '" inboxes to all Fire Departments, all Personnel' },
    ],
  },
  {
    parts: [
      { text: 'Users Group (Lite), and all ' },
      { text: 'Personnel', highlight: true },
      { text: ' Supervisor Group (Lite)\r\n\r\nI only touched the inboxes.' },
    ],
  },
  {
    parts: [
      { text: '" inboxes to all Fire Departments, all ' },
      { text: 'Personnel', highlight: true },
      { text: ' Users Group (Lite), and all Personnel Gen' },
    ],
  },
  {
    parts: [
      { text: 'SITE (Cloud) > ' },
      { text: 'Personnel', highlight: true },
    ],
  },
  {
    parts: [
      { text: 'All of the ' },
      { text: 'Personnel', highlight: true },
      { text: ' Lite is setup for everyone it seems, but only inboxes are setup and correc' },
    ],
  },
  {
    parts: [
      { text: '" inboxes to all Fire Departments, ' },
      { text: 'Personnel', highlight: true },
      { text: ' all Personnel Support Group (Lite), and all Personnel Admin' },
    ],
  },
  {
    parts: [
      { text: 'Personnel', highlight: true },
      {
        text: ' Updated the Users Group (Lite) assignments to include various local departments\r\n\r\nReviewed the inbox setup.',
      },
    ],
  },
  {
    parts: [
      { text: '" inboxes to all Fire Departments, ' },
      { text: 'Personnel', highlight: true },
      { text: ' all Personnel Auxiliary Group (Lite), and all Personnel Training' },
    ],
  },
  {
    parts: [{ text: 'NETWORK (Cloud) > Personnel' }],
  },
  {
    parts: [
      { text: 'Ensured ' },
      { text: 'Personnel', highlight: true },
      {
        text: ' the Personnel Lite configurations are accessible for all users, but only specific inboxes are active.',
      },
    ],
  },
  {
    parts: [
      { text: 'Reassigned the inboxes to all Fire Departments, all ' },
      { text: 'Personnel', highlight: true },
      { text: ' Operations Group (Lite), and all Personnel Compliance' },
    ],
  },
  {
    parts: [
      { text: 'Conducted a full audit of the Users Group (Lite) ' },
      { text: 'Personnel', highlight: true },
      { text: ' for optimal inbox management.' },
    ],
  },
];

const SNIPPET_ROW_MIN_HEIGHT = 60;

const FILLER_BLOCK = `
      "related_notes": [
        "Reviewed staging permissions and inbox inheritance for Fire Departments.",
        "Validated Supervisor / Users / General group mapping on Hunterdon Staging.",
        "Confirmed no unintended group permission changes outside assigned inboxes.",
        "Cross-checked Personnel Lite configuration against WO notes and audit trail."
      ],
      "audit_trail": {
        "reviewed_by": "LIAO, WEI-CHU",
        "validated_by": "LAPORTA, STEVEN J",
        "last_checked": "2026-04-29T09:15:00.000000",
        "status": "verified"
      },
      "meta_context": {
        "environment": "STAGING-SITE (Cloud)",
        "module": "Personnel Lite",
        "region": "Hunterdon County Regional",
        "opportunity": true
      }`;

const RECORD_PREFIX = (index) => `    {
      "doc_unit": "chunk",
      "chunk_idx": ${index},
      "doc_modify_time": "2026-04-27 16:28:43",
      "is_local_download": true,
      "chunk_image_url": null,
      "raw_file_filesize": ${42000 + index * 137},
      "preview_pdf_filesize": -1,
      "data_type_id": 12,
      "filesystem_structure_id": ${22673 + index},
      "download_url": "",
      "parent_path": "/data/338198/開發者",
      "id": "865206587770457854${index}",
      "keyword": "Personnel",
      "chunk_type": "text",
      "doc_filename": "all.json",
      "has_md_preview": false,
      "sub_doc_name": "第${index + 1}頁",
      "has_preview": true,
      "add_knowledge_time": "2026-04-27 16:28:43",
      "plain_text_data": [
        "`;

const RECORD_SUFFIX = `"
      ],${FILLER_BLOCK},
      "favorite_id": null,
      "favorite_category_id": null,
      "favorite_category_name": null
    }`;

function snippetPlainText(snippet) {
  return (snippet?.parts ?? []).map((part) => part.text).join('');
}

function snippetSentence(snippet) {
  // Keep sidebar wording; escape so it can sit inside a JSON string literal.
  return JSON.stringify(snippetPlainText(snippet)).slice(1, -1);
}

function buildSourceSections(snippets) {
  return snippets.map((snippet, index) => ({
    index,
    before: RECORD_PREFIX(index),
    sentence: snippetSentence(snippet),
    after: RECORD_SUFFIX,
  }));
}

const SOURCE_SECTIONS = buildSourceSections(DEFAULT_SOURCE_SNIPPETS);

function SnippetText({ parts }) {
  return (
    <p className={styles.snippetText}>
      {parts.map((part, index) =>
        part.highlight ? (
          <strong key={index} className={styles.highlight}>
            {part.text}
          </strong>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </p>
  );
}

function HighlightedPersonnelText({ text }) {
  const parts = String(text).split(/(PERSONNEL|Personnel)/g);

  return parts.map((part, index) =>
    part === 'PERSONNEL' || part === 'Personnel' ? (
      <strong key={index} className={styles.highlight}>
        {part}
      </strong>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

function SourceSplitContent({
  snippets,
  sections,
  activeSnippetIndex,
  focusToken,
}) {
  const scrollerRef = useRef(null);
  const anchorRefs = useRef({});

  useEffect(() => {
    const node = anchorRefs.current[activeSnippetIndex];
    if (!node || !scrollerRef.current) return;

    node.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [activeSnippetIndex, focusToken]);

  const header = `{\n  "totalSize": ${snippets.length * 3},\n  "totalGrpSize": 3,\n`;
  const footer = `,\n  "groupBy": {\n    "total_groups": 3\n  },\n  "rerank_model_id": null,\n  "tn_app_id": 10\n}`;

  return (
    <pre ref={scrollerRef} className={styles.splitContent}>
      <span>{header}</span>
      {[0, 1, 2].map((pass) => (
        <span key={`pass-${pass}`}>
          {pass === 0 ? '' : ',\n'}
          {`  "pass_${pass + 1}": [\n`}
          {sections.map((section, index) => (
            <span key={`pass-${pass}-section-${index}`}>
              {index === 0 ? '' : ',\n'}
              <span>{section.before}</span>
              <span
                ref={(node) => {
                  if (pass === 0) {
                    anchorRefs.current[section.index] = node;
                  }
                }}
                className={styles.contentLine}
                data-snippet-index={section.index}
              >
                <HighlightedPersonnelText text={section.sentence} />
              </span>
              <span>{section.after}</span>
            </span>
          ))}
          {'\n  ]'}
        </span>
      ))}
      <span>{footer}</span>
    </pre>
  );
}

export function FilePreviewPanel({
  title,
  date = '2026-04-29',
  content,
  snippets,
  page: controlledPage,
  onPageChange,
  activeSnippetIndex = 0,
  onSnippetSelect,
  onLink,
  onDownload,
  onInfo,
  onExpand,
  onClose,
  variant = 'panel',
  className = '',
}) {
  const isFull = variant === 'full';
  const isSource = variant === 'source';
  const isOverlay = isFull || isSource;
  const [internalPage, setInternalPage] = useState(1);
  const [focusToken, setFocusToken] = useState(0);
  const [pageSize, setPageSize] = useState(1);
  const listRef = useRef(null);
  const columnRef = useRef(null);
  const page = controlledPage ?? internalPage;

  const allSnippets = snippets ?? DEFAULT_SOURCE_SNIPPETS;
  const resolvedPageCount = Math.max(1, Math.ceil(allSnippets.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), resolvedPageCount);
  const pageStart = (safePage - 1) * pageSize;
  const pageSnippets = allSnippets.slice(pageStart, pageStart + pageSize);

  const sections =
    allSnippets === DEFAULT_SOURCE_SNIPPETS
      ? SOURCE_SECTIONS
      : buildSourceSections(allSnippets);

  const resolvedTitle = title ?? (isOverlay ? 'JSON' : 'all.json');
  const resolvedContent = content ?? (isFull ? FULL_VIEW_CONTENT : DEFAULT_CONTENT);

  const focusIndex =
    pageStart + Math.min(activeSnippetIndex, Math.max(pageSnippets.length - 1, 0));
  const localActiveIndex =
    activeSnippetIndex >= 0 && activeSnippetIndex < pageSnippets.length
      ? activeSnippetIndex
      : -1;

  useEffect(() => {
    if (!isSource) return undefined;
    const column = columnRef.current;
    if (!column) return undefined;

    const updatePageSize = () => {
      // Reserve pagination slot so page size stays stable when controls appear.
      const available = Math.max(0, column.clientHeight - 52);
      const nextSize = Math.max(1, Math.floor(available / SNIPPET_ROW_MIN_HEIGHT));
      setPageSize((current) => (current === nextSize ? current : nextSize));
    };

    updatePageSize();
    const observer = new ResizeObserver(updatePageSize);
    observer.observe(column);
    return () => observer.disconnect();
  }, [isSource]);

  useEffect(() => {
    if (controlledPage !== undefined) return;
    if (safePage !== page) setInternalPage(safePage);
  }, [controlledPage, page, safePage]);

  const setPage = (next) => {
    const clamped = Math.min(Math.max(next, 1), resolvedPageCount);
    if (controlledPage === undefined) setInternalPage(clamped);
    onPageChange?.(clamped);
    onSnippetSelect?.(0, allSnippets[(clamped - 1) * pageSize]);
    setFocusToken((token) => token + 1);
  };

  const goPrev = () => {
    if (safePage <= 1) return;
    setPage(safePage - 1);
  };

  const goNext = () => {
    if (safePage >= resolvedPageCount) return;
    setPage(safePage + 1);
  };

  const handleSnippetClick = (localIndex, snippet) => {
    setFocusToken((token) => token + 1);
    onSnippetSelect?.(localIndex, snippet);
  };

  const showPagination = resolvedPageCount > 1;

  const body = isSource ? (
    <div className={styles.splitBody}>
      <div ref={columnRef} className={styles.snippetColumn}>
        <div ref={listRef} className={styles.snippetList}>
          {pageSnippets.map((snippet, index) => (
            <button
              key={`snippet-page-${safePage}-${index}`}
              type="button"
              className={`${styles.snippetRow} ${
                index === localActiveIndex ? styles.snippetRowActive : ''
              }`.trim()}
              onClick={() => handleSnippetClick(index, snippet)}
            >
              <SnippetText parts={snippet.parts} />
            </button>
          ))}
        </div>
        <div
          className={`${styles.pagination} ${showPagination ? '' : styles.paginationHidden}`.trim()}
          aria-hidden={!showPagination}
        >
          <button
            type="button"
            className={styles.pageBtn}
            onClick={goPrev}
            disabled={!showPagination || safePage <= 1}
            aria-label="Previous page"
          >
            <Icon name="chevron-right" size={14} alt="" className={styles.pagePrevIcon} />
          </button>
          <span className={styles.pageCurrent}>{safePage}</span>
          <span className={styles.pageSep} aria-hidden="true" />
          <span className={styles.pageTotal}>{resolvedPageCount}</span>
          <button
            type="button"
            className={styles.pageBtn}
            onClick={goNext}
            disabled={!showPagination || safePage >= resolvedPageCount}
            aria-label="Next page"
          >
            <Icon name="chevron-right" size={14} alt="" />
          </button>
        </div>
      </div>
      <SourceSplitContent
        snippets={allSnippets}
        sections={sections}
        activeSnippetIndex={focusIndex}
        focusToken={focusToken}
      />
    </div>
  ) : (
    <pre className={styles.content}>{resolvedContent}</pre>
  );

  const panel = (
    <aside
      className={`${styles.panel} ${isOverlay ? styles.fullPanel : ''} ${className}`.trim()}
      role={isOverlay ? 'dialog' : undefined}
      aria-modal={isOverlay ? true : undefined}
      aria-label={isOverlay ? resolvedTitle : undefined}
    >
      <header className={styles.titleRow}>
        <h2 className={styles.title}>{resolvedTitle}</h2>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <Icon name="cancel" size={14} alt="" />
        </button>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.toolbarStart}>
          <span className={styles.date}>{date}</span>
          <button type="button" className={styles.roundBtn} onClick={onLink} aria-label="Open link">
            <Icon name="link" size={16} alt="" />
          </button>
          <button
            type="button"
            className={styles.roundBtn}
            onClick={onDownload}
            aria-label="Download"
          >
            <Icon name="download" size={16} alt="" />
          </button>
          <button type="button" className={styles.roundBtn} onClick={onInfo} aria-label="Info">
            <Icon name="info" size={16} alt="" />
          </button>
        </div>
        {variant === 'panel' ? (
          <button type="button" className={styles.expandBtn} onClick={onExpand} aria-label="Expand">
            <Icon name="open-in-new" size={20} alt="" />
          </button>
        ) : null}
      </div>

      {isSource ? null : <div className={styles.divider} aria-hidden="true" />}

      {body}
    </aside>
  );

  if (!isOverlay) return panel;

  return (
    <div className={styles.fullOverlay} onClick={onClose}>
      <div className={styles.fullShell} onClick={(event) => event.stopPropagation()}>
        {panel}
      </div>
    </div>
  );
}
