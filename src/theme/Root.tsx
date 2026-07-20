/**
 * Root component wrapper for Docusaurus
 *
 * Renders AskAiSidepanel directly here so it is never unmounted by
 * navbar re-renders on resize.
 */

import React, { useEffect, useState, Suspense } from 'react';

const AskAiSidepanel = React.lazy(
  () => import('@site/src/components/AskAiSidepanel')
);

interface RootProps {
  children: React.ReactNode;
}

interface AskAiInitialMessage {
  query: string;
  suggestedQuestionId?: string;
  messageId?: string;
}

export default function Root({ children }: RootProps) {
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);
  const [hasEverOpened, setHasEverOpened] = useState(false);
  const [initialAskAiMessage, setInitialAskAiMessage] =
    useState<AskAiInitialMessage | null>(null);

  useEffect(() => {
    if (isAskAiOpen) setHasEverOpened(true);
  }, [isAskAiOpen]);

  useEffect(() => {
    const handleAskAiRoute = (event: Event) => {
      const detail = (event as CustomEvent<AskAiInitialMessage>).detail;
      const trimmedQuery = detail?.query?.trim();
      if (!trimmedQuery) return;

      setInitialAskAiMessage({
        query: trimmedQuery,
        suggestedQuestionId: detail.suggestedQuestionId,
        messageId: detail.messageId,
      });
      setIsAskAiOpen(true);
    };

    document.addEventListener('ask-ai-sidepanel-route', handleAskAiRoute);

    return () => {
      document.removeEventListener('ask-ai-sidepanel-route', handleAskAiRoute);
    };
  }, []);

  return (
    <>
      {children}

      {/* Sidepanel lives here in Root, never inside the navbar portal.
          Kept mounted once first opened so conversation state survives resize. */}
      {hasEverOpened && (
        <Suspense fallback={null}>
          <AskAiSidepanel
            isOpen={isAskAiOpen}
            onClose={() => setIsAskAiOpen(false)}
            initialMessage={initialAskAiMessage}
          />
        </Suspense>
      )}
    </>
  );
}
