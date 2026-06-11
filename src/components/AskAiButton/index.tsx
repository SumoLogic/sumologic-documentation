/**
 * Ask AI Button Component
 *
 * Renders a button in the navbar that opens the Algolia Ask AI sidepanel.
 * Includes keyboard shortcut support (Cmd/Ctrl + I).
 *
 * The sidepanel itself is rendered in Root.tsx, outside the navbar portal,
 * so it is never unmounted by navbar re-renders on resize.
 */

import React, { useEffect } from 'react';
import styles from './styles.module.css';

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
    <button
      className={styles.askAiButton}
      onClick={() => setIsOpen(true)}
      aria-label="Ask AI"
      title="Ask AI (Cmd/Ctrl + I)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.buttonIcon}>
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
        <path d="M20 3v4"/>
        <path d="M22 5h-4"/>
        <path d="M4 17v2"/>
        <path d="M5 18H3"/>
      </svg>
      <span className={styles.buttonText}>Ask AI</span>
    </button>
  );
}
