import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import '@docsearch/css/dist/sidepanel.css';
import './styles.css';

interface AskAiSidepanelProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: { query: string } | null;
}

export default function AskAiSidepanel({
  isOpen,
  onClose,
  initialMessage,
}: AskAiSidepanelProps) {
  const { siteConfig } = useDocusaurusContext();
  const [SidepanelComponent, setSidepanelComponent] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [headerActionsEl, setHeaderActionsEl] = useState<HTMLElement | null>(
    null
  );
  const isResizingRef = useRef(false);

  // Lazy load the Algolia Sidepanel component
  useEffect(() => {
    if (isOpen && !SidepanelComponent) {
      import('@docsearch/react/sidepanel').then((module) => {
        setSidepanelComponent(() => module.Sidepanel);
      });
    }
  }, [isOpen, SidepanelComponent]);

  // Track resize so we can suppress Algolia's resize-triggered onClose
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      isResizingRef.current = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        isResizingRef.current = false;
      }, 500);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(timer);
    };
  }, []);

  // Reset expanded state when panel closes
  useEffect(() => {
    if (!isOpen) {
      setIsExpanded(false);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent panel from disappearing on window resize
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      const container = document.querySelector(
        '.DocSearch-Sidepanel-Container'
      );
      if (container && !container.classList.contains('is-open')) {
        container.classList.add('is-open');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Hook into existing expand button
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const button = target.closest('button');

      if (!button) return;

      const headerButtons = Array.from(
        document.querySelectorAll('.DocSearch-Sidepanel-Header button')
      );

      if (!headerButtons.includes(button)) return;

      const ariaLabel = button.getAttribute('aria-label')?.toLowerCase() || '';

      if (ariaLabel.includes('close')) return;
      if (!button.classList.contains('DocSearch-Sidepanel-Action-expand')) {
        return;
      }

      setIsExpanded((prev) => !prev);
    };

    const checkInterval = setInterval(() => {
      const header = document.querySelector('.DocSearch-Sidepanel-Header');
      if (header) {
        header.addEventListener('click', handleClick);
        clearInterval(checkInterval);
      }
    }, 100);

    return () => {
      const header = document.querySelector('.DocSearch-Sidepanel-Header');
      if (header) {
        header.removeEventListener('click', handleClick);
      }
      clearInterval(checkInterval);
    };
  }, [isOpen]);

  // Add visible shortcuts for Algolia actions hidden in the overflow menu.
  useEffect(() => {
    if (!isOpen) {
      setHeaderActionsEl(null);
      return;
    }

    const checkInterval = setInterval(() => {
      const headerRight = document.querySelector(
        '.DocSearch-Sidepanel-Header--right'
      ) as HTMLElement | null;
      if (headerRight) {
        setHeaderActionsEl(headerRight);
        clearInterval(checkInterval);
      }
    }, 100);

    return () => {
      clearInterval(checkInterval);
      setHeaderActionsEl(null);
    };
  }, [isOpen]);

  const triggerHeaderAction = React.useCallback((title: string) => {
    const buttons = Array.from(
      document.querySelectorAll<HTMLButtonElement>(
        '.DocSearch-Sidepanel-Header button'
      )
    );
    const button = buttons.find(
      (item) =>
        item.getAttribute('title') === title &&
        !item.classList.contains('ask-ai-shortcut-button')
    );
    button?.click();
  }, []);

  const copyTextWithTextarea = React.useCallback((text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, text.length);

    try {
      return document.execCommand('copy');
    } finally {
      document.body.removeChild(textarea);
    }
  }, []);

  const copyTextToClipboard = React.useCallback(
    (text: string) => {
      const copiedWithTextarea = copyTextWithTextarea(text);

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).catch(() => {
          if (!copiedWithTextarea) {
            copyTextWithTextarea(text);
          }
        });
      }
    },
    [copyTextWithTextarea]
  );

  const showCopiedState = React.useCallback((btn: HTMLButtonElement) => {
    btn.classList.add('DocSearch-AskAiScreen-CopyButton--copied');
    btn.disabled = true;
    setTimeout(() => {
      btn.classList.remove('DocSearch-AskAiScreen-CopyButton--copied');
      btn.disabled = false;
    }, 1500);
  }, []);

  const getAssistantMessageText = React.useCallback((btn: HTMLElement) => {
    const response = btn.closest('.DocSearch-AskAiScreen-Response');
    const assistantMessage =
      btn.closest('.DocSearch-AskAiScreen-Message--assistant') ||
      response?.querySelector('.DocSearch-AskAiScreen-Message--assistant');
    const contentEl = assistantMessage?.querySelector(
      '.DocSearch-AskAiScreen-MessageContent'
    ) as HTMLElement | null;
    if (!contentEl) return '';

    const markdownBlocks = Array.from(
      contentEl.querySelectorAll('.DocSearch-Markdown-Content')
    ) as HTMLElement[];

    if (markdownBlocks.length > 0) {
      return markdownBlocks
        .map((block) => block.innerText.trim())
        .filter(Boolean)
        .join('\n\n');
    }

    const clone = contentEl.cloneNode(true) as HTMLElement;
    clone
      .querySelectorAll(
        [
          '.DocSearch-AskAiScreen-Answer-Footer',
          '.DocSearch-AskAiScreen-MessageContent-Tool',
          '.DocSearch-AskAiScreen-MessageContent-Tool-Query',
          '.DocSearch-AskAiScreen-MessageContent-Reasoning',
          '.DocSearck-AskAiScreen-MessageContent-Stopped',
        ].join(',')
      )
      .forEach((el) => el.remove());

    return clone.innerText.trim();
  }, []);

  const copyAssistantMessage = React.useCallback(
    (
      btn: HTMLButtonElement,
      event: Pick<
        MouseEvent | React.MouseEvent,
        'preventDefault' | 'stopPropagation'
      > & { nativeEvent?: MouseEvent }
    ) => {
      const text = getAssistantMessageText(btn);
      if (!text) return false;

      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent?.stopImmediatePropagation();
      if ('stopImmediatePropagation' in event) {
        event.stopImmediatePropagation();
      }

      copyTextToClipboard(text);
      showCopiedState(btn);
      return true;
    },
    [copyTextToClipboard, getAssistantMessageText, showCopiedState]
  );

  // Fix Algolia copy button bug: it can copy the first streamed text chunk
  // instead of the rendered answer. Native capture catches the click before
  // Algolia's own React handler writes stale content to the clipboard.
  useEffect(() => {
    if (!isOpen) return;

    const handleDocumentCopyClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const btn = target.closest(
        '.DocSearch-AskAiScreen-CopyButton'
      ) as HTMLButtonElement | null;
      if (!btn) return;

      copyAssistantMessage(btn, event);
    };

    document.addEventListener('click', handleDocumentCopyClick, true);
    return () => {
      document.removeEventListener('click', handleDocumentCopyClick, true);
    };
  }, [copyAssistantMessage, isOpen]);

  const handleCopyCapture = React.useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest(
        '.DocSearch-AskAiScreen-CopyButton'
      ) as HTMLButtonElement | null;
      if (!btn) return;

      copyAssistantMessage(btn, e);
    },
    [copyAssistantMessage]
  );

  // Handle submit button state based on textarea content
  useEffect(() => {
    if (!isOpen) return;

    const updateButtonState = () => {
      const textarea = document.querySelector(
        '.DocSearch-Sidepanel-Prompt--textarea'
      ) as HTMLTextAreaElement;
      const submitButton = document.querySelector(
        '.DocSearch-Sidepanel-Prompt--submit'
      ) as HTMLButtonElement;

      if (textarea && submitButton) {
        if (textarea.value.trim().length > 0) {
          submitButton.classList.add('has-text');
        } else {
          submitButton.classList.remove('has-text');
        }
      }
    };

    const autoResize = (el: HTMLTextAreaElement) => {
      el.style.height = '0';
      el.style.height = Math.min(el.scrollHeight, 200) + 'px';
      el.style.overflowY = el.scrollHeight > 200 ? 'auto' : 'hidden';
    };

    const handleInput = (e: Event) => {
      updateButtonState();
      autoResize(e.target as HTMLTextAreaElement);
    };

    const checkInterval = setInterval(() => {
      const textarea = document.querySelector(
        '.DocSearch-Sidepanel-Prompt--textarea'
      ) as HTMLTextAreaElement;
      if (textarea) {
        updateButtonState();
        autoResize(textarea);
        textarea.addEventListener('input', handleInput);
        textarea.focus();
        clearInterval(checkInterval);
      }
    }, 100);

    return () => {
      clearInterval(checkInterval);
      const textarea = document.querySelector(
        '.DocSearch-Sidepanel-Prompt--textarea'
      );
      if (textarea) {
        textarea.removeEventListener('input', handleInput);
      }
    };
  }, [isOpen]);

  if (!SidepanelComponent) {
    return null;
  }

  const algoliaConfig = (siteConfig.themeConfig as any)?.algolia;
  const askAiConfig =
    (siteConfig.customFields as any)?.askAi || algoliaConfig?.askAi;

  if (!askAiConfig) {
    console.error('Ask AI configuration not found in docusaurus.config.js');
    return null;
  }

  const { assistantId, indexName, appId, apiKey, suggestedQuestions } =
    askAiConfig;

  const handleAlgoliaClose = () => {
    if (!isResizingRef.current) onClose();
  };

  const sidepanel = (
    <>
      <div
        className={`ask-ai-sidepanel ${isExpanded ? 'is-expanded' : ''}`}
        style={isOpen ? undefined : { display: 'none' }}
        onClickCapture={handleCopyCapture}
      >
        <SidepanelComponent
          appId={appId}
          apiKey={apiKey}
          indexName={indexName}
          assistantId={assistantId}
          isOpen={isOpen}
          onOpen={() => {}}
          onClose={handleAlgoliaClose}
          initialMessage={initialMessage || undefined}
          suggestedQuestions={suggestedQuestions}
          translations={{
            title: 'Ask AI about Sumo Logic',
            placeholder: 'Ask a question about Sumo Logic...',
            greeting: 'How can I help you with Sumo Logic today?',
            introduction:
              'I can help you find information about Sumo Logic features, integrations, troubleshooting guides, APIs, and best practices across our documentation.',
            poweredBy: 'Powered by Algolia',
          }}
          insights
        />
      </div>
      {headerActionsEl &&
        createPortal(
          <div className="ask-ai-header-shortcuts">
            <button
              type="button"
              className="ask-ai-shortcut-button"
              aria-label="Start a new conversation"
              title="Start a new conversation"
              onClick={() => triggerHeaderAction('Start a new conversation')}
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  d="M12 5v14M5 12h14"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <span>New</span>
            </button>
            <button
              type="button"
              className="ask-ai-shortcut-button"
              aria-label="Conversation history"
              title="Conversation history"
              onClick={() => triggerHeaderAction('Conversation history')}
            >
              <svg
                viewBox="0 0 18 18"
                width="18"
                height="18"
                aria-hidden="true"
              >
                <path
                  d="M9 0.875C10.6068 0.875 12.1776 1.35149 13.5137 2.24414C14.8498 3.13693 15.8919 4.40598 16.5068 5.89062C17.1218 7.37522 17.2822 9.00892 16.9688 10.585C16.6552 12.1611 15.8814 13.6088 14.7451 14.7451C13.6088 15.8814 12.1611 16.6552 10.585 16.9688C9.00892 17.2822 7.37523 17.1218 5.89062 16.5068C4.40598 15.8919 3.13693 14.8498 2.24414 13.5137C1.35149 12.1776 0.875 10.6068 0.875 9C0.875 8.65482 1.15482 8.375 1.5 8.375C1.84518 8.375 2.125 8.65482 2.125 9C2.125 10.3596 2.52792 11.6888 3.2832 12.8193C4.03864 13.9499 5.1129 14.8312 6.36914 15.3516C7.62523 15.8718 9.00736 16.0083 10.3408 15.7432C11.6744 15.4779 12.8998 14.8228 13.8613 13.8613C14.8228 12.8998 15.4779 11.6744 15.7432 10.3408C16.0083 9.00736 15.8718 7.62523 15.3516 6.36914C14.8312 5.1129 13.9499 4.03864 12.8193 3.2832C11.6888 2.52792 10.3596 2.125 9 2.125C7.06829 2.125 5.21604 2.89096 3.82129 4.22949L3.00879 5.04199H5.66699C6.01202 5.04199 6.29199 5.32192 6.29199 5.66699C6.29199 6.01205 6.01202 6.29199 5.66699 6.29199H1.5C1.45939 6.29199 1.41889 6.28716 1.37891 6.2793C1.36148 6.27587 1.345 6.26949 1.32812 6.26465C1.267 6.24714 1.20782 6.22205 1.15332 6.18555C1.08536 6.14005 1.02604 6.08256 0.980469 6.01465C0.970244 5.99942 0.962841 5.98268 0.954102 5.9668C0.904937 5.87756 0.875056 5.77606 0.875 5.66699V1.5C0.875 1.15482 1.15482 0.875 1.5 0.875C1.84518 0.875 2.125 1.15482 2.125 1.5V4.15723L2.94141 3.3418C4.29502 2.03799 6.08949 0.875 9 0.875ZM9.33301 4.20801C9.67804 4.20819 9.95801 4.48798 9.95801 4.83301V9.44727L12.9463 10.9414C13.2548 11.0958 13.3798 11.4707 13.2256 11.7793C13.0712 12.088 12.6955 12.213 12.3867 12.0586L9.05371 10.3926C8.84198 10.2867 8.70801 10.0697 8.70801 9.83301V4.83301C8.70818 4.48809 8.98809 4.20819 9.33301 4.20801Z"
                  fill="currentColor"
                />
              </svg>
              <span>History</span>
            </button>
          </div>,
          headerActionsEl
        )}
    </>
  );

  return createPortal(sidepanel, document.body);
}
