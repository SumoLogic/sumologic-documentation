/**
 * Root component wrapper for Docusaurus
 *
 * This component wraps the entire app and is rendered WITHIN Docusaurus's
 * context providers, so we can safely use hooks like useColorMode here.
 *
 * We use this to mount the Ask AI button to the navbar placeholder.
 */

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import AskAiButton from '@site/src/components/AskAiButton';

interface RootProps {
  children: React.ReactNode;
}

export default function Root({ children }: RootProps) {
  const [placeholder, setPlaceholder] = useState<HTMLElement | null>(null);
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  useEffect(() => {
    // Find and monitor the navbar placeholder
    const findPlaceholder = () => {
      const el = document.getElementById('navbar-ask-ai-button');
      if (el && el !== placeholder) {
        setPlaceholder(el);
      }
    };

    // Initial check
    findPlaceholder();

    // Set up interval to check if placeholder exists (handles navbar re-renders)
    const interval = setInterval(findPlaceholder, 500);

    // Also check on window resize
    window.addEventListener('resize', findPlaceholder);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', findPlaceholder);
    };
  }, [placeholder]);

  return (
    <>
      {children}
      {placeholder && createPortal(
        <AskAiButton
          isOpen={isAskAiOpen}
          setIsOpen={setIsAskAiOpen}
        />,
        placeholder
      )}
    </>
  );
}
