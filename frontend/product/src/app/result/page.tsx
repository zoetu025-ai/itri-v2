"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ResultPage } from "storybook";
import {
  MAX_QUESTIONS,
  appendQuestion,
  clearConversation,
  loadConversation,
  type ConversationItem,
} from "../../lib/conversation";

export default function ResultRoute() {
  const router = useRouter();
  const [history, setHistory] = useState<ConversationItem[]>([]);
  const [activeHistoryId, setActiveHistoryId] = useState<string | undefined>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const conversation = loadConversation();
    if (conversation.items.length === 0) {
      router.replace("/");
      return;
    }
    setHistory(conversation.items);
    setActiveHistoryId(conversation.items[conversation.items.length - 1]?.id);
    setReady(true);
  }, [router]);

  const goHome = () => {
    clearConversation();
    router.push("/");
  };

  const handleFollowUpSubmit = (query: string) => {
    setHistory((current) => {
      const next = appendQuestion({ items: current }, query);
      if (!next) return current;
      const latest = next.items[next.items.length - 1];
      if (latest) setActiveHistoryId(latest.id);
      return next.items;
    });
  };

  if (!ready) return null;

  return (
    <ResultPage
      history={history}
      activeHistoryId={activeHistoryId}
      onHistorySelect={setActiveHistoryId}
      onFollowUpSubmit={handleFollowUpSubmit}
      maxQuestions={MAX_QUESTIONS}
      onLogoClick={goHome}
      onClearChat={goHome}
    />
  );
}
