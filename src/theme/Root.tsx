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

const AskAiSidepanel = React.lazy(() => import('@site/src/components/AskAiSidepanel'));

interface RootProps {
  children: React.ReactNode;
}

export default function Root({ children }: RootProps) {
  const [placeholder, setPlaceholder] = useState<HTMLElement | null>(null);
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);
  const [hasEverOpened, setHasEverOpened] = useState(false);

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

  return (
    <>
      {children}

      {/* Button only — portaled into the navbar */}
      {placeholder && createPortal(
        <AskAiButton isOpen={isAskAiOpen} setIsOpen={setIsAskAiOpen} />,
        placeholder
      )}

      {/* Sidepanel lives here in Root, never inside the navbar portal.
          Kept mounted once first opened so conversation state survives resize. */}
      {hasEverOpened && (
        <Suspense fallback={null}>
          <AskAiSidepanel isOpen={isAskAiOpen} onClose={() => setIsAskAiOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
