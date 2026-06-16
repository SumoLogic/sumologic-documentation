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
    const openAskAiFromSearch = (query: string) => {
      const trimmedQuery = query.trim();
      if (!trimmedQuery) return;

      setInitialAskAiMessage({ query: trimmedQuery });
      setIsAskAiOpen(true);

      const closeButton = document.querySelector<HTMLButtonElement>(
        [
          '.DocSearch-Container button[aria-label="Close"]',
          '.DocSearch-Container button[title="Close"]',
          '.DocSearch-Container .DocSearch-Cancel',
        ].join(',')
      );
      closeButton?.click();
    };

    const getDocSearchQuery = () => {
      return (
        document
          .querySelector<HTMLInputElement>(
            '.DocSearch-Container .DocSearch-Input'
          )
          ?.value.trim() || ''
      );
    };

    const routeModalAskAiClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const container = target?.closest('.DocSearch-Container');
      if (!target || !container) return;

      if (target.closest('.ask-ai-search-sidepanel-button')) {
        const query = getDocSearchQuery();
        if (!query) return;

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        openAskAiFromSearch(query);
        return;
      }

      const clickable = target.closest<HTMLElement>(
        [
          'button',
          'a',
          '[role="button"]',
          '.DocSearch-Hit',
          '.DocSearch-Menu-item',
        ].join(',')
      );
      if (!clickable) return;

      const actionText = [
        clickable.textContent,
        clickable.getAttribute('aria-label'),
        clickable.getAttribute('title'),
        clickable.getAttribute('class'),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      if (!actionText.includes('ask ai')) return;

      const query = getDocSearchQuery();
      if (!query) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      openAskAiFromSearch(query);
    };

    const updateSearchHandoff = () => {
      const container = document.querySelector('.DocSearch-Container');
      const dropdown = container?.querySelector('.DocSearch-Dropdown');
      const input =
        container?.querySelector<HTMLInputElement>('.DocSearch-Input');

      if (!container || !dropdown || !input) return;

      const query = input.value.trim();
      const existingButton = dropdown.querySelector<HTMLButtonElement>(
        '.ask-ai-search-sidepanel-button'
      );
      const nativeAskAiOptions = dropdown.querySelectorAll<HTMLElement>(
        [
          '.DocSearch-Hit',
          '.DocSearch-Menu-item',
          'button',
          'a',
          '[role="button"]',
          '[role="option"]',
        ].join(',')
      );

      nativeAskAiOptions.forEach((option) => {
        if (option.closest('.ask-ai-search-sidepanel-button')) return;

        const text = option.textContent?.replace(/\s+/g, ' ').trim() || '';
        if (/^Ask AI\s*:/i.test(text)) {
          option.classList.add('ask-ai-native-modal-option-hidden');
        }
      });

      if (!query) {
        existingButton?.remove();
        return;
      }

      const button = existingButton || document.createElement('button');

      if (!existingButton) {
        button.type = 'button';
        button.className = 'ask-ai-search-sidepanel-button';
        button.innerHTML = `
          <span class="ask-ai-search-sidepanel-button-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path>
            </svg>
          </span>
          <span class="ask-ai-search-sidepanel-button-label">Ask AI in sidepanel</span>
          <span class="ask-ai-search-sidepanel-button-query"></span>
        `;
        button.onclick = () => openAskAiFromSearch(input.value);
      }

      if (button.dataset.query === query) {
        return;
      }

      button.dataset.query = query;
      button.setAttribute('aria-label', `Ask AI in sidepanel for ${query}`);

      const queryEl = button.querySelector(
        '.ask-ai-search-sidepanel-button-query'
      );
      if (queryEl) {
        queryEl.textContent = query;
      }

      if (!existingButton) {
        dropdown.prepend(button);
      }
    };

    const routeSearchEnterToAskAi = (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return;
      const target = event.target as HTMLElement | null;
      if (!target?.closest('.DocSearch-Container .DocSearch-Input')) return;

      const query = getDocSearchQuery();
      if (!query) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      openAskAiFromSearch(query);
    };

    document.addEventListener('input', updateSearchHandoff, true);
    document.addEventListener('click', routeModalAskAiClick, true);
    document.addEventListener('keydown', routeSearchEnterToAskAi, true);
    const observer = new MutationObserver(updateSearchHandoff);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('input', updateSearchHandoff, true);
      document.removeEventListener('click', routeModalAskAiClick, true);
      document.removeEventListener('keydown', routeSearchEnterToAskAi, true);
      observer.disconnect();
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
