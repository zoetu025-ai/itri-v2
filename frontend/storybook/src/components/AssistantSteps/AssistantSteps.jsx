import { Badge } from '../Badge/Badge.jsx';
import { Icon } from '../Icon/Icon.jsx';
import styles from './AssistantSteps.module.css';

const DEFAULT_STEPS = [
  {
    id: '1',
    title: 'Start agent "🤖 Retrieval assistant"',
  },
  {
    id: '2',
    title:
      'Search "Joe WO work order related" (extensions: html, htm, txt, json, md)',
    actions: [{ label: 'Execution Parameters', icon: 'manage-search' }],
  },
  {
    id: '3',
    title:
      'Read 3 file snippets found for "Joe WO work order related" (extensions: html, htm, txt, json, md)',
    files: ['all.json', 'all.json'],
    actions: [{ label: 'Execution Parameters', icon: 'manage-search' }],
  },
  {
    id: '4',
    title: 'Search ""Joe"" (extensions: html, htm, txt, json, md)',
    actions: [{ label: 'Execution Parameters', icon: 'manage-search' }],
  },
  {
    id: '5',
    title:
      'Read 3 file snippets found for ""Joe"" (extensions: html, htm, txt, json, md)',
    files: ['all.json', 'all.json'],
    actions: [{ label: 'Execution Result', icon: 'manage-search-result' }],
  },
  {
    id: '6',
    title: 'Generate answer',
  },
];

export function AssistantSteps({
  steps = DEFAULT_STEPS,
  onFileClick,
  onActionClick,
  className = '',
}) {
  return (
    <ol className={`${styles.timeline} ${className}`.trim()}>
      {steps.map((step) => {
        const hasDetail = Boolean(step.files?.length || step.actions?.length);

        return (
          <li key={step.id} className={styles.step}>
            <div className={styles.header}>
              <span className={styles.marker}>
                <Icon name="star" size={20} alt="" />
              </span>
              <p className={styles.title}>{step.title}</p>
            </div>

            {hasDetail ? (
              <div className={styles.detail}>
                {step.files?.length ? (
                  <div className={styles.files}>
                    {step.files.map((file, fileIndex) => (
                      <Badge
                        key={`${step.id}-file-${fileIndex}`}
                        label={file}
                        icon="file"
                        variant="neutral"
                        onClick={onFileClick ? () => onFileClick(file, step) : undefined}
                      />
                    ))}
                  </div>
                ) : null}

                {step.actions?.map((action) => (
                  <Badge
                    key={`${step.id}-${action.label}`}
                    label={action.label}
                    icon={action.icon}
                    variant="action"
                    onClick={
                      onActionClick ? () => onActionClick(action, step) : undefined
                    }
                  />
                ))}
              </div>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
