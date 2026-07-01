/**
 * Root component wrapper for Docusaurus
 *
 * Renders the Ask AI button into the navbar placeholder via a portal,
 * and renders AskAiSidepanel directly here — outside the navbar portal —
 * so the sidepanel is never unmounted by navbar re-renders on resize.
 */

import React, { useEffect, useState, Suspense } from 'react';
import { createPortal } from 'react-dom';
import AskAiButton from '@site/src/components/AskAiButton';

const AskAiSidepanel = React.lazy(
  () => import('@site/src/components/AskAiSidepanel')
);

interface RootProps {
  children: React.ReactNode;
}

interface AskAiInitialMessage {
  query: string;
}

export default function Root({ children }: RootProps) {
  const [placeholder, setPlaceholder] = useState<HTMLElement | null>(null);
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);
  const [hasEverOpened, setHasEverOpened] = useState(false);
  const [initialAskAiMessage, setInitialAskAiMessage] =
    useState<AskAiInitialMessage | null>(null);

  useEffect(() => {
    if (isAskAiOpen) setHasEverOpened(true);
  }, [isAskAiOpen]);

  useEffect(() => {
    const findPlaceholder = () => {
      // Only update if our current placeholder has been removed from the DOM
      if (placeholder && document.body.contains(placeholder)) {
        return;
      }
      const el = document.getElementById('navbar-ask-ai-button');
      if (el) {
        setPlaceholder(el);
      }
    };

    findPlaceholder();
    const interval = setInterval(findPlaceholder, 500);

    return () => clearInterval(interval);
  }, [placeholder]);

  useEffect(() => {
    const closeDocSearchModal = () => {
      const closeButton = document.querySelector<HTMLButtonElement>(
        [
          '.DocSearch-Container button[aria-label="Close"]',
          '.DocSearch-Container button[title="Close"]',
          '.DocSearch-Container .DocSearch-Cancel',
        ].join(',')
      );
      closeButton?.click();

      document.dispatchEvent(
        new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          code: 'Escape',
          key: 'Escape',
        })
      );

      requestAnimationFrame(() => {
        document.querySelectorAll('.DocSearch-Container').forEach((modal) => {
          modal.remove();
        });
        document.body.classList.remove('DocSearch--active');
      });
    };

    const openAskAiThread = (query: string) => {
      const trimmedQuery = query.trim();
      if (!trimmedQuery) return;

      setInitialAskAiMessage({ query: trimmedQuery });
      setIsAskAiOpen(true);
      closeDocSearchModal();
    };

    const getModalQuery = () => {
      return (
        document
          .querySelector<HTMLInputElement>(
            '.DocSearch-Container .DocSearch-Input'
          )
          ?.value.trim() || ''
      );
    };

    const isAskAiAssistantOption = (element: HTMLElement) => {
      const text = element.textContent?.replace(/\s+/g, ' ').trim() || '';
      return /^Ask AI(?: Assistant)?\b/i.test(text);
    };

    const routeAskAiOptionClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest('.DocSearch-Container .DocSearch-Dropdown')) return;

      const option = target.closest<HTMLElement>(
        [
          '.DocSearch-Hit',
          '.DocSearch-Menu-item',
          'button',
          'a',
          '[role="button"]',
          '[role="option"]',
        ].join(',')
      );
      if (!option || !isAskAiAssistantOption(option)) return;

      const query = getModalQuery();
      if (!query) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      openAskAiThread(query);
    };

    const routeAskAiOptionEnter = (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return;
      const input = event.target as HTMLInputElement | null;
      if (!input?.closest('.DocSearch-Container .DocSearch-Input')) return;

      const activeId = input.getAttribute('aria-activedescendant');
      const activeOption = activeId
        ? document.getElementById(activeId)
        : document.querySelector<HTMLElement>(
            [
              '.DocSearch-Dropdown [aria-selected="true"]',
              '.DocSearch-Dropdown [aria-current="true"]',
              '.DocSearch-Dropdown .DocSearch-Hit[aria-selected="true"]',
              '.DocSearch-Dropdown .DocSearch-Hit[aria-current="true"]',
            ].join(',')
          );
      if (!activeOption || !isAskAiAssistantOption(activeOption)) return;

      const query = getModalQuery();
      if (!query) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      openAskAiThread(query);
    };

    document.addEventListener('click', routeAskAiOptionClick, true);
    document.addEventListener('keydown', routeAskAiOptionEnter, true);

    return () => {
      document.removeEventListener('click', routeAskAiOptionClick, true);
      document.removeEventListener('keydown', routeAskAiOptionEnter, true);
    };
  }, []);

  return (
    <>
      {children}

      {/* Button only — portaled into the navbar */}
      {placeholder &&
        createPortal(
          <AskAiButton isOpen={isAskAiOpen} setIsOpen={setIsAskAiOpen} />,
          placeholder
        )}

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
