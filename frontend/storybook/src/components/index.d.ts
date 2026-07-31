import type { ComponentType, CSSProperties, ReactNode } from "react";

export declare const Button: ComponentType<{
  children?: ReactNode;
  variant?: string;
  onClick?: () => void;
}>;

export declare const Icon: ComponentType<{
  name: string;
  size?: number | string;
  className?: string;
  alt?: string;
}>;

export declare const IconButton: ComponentType<{
  icon: string;
  iconSize?: number | string;
  label?: string;
  onClick?: () => void;
  className?: string;
  type?: string;
}>;

export declare const SearchBar: ComponentType<{
  variant?: "default" | "compact";
  placeholder?: string;
  value?: string;
  onChange?: (event: unknown) => void;
  onAdd?: () => void;
  onAssistantClick?: () => void;
  onVoice?: () => void;
  onSubmit?: (event?: unknown) => void;
  assistantLabel?: string;
  className?: string;
}>;

export declare const Logo: ComponentType<{
  className?: string;
  size?: number;
  onClick?: () => void;
}>;

export declare const SearchPage: ComponentType<{
  title?: string;
  disclaimer?: string;
  copyright?: string;
  searchProps?: Record<string, unknown>;
}>;

export declare const Badge: ComponentType<{
  label?: string;
  icon?: string;
  variant?: "neutral" | "action";
  onClick?: () => void;
  className?: string;
}>;

export declare const ResultPage: ComponentType<{
  query?: string;
  activeTab?: string;
  onTabChange?: (id: string) => void;
  history?: Array<{ id: string; title: string; defaultTab?: string }>;
  activeHistoryId?: string;
  onHistorySelect?: (id: string) => void;
  showFileDetail?: boolean;
  showJsonPanel?: boolean;
  previousResponse?: string;
  onClearChat?: () => void;
  onLogoClick?: () => void;
  onBadgeClick?: () => void;
  onFollowUpSubmit?: (query: string) => void;
  maxQuestions?: number;
  className?: string;
}>;

export declare const Tabs: ComponentType<{
  items?: Array<{ id: string; label: string }>;
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
}>;

export declare const ClearChatButton: ComponentType<{
  onClick?: () => void;
  className?: string;
  label?: string;
}>;

export declare const NewChatConfirmDialog: ComponentType<{
  open?: boolean;
  title?: string;
  description?: string;
  onStart?: () => void;
  onCancel?: () => void;
  className?: string;
}>;

export declare const ChatHistory: ComponentType<{
  items?: Array<{ id: string; title: string }>;
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}>;

export declare const AnswerContent: ComponentType<{
  summary?: string;
  onBadgeClick?: () => void;
  className?: string;
}>;

export declare const SourcesContent: ComponentType<{
  sources?: unknown[];
  onSelect?: (source: unknown) => void;
  onSnippetClick?: (source: unknown, snippet: unknown, index: number) => void;
  className?: string;
}>;

export declare const FileDetailPanel: ComponentType<{
  title?: string;
  fields?: Array<{ icon: string; label: string; value: string }>;
  onClose?: () => void;
  className?: string;
}>;

export declare const FilePreviewPanel: ComponentType<{
  title?: string;
  date?: string;
  content?: string;
  snippets?: unknown[];
  page?: number;
  onPageChange?: (page: number) => void;
  activeSnippetIndex?: number;
  onSnippetSelect?: (index: number, snippet: unknown) => void;
  onLink?: () => void;
  onDownload?: () => void;
  onInfo?: () => void;
  onExpand?: () => void;
  onClose?: () => void;
  variant?: "panel" | "full" | "source";
  className?: string;
}>;

export declare const AssistantSteps: ComponentType<{
  steps?: unknown[];
  onFileClick?: (file: string, step: unknown) => void;
  onActionClick?: (action: unknown, step: unknown) => void;
  className?: string;
}>;

export declare const JsonPanel: ComponentType<{
  title?: string;
  content?: string;
  searchValue?: string;
  onSearchChange?: (event: unknown) => void;
  onExpand?: () => void;
  onCopy?: () => void;
  onClose?: () => void;
  defaultSearchOpen?: boolean;
  variant?: 'panel' | 'full';
  className?: string;
}>;

export declare const TextButton: ComponentType<{
  icon?: string;
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: string;
}>;

export declare const MetaDetail: ComponentType<{
  icon?: string;
  children?: ReactNode;
  className?: string;
}>;

export declare const ResponseActions: ComponentType<{
  variant?: 'full' | 'compact';
  page?: number;
  total?: number;
  onPrev?: () => void;
  onNext?: () => void;
  onThumbUp?: () => void;
  onThumbDown?: () => void;
  onTryAgain?: () => void;
  onCopy?: () => void;
  onDiagnosis?: () => void;
  className?: string;
}>;

export declare const AssistantSelector: ComponentType<{
  label?: string;
  onClick?: () => void;
  className?: string;
}>;
