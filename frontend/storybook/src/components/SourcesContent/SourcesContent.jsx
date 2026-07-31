import { Icon } from '../Icon/Icon.jsx';
import { ResponseActions } from '../ResponseActions/ResponseActions.jsx';
import styles from './SourcesContent.module.css';

const DEFAULT_SNIPPETS = [
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
];

const DEFAULT_SOURCES = [
  {
    id: '1',
    index: 1,
    name: 'all.json',
    date: '2026-04-29',
    path: '/ data / 336491 / doc-2.json',
    snippets: DEFAULT_SNIPPETS,
    showActions: true,
  },
  {
    id: '2',
    index: 2,
    name: 'all.json',
    date: '2026-04-29',
    path: '/ data / 336491 / doc-2.json',
    snippets: DEFAULT_SNIPPETS.slice(0, 3),
    showActions: false,
  },
  {
    id: '3',
    index: 3,
    name: 'all.json',
    date: '2026-04-29',
    path: '/ data / 336491 / doc-2.json',
    snippets: DEFAULT_SNIPPETS,
    showActions: true,
  },
];

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

export function SourcesContent({ sources = DEFAULT_SOURCES, onSelect, className = '' }) {
  return (
    <div className={`${styles.content} ${className}`.trim()}>
      {sources.map((source) => (
        <article key={source.id} className={styles.source}>
          <div className={styles.header}>
            <h3 className={styles.title}>
              <span className={styles.index}>{source.index}.</span> {source.name}
            </h3>
            <div className={styles.meta}>
              <span className={styles.date}>{source.date}</span>
              <button type="button" className={styles.iconBtn} aria-label="Open link">
                <Icon name="link" size={16} alt="" />
              </button>
              <button type="button" className={styles.iconBtn} aria-label="Download">
                <Icon name="download" size={16} alt="" />
              </button>
              <button
                type="button"
                className={styles.iconBtn}
                aria-label="Info"
                onClick={(event) => {
                  event.stopPropagation();
                  onSelect?.(source);
                }}
              >
                <Icon name="info" size={16} alt="" />
              </button>
            </div>
          </div>

          <p className={styles.path}>{source.path}</p>

          <div className={styles.snippets}>
            {source.snippets.map((snippet, index) => (
              <div
                key={`${source.id}-snippet-${index}`}
                className={index % 2 === 0 ? styles.rowOdd : styles.rowEven}
              >
                <SnippetText parts={snippet.parts} />
              </div>
            ))}
          </div>

          {source.showActions ? (
            <ResponseActions variant="compact" />
          ) : null}

          <div className={styles.divider} role="separator" />
        </article>
      ))}
    </div>
  );
}
