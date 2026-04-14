/**
 * Ask AI Button Component
 *
 * Renders a button in the navbar that opens the Algolia Ask AI sidepanel.
 * Includes keyboard shortcut support (Cmd/Ctrl + I).
 */

import React, { useEffect } from 'react';
import styles from './styles.module.css';

// Lazy load the sidepanel component
const AskAiSidepanel = React.lazy(() => import('@site/src/components/AskAiSidepanel'));

interface AskAiButtonProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function AskAiButton({ isOpen, setIsOpen }: AskAiButtonProps) {
  // Keyboard shortcut: Cmd/Ctrl + I
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'i') {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  return (
    <>
      <button
        className={styles.askAiButton}
        onClick={() => setIsOpen(true)}
        aria-label="Ask AI"
        title="Ask AI (Cmd/Ctrl + I)"
      >
        <span className={styles.buttonText}>Ask AI</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={styles.buttonIcon}>
          <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z"/>
          <path d="M19 14l.75 2.75L22.5 17.5l-2.75.75L19 21l-.75-2.75L15.5 17.5l2.75-.75L19 14z"/>
        </svg>
      </button>

      {isOpen && (
        <React.Suspense fallback={null}>
          <AskAiSidepanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </React.Suspense>
      )}
    </>
  );
}
