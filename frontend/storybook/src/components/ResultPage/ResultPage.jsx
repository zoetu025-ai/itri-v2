import { useEffect, useRef, useState } from 'react';
import { ChatHistory } from '../ChatHistory/ChatHistory.jsx';
import { ClearChatButton } from '../ClearChatButton/ClearChatButton.jsx';
import { FileDetailPanel, buildFileDetailFields } from '../FileDetailPanel/FileDetailPanel.jsx';
import { FilePreviewPanel } from '../FilePreviewPanel/FilePreviewPanel.jsx';
import { JsonPanel } from '../JsonPanel/JsonPanel.jsx';
import { Logo } from '../Logo/Logo.jsx';
import { NewChatConfirmDialog } from '../NewChatConfirmDialog/NewChatConfirmDialog.jsx';
import { ResultCard } from '../ResultCard/ResultCard.jsx';
import { SearchBar } from '../SearchBar/SearchBar.jsx';
import { assetPath } from '../../lib/assetPath.js';
import styles from './ResultPage.module.css';

const DEFAULT_HISTORY = [
  {
    id: '1',
    title:
      'My lease ended and I cleaned the place spotlessly, but my landlord is dodging my texts and refusing to give my 2-month deposit back. What can I actually do about this?',
    defaultTab: 'answer',
  },
  {
    id: '2',
    title:
      "Can I just sue him at this point? I heard about sending a demand letter or going to court mediation, but honestly I have no idea which one I'm supposed to do first.",
    defaultTab: 'answer',
  },
  {
    id: '3',
    title:
      'If I go with mediation, do I just show up at any local court? What papers do I need to bring, and is it going to cost me a lot?',
    defaultTab: 'sources',
  },
  {
    id: '4',
    title:
      'Oh, and I just realized—I checked my indoor camera and saw he actually let himself into my room to show new buyers around a few days before my lease even ended! Can I get him in trouble for that too?',
    defaultTab: 'sources',
  },
  {
    id: '5',
    title:
      'What if we set up a mediation date and he just ghosted the court? Can the judge just force him to pay me back right then and there?',
    defaultTab: 'sources',
  },
];

export function ResultPage({
  history = DEFAULT_HISTORY,
  activeHistoryId: controlledHistoryId = undefined,
  onHistorySelect = undefined,
  showFileDetail: controlledFileDetail = undefined,
  showJsonPanel: controlledJsonPanel = undefined,
  onClearChat = undefined,
  onLogoClick = undefined,
  onBadgeClick = undefined,
  onFollowUpSubmit = undefined,
  maxQuestions = 5,
  className = '',
}) {
  const [internalHistoryId, setInternalHistoryId] = useState(
    controlledHistoryId || history[0]?.id || '1',
  );
  const [cardTabs, setCardTabs] = useState(() =>
    Object.fromEntries(history.map((item) => [item.id, item.defaultTab || 'answer'])),
  );
  const [followUpQuery, setFollowUpQuery] = useState('');
  const [fileDetailOpen, setFileDetailOpen] = useState(
    Boolean(controlledFileDetail),
  );
  const [filePreviewOpen, setFilePreviewOpen] = useState(false);
  const [filePreviewFullOpen, setFilePreviewFullOpen] = useState(false);
  const [sourcePreviewOpen, setSourcePreviewOpen] = useState(false);
  const [activeSnippetIndex, setActiveSnippetIndex] = useState(0);
  const [jsonPanelOpen, setJsonPanelOpen] = useState(
    controlledJsonPanel === true,
  );
  const [jsonFullOpen, setJsonFullOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newChatConfirmOpen, setNewChatConfirmOpen] = useState(false);
  const cardRefs = useRef({});
  const previousHistoryLength = useRef(history.length);

  const activeHistoryId = controlledHistoryId ?? internalHistoryId;
  const activeTab = cardTabs[activeHistoryId] || 'answer';

  useEffect(() => {
    if (controlledHistoryId !== undefined) {
      setInternalHistoryId(controlledHistoryId);
    }
  }, [controlledHistoryId]);

  useEffect(() => {
    if (controlledFileDetail !== undefined) {
      setFileDetailOpen(Boolean(controlledFileDetail));
    }
  }, [controlledFileDetail]);

  useEffect(() => {
    setCardTabs((prev) => {
      const next = { ...prev };
      let changed = false;
      history.forEach((item) => {
        if (next[item.id] === undefined) {
          next[item.id] = item.defaultTab || 'answer';
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [history]);

  const atQuestionLimit = history.length >= maxQuestions;

  const scrollToCard = (id) => {
    const node = cardRefs.current[id];
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (history.length > previousHistoryLength.current) {
      const latest = history[history.length - 1];
      if (latest) {
        if (controlledHistoryId === undefined) {
          setInternalHistoryId(latest.id);
        }
        requestAnimationFrame(() => scrollToCard(latest.id));
      }
    }
    previousHistoryLength.current = history.length;
  }, [history, controlledHistoryId]);

  const handleHistorySelect = (id) => {
    if (controlledHistoryId === undefined) setInternalHistoryId(id);
    if (controlledFileDetail === undefined) {
      setFileDetailOpen(false);
      setFilePreviewOpen(false);
      setFilePreviewFullOpen(false);
      setSourcePreviewOpen(false);
      setJsonPanelOpen(false);
      setJsonFullOpen(false);
      setSelectedFile(null);
    }
    onHistorySelect?.(id);
    requestAnimationFrame(() => scrollToCard(id));
  };

  const handleTabChange = (cardId, tabId) => {
    setCardTabs((prev) => ({ ...prev, [cardId]: tabId }));
    if (controlledHistoryId === undefined) setInternalHistoryId(cardId);

    if (controlledFileDetail === undefined) {
      setFileDetailOpen(false);
      setFilePreviewOpen(false);
      setFilePreviewFullOpen(false);
      setSourcePreviewOpen(false);
      setJsonPanelOpen(false);
      setJsonFullOpen(false);
      setSelectedFile(null);
    }
  };

  const handleBadgeClick = (cardId) => {
    if (controlledHistoryId === undefined) setInternalHistoryId(cardId);
    setSelectedFile({ name: 'all.json' });
    setFileDetailOpen(false);
    setJsonPanelOpen(false);
    setJsonFullOpen(false);
    setFilePreviewFullOpen(false);
    setSourcePreviewOpen(false);
    setFilePreviewOpen(true);
    onBadgeClick?.(cardId);
  };

  const handleStepFileClick = (cardId, file) => {
    if (controlledHistoryId === undefined) setInternalHistoryId(cardId);
    setSelectedFile({ name: file });
    setFileDetailOpen(false);
    setJsonPanelOpen(false);
    setJsonFullOpen(false);
    setFilePreviewFullOpen(false);
    setSourcePreviewOpen(false);
    setFilePreviewOpen(true);
    onBadgeClick?.(cardId);
  };

  const handleStepActionClick = (cardId) => {
    if (controlledHistoryId === undefined) setInternalHistoryId(cardId);
    setSelectedFile(null);
    setFileDetailOpen(false);
    setFilePreviewOpen(false);
    setFilePreviewFullOpen(false);
    setSourcePreviewOpen(false);
    setJsonFullOpen(false);
    setJsonPanelOpen(true);
    onBadgeClick?.(cardId);
  };

  const handleSourceSelect = (cardId, source) => {
    if (controlledHistoryId === undefined) setInternalHistoryId(cardId);
    setSelectedFile(source);
    setFilePreviewOpen(false);
    setFilePreviewFullOpen(false);
    setSourcePreviewOpen(false);
    setJsonPanelOpen(false);
    setJsonFullOpen(false);
    setFileDetailOpen(true);
    onBadgeClick?.(cardId);
  };

  const handleSourceSnippetClick = (cardId, source, _snippet, index = 0) => {
    if (controlledHistoryId === undefined) setInternalHistoryId(cardId);
    setSelectedFile(source);
    setActiveSnippetIndex(index);
    setFileDetailOpen(false);
    setFilePreviewOpen(false);
    setFilePreviewFullOpen(false);
    setJsonPanelOpen(false);
    setJsonFullOpen(false);
    setSourcePreviewOpen(true);
    onBadgeClick?.(cardId);
  };

  const handleFileInfoClick = () => {
    setFilePreviewOpen(false);
    setFilePreviewFullOpen(false);
    setSourcePreviewOpen(false);
    setJsonPanelOpen(false);
    setJsonFullOpen(false);
    setFileDetailOpen(true);
  };

  const handleCloseFileDetail = () => {
    setFileDetailOpen(false);
    setSelectedFile(null);
  };

  const handleCloseFilePreview = () => {
    setFilePreviewOpen(false);
    setFilePreviewFullOpen(false);
    setSourcePreviewOpen(false);
    setSelectedFile(null);
  };

  const handleExpandFilePreview = () => {
    setFilePreviewFullOpen(true);
  };

  const handleCloseJsonPanel = () => {
    setJsonPanelOpen(false);
    setJsonFullOpen(false);
  };

  const handleExpandJsonPanel = () => {
    setJsonFullOpen(true);
  };

  const handleFollowUpSubmit = () => {
    const trimmed = followUpQuery.trim();
    if (!trimmed || atQuestionLimit) return;
    onFollowUpSubmit?.(trimmed);
    setFollowUpQuery('');
  };

  const showJson = jsonPanelOpen;

  const sidePanel = filePreviewOpen ? (
    <FilePreviewPanel
      title={selectedFile?.name ?? 'all.json'}
      date={selectedFile?.date}
      onInfo={handleFileInfoClick}
      onExpand={handleExpandFilePreview}
      onClose={handleCloseFilePreview}
    />
  ) : fileDetailOpen ? (
    <FileDetailPanel
      title={selectedFile?.name ?? 'all.json'}
      fields={selectedFile ? buildFileDetailFields(selectedFile) : undefined}
      onClose={handleCloseFileDetail}
    />
  ) : showJson ? (
    <JsonPanel onExpand={handleExpandJsonPanel} onClose={handleCloseJsonPanel} />
  ) : null;

  return (
    <div className={`${styles.page} ${className}`.trim()}>
      <div className={styles.background} aria-hidden="true">
        <img
          src={assetPath('/assets/images/background-light.png')}
          alt=""
          className={styles.backgroundImage}
        />
        <div className={styles.backgroundGradient} />
      </div>

      <header className={styles.topBar}>
        <Logo className={styles.logo} size={60} onClick={onLogoClick} />
        <ClearChatButton
          className={styles.clearChat}
          onClick={() => setNewChatConfirmOpen(true)}
        />
      </header>
      <div className={styles.topBarSpacer} aria-hidden="true" />

      <NewChatConfirmDialog
        open={newChatConfirmOpen}
        onCancel={() => setNewChatConfirmOpen(false)}
        onStart={() => {
          setNewChatConfirmOpen(false);
          onClearChat?.();
        }}
      />

      {jsonFullOpen ? (
        <JsonPanel
          variant="full"
          onClose={() => setJsonFullOpen(false)}
        />
      ) : null}

      {filePreviewFullOpen ? (
        <FilePreviewPanel
          variant="full"
          date={selectedFile?.date}
          onInfo={handleFileInfoClick}
          onClose={() => setFilePreviewFullOpen(false)}
        />
      ) : null}

      {sourcePreviewOpen ? (
        <FilePreviewPanel
          variant="source"
          date={selectedFile?.date}
          activeSnippetIndex={activeSnippetIndex}
          onSnippetSelect={(index) => setActiveSnippetIndex(index)}
          onInfo={handleFileInfoClick}
          onClose={() => setSourcePreviewOpen(false)}
        />
      ) : null}

      <div className={styles.layout}>
        <aside className={styles.historyColumn}>
          <ChatHistory
            items={history}
            activeId={activeHistoryId}
            onSelect={handleHistorySelect}
            className={styles.history}
          />
        </aside>

        <div className={styles.mainColumn}>
          {history.map((item) => (
            <ResultCard
              key={item.id}
              id={item.id}
              query={item.title}
              defaultTab={item.defaultTab || 'answer'}
              activeTab={cardTabs[item.id]}
              onTabChange={handleTabChange}
              onBadgeClick={handleBadgeClick}
              onStepFileClick={handleStepFileClick}
              onStepActionClick={handleStepActionClick}
              onSourceSelect={handleSourceSelect}
              onSourceSnippetClick={handleSourceSnippetClick}
              cardRef={(node) => {
                cardRefs.current[item.id] = node;
              }}
            />
          ))}
        </div>
      </div>

      {sidePanel ? (
        <div
          className={`${styles.sideColumn} ${styles.sideColumnStretch}`.trim()}
        >
          {sidePanel}
        </div>
      ) : null}

      <div className={styles.footerDock}>
        <div className={styles.footerSearch}>
          <SearchBar
            variant="compact"
            placeholder={
              atQuestionLimit
                ? 'Maximum of 5 questions reached'
                : 'Enter your question'
            }
            value={followUpQuery}
            onChange={(event) => setFollowUpQuery(event.target.value)}
            onSubmit={handleFollowUpSubmit}
            className={styles.searchBar}
          />
        </div>
      </div>
    </div>
  );
}
