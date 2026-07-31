const STORAGE_KEY = "icourt-conversation";
export const MAX_QUESTIONS = 5;

export type ConversationItem = {
  id: string;
  title: string;
  defaultTab?: string;
};

export type ConversationState = {
  items: ConversationItem[];
};

function canUseStorage() {
  return typeof window !== "undefined" && typeof sessionStorage !== "undefined";
}

export function loadConversation(): ConversationState {
  if (!canUseStorage()) return { items: [] };

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw) as ConversationState;
    if (!Array.isArray(parsed?.items)) return { items: [] };
    return {
      items: parsed.items.slice(0, MAX_QUESTIONS).map((item, index) => ({
        id: String(item.id ?? index + 1),
        title: String(item.title ?? ""),
        defaultTab: item.defaultTab || "answer",
      })),
    };
  } catch {
    return { items: [] };
  }
}

export function saveConversation(state: ConversationState) {
  if (!canUseStorage()) return;
  sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      items: state.items.slice(0, MAX_QUESTIONS),
    }),
  );
}

export function clearConversation() {
  if (!canUseStorage()) return;
  sessionStorage.removeItem(STORAGE_KEY);
}

export function startConversation(query: string): ConversationState {
  const trimmed = query.trim();
  const state: ConversationState = {
    items: trimmed
      ? [
          {
            id: "1",
            title: trimmed,
            defaultTab: "answer",
          },
        ]
      : [],
  };
  saveConversation(state);
  return state;
}

export function appendQuestion(
  state: ConversationState,
  query: string,
): ConversationState | null {
  const trimmed = query.trim();
  if (!trimmed || state.items.length >= MAX_QUESTIONS) return null;

  const next: ConversationState = {
    items: [
      ...state.items,
      {
        id: String(state.items.length + 1),
        title: trimmed,
        defaultTab: "answer",
      },
    ],
  };
  saveConversation(next);
  return next;
}
