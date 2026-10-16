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
    const isEditableTarget = (target: EventTarget | null) => {
      const element = target as HTMLElement | null;
      if (!element) return false;

      // The panel's own prompt textarea shouldn't count as "editable" for
      // this guard — the shortcut needs to keep closing the panel even
      // while that textarea has focus, which it does by default whenever
      // the panel is open. Only guard against unrelated fields elsewhere
      // on the page.
      if (element.closest('.ask-ai-sidepanel')) return false;

      const tagName = element.tagName;
      return (
        element.isContentEditable ||
        tagName === 'INPUT' ||
        tagName === 'TEXTAREA' ||
        tagName === 'SELECT'
      );
    };

    const handleAskAiShortcut = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() !== 'i' ||
        (!event.metaKey && !event.ctrlKey) ||
        isEditableTarget(event.target)
      ) {
        return;
      }

      event.preventDefault();
      setIsAskAiOpen((isOpen) => !isOpen);
    };

    document.addEventListener('keydown', handleAskAiShortcut);
    return () => {
      document.removeEventListener('keydown', handleAskAiShortcut);
    };
  }, []);

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
            onOpen={() => setIsAskAiOpen(true)}
            onClose={() => setIsAskAiOpen(false)}
            initialMessage={initialAskAiMessage}
          />
        </Suspense>
      )}
    </>
  );
}
