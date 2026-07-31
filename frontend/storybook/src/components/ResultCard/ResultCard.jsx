import { useState } from 'react';
import { AnswerContent } from '../AnswerContent/AnswerContent.jsx';
import { AssistantSteps } from '../AssistantSteps/AssistantSteps.jsx';
import { SourcesContent } from '../SourcesContent/SourcesContent.jsx';
import { Tabs } from '../Tabs/Tabs.jsx';
import styles from './ResultCard.module.css';

const DEFAULT_TABS = [
  { id: 'answer', label: 'Answer' },
  { id: 'sources', label: 'Sources・15' },
  { id: 'steps', label: 'Assistant Steps' },
];

export function ResultCard({
  id,
  query,
  defaultTab = 'answer',
  activeTab: controlledTab,
  onTabChange,
  onBadgeClick,
  onStepFileClick,
  onStepActionClick,
  onSourceSelect,
  className = '',
  cardRef,
}) {
  const [internalTab, setInternalTab] = useState(defaultTab);
  const activeTab = controlledTab ?? internalTab;

  const handleTabChange = (tabId) => {
    if (controlledTab === undefined) setInternalTab(tabId);
    onTabChange?.(id, tabId);
  };

  return (
    <section
      id={`result-card-${id}`}
      ref={cardRef}
      className={`${styles.card} ${className}`.trim()}
    >
      <h2 className={styles.query}>{query}</h2>
      <Tabs
        items={DEFAULT_TABS}
        activeId={activeTab}
        onChange={handleTabChange}
      />

      {activeTab === 'answer' ? (
        <AnswerContent onBadgeClick={() => onBadgeClick?.(id)} />
      ) : null}
      {activeTab === 'sources' ? (
        <SourcesContent onSelect={(source) => onSourceSelect?.(id, source)} />
      ) : null}
      {activeTab === 'steps' ? (
        <AssistantSteps
          onFileClick={(file) => onStepFileClick?.(id, file)}
          onActionClick={(action) => onStepActionClick?.(id, action)}
        />
      ) : null}
    </section>
  );
}
