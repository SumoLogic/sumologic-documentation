import React, { useState } from 'react';
import styles from './styles.module.css';

// Derive the mirror URL for the current page.
// /help/docs/foo/bar → /help/llm/docs/foo/bar.md
function getMirrorUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^(\/help\/docs\/.+?)\/?$/);
  if (!match) return null;
  return `${window.location.origin}${match[1]}.md`;
}

async function getMarkdownContent(): Promise<string> {
  const mirrorUrl = getMirrorUrl();
  if (mirrorUrl) {
    try {
      const res = await fetch(mirrorUrl);
      if (res.ok) return await res.text();
    } catch { /* fall through */ }
  }
  // DOM fallback
  const el = document.querySelector('article') || document.body;
  return (el as HTMLElement).innerText.replace(/\s+/g, ' ').trim().slice(0, 4000);
}

function getPrompt(): string {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  return encodeURIComponent(`Read from ${url} so I can ask questions about its contents`);
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export default function AITools(): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const text = await getMarkdownContent();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard not available */ }
  };

  return (
    <div className={styles.aiTools}>
      <div className={styles.header}>AI Tools</div>
      <button className={styles.action} onClick={handleCopy}>
        <CopyIcon />
        {copied ? 'Copied!' : 'Copy as Markdown'}
      </button>
      <a className={styles.action} href={`https://claude.ai/new?q=${getPrompt()}`} target="_blank" rel="noopener noreferrer">
        <img src="https://cdn.simpleicons.org/claude/D4966B" width="14" height="14" alt="" aria-hidden="true" />
        Ask Claude
      </a>
      <a className={styles.action} href={`https://chatgpt.com/?q=${getPrompt()}`} target="_blank" rel="noopener noreferrer">
        <img src="https://cdn.simpleicons.org/openai/10A37F" width="14" height="14" alt="" aria-hidden="true" />
        Ask ChatGPT
      </a>
    </div>
  );
}
