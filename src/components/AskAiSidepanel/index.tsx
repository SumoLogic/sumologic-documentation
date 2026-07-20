import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useHistory } from '@docusaurus/router';
import '@docsearch/css/dist/sidepanel.css';
import './styles.css';

interface AskAiSidepanelProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
  initialMessage?: {
    query: string;
    suggestedQuestionId?: string;
    messageId?: string;
  } | null;
}

const FEEDBACK_FORM_FIELDS = [
  'created_at',
  'question',
  'answer',
  'details',
  'page_url',
  'client_timestamp',
] as const;

type FeedbackFormField = (typeof FEEDBACK_FORM_FIELDS)[number];

function parseGoogleFormConfig(formUrl: string): {
  actionUrl: string;
  fields: FeedbackFormField[];
  entryMap: Partial<Record<FeedbackFormField, string>>;
} | null {
  try {
    const url = new URL(formUrl);
    const entryKeys = Array.from(url.searchParams.keys()).filter((key) =>
      key.startsWith('entry.')
    );

    if (
      !url.hostname.includes('docs.google.com') ||
      !url.pathname.endsWith('/viewform') ||
      entryKeys.length < FEEDBACK_FORM_FIELDS.length
    ) {
      return null;
    }

    const entryMap = {} as Partial<Record<FeedbackFormField, string>>;
    FEEDBACK_FORM_FIELDS.forEach((field, index) => {
      entryMap[field] = entryKeys[index];
    });

    return {
      actionUrl: `${url.origin}${url.pathname.replace(
        /\/viewform$/,
        '/formResponse'
      )}`,
      fields: [...FEEDBACK_FORM_FIELDS],
      entryMap,
    };
  } catch {
    return null;
  }
}

export default function AskAiSidepanel({
  isOpen,
  onOpen,
  onClose,
  initialMessage,
}: AskAiSidepanelProps) {
  const { siteConfig } = useDocusaurusContext();
  const history = useHistory();
  const algoliaConfig = (siteConfig.themeConfig as any)?.algolia;
  const askAiConfig = {
    ...(algoliaConfig?.askAi || {}),
    ...(((siteConfig.customFields as any)?.askAi || {}) as Record<
      string,
      unknown
    >),
  };
  const feedbackFormUrl = askAiConfig?.feedbackFormUrl || '';
  const [SidepanelComponent, setSidepanelComponent] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [shortcutHint, setShortcutHint] = useState('Ctrl + I');
  const [headerActionsEl, setHeaderActionsEl] = useState<HTMLElement | null>(
    null
  );
  const [feedbackModal, setFeedbackModal] = useState<{
    question: string;
    answer: string;
  } | null>(null);
  const [feedbackDetails, setFeedbackDetails] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackSubmitError, setFeedbackSubmitError] = useState('');
  const [feedbackSubmittedNotice, setFeedbackSubmittedNotice] = useState('');
  const isResizingRef = useRef(false);
  const feedbackTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Lazy load the Algolia Sidepanel component
  useEffect(() => {
    if (isOpen && !SidepanelComponent) {
      import('@docsearch/react/sidepanel').then((module) => {
        setSidepanelComponent(() => module.Sidepanel);
      });
    }
  }, [isOpen, SidepanelComponent]);

  useEffect(() => {
    if (typeof navigator === 'undefined') return;

    if (/(Mac|iPhone|iPad|iPod)/i.test(navigator.platform)) {
      setShortcutHint('\u2318 + I');
    } else {
      setShortcutHint('Ctrl + I');
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const tipText = `Tip: Start a new chat with ${shortcutHint}`;
    const checkInterval = setInterval(() => {
      const intro = document.querySelector(
        '.DocSearch-Sidepanel-NewConversationScreen .DocSearch-Sidepanel-Screen--introduction'
      ) as HTMLElement | null;

      if (intro) {
        intro.setAttribute('data-shortcut-tip', tipText);
        clearInterval(checkInterval);
      }
    }, 100);

    return () => clearInterval(checkInterval);
  }, [isOpen, shortcutHint]);

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
      setIsHistoryOpen(false);
      setFeedbackModal(null);
      setFeedbackDetails('');
      setIsSubmittingFeedback(false);
      setFeedbackSubmitError('');
      setFeedbackSubmittedNotice('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const body = document.body;

    const syncLayoutShift = () => {
      const shouldShiftLayout = isOpen && window.innerWidth > 996;

      if (shouldShiftLayout) {
        root.style.setProperty(
          '--ask-ai-layout-offset',
          isExpanded ? '540px' : '400px'
        );
        body.classList.add('ask-ai-layout-shifted');
      } else {
        body.classList.remove('ask-ai-layout-shifted');
        root.style.removeProperty('--ask-ai-layout-offset');
      }
    };

    syncLayoutShift();
    window.addEventListener('resize', syncLayoutShift);

    return () => {
      window.removeEventListener('resize', syncLayoutShift);
      body.classList.remove('ask-ai-layout-shifted');
      root.style.removeProperty('--ask-ai-layout-offset');
    };
  }, [isExpanded, isOpen]);

  useEffect(() => {
    if (!feedbackSubmittedNotice) return;

    const timer = window.setTimeout(() => {
      setFeedbackSubmittedNotice('');
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [feedbackSubmittedNotice]);

  useEffect(() => {
    if (!feedbackModal) return;

    const textarea = feedbackTextareaRef.current;
    if (textarea) {
      textarea.focus();
      const length = textarea.value.length;
      textarea.setSelectionRange(length, length);
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFeedbackModal(null);
        setFeedbackDetails('');
        setFeedbackSubmitError('');
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [feedbackModal]);

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

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    const isModifiedEvent = (event: MouseEvent) =>
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0;

    const shouldHandleInPanel = (anchor: HTMLAnchorElement) => {
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('javascript:') || href.startsWith('mailto:')) {
        return false;
      }

      if (anchor.target === '_blank' || anchor.hasAttribute('download')) {
        return false;
      }

      try {
        const url = new URL(anchor.href, window.location.href);
        return url.origin === window.location.origin;
      } catch {
        return false;
      }
    };

    const handleSidepanelLinkClick = (event: MouseEvent) => {
      if (isModifiedEvent(event)) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest(
        '.ask-ai-sidepanel a[href]'
      ) as HTMLAnchorElement | null;

      if (!anchor || !shouldHandleInPanel(anchor)) return;

      const nextUrl = new URL(anchor.href, window.location.href);
      const nextPath =
        nextUrl.pathname + nextUrl.search + nextUrl.hash;
      const currentPath =
        window.location.pathname + window.location.search + window.location.hash;

      event.preventDefault();
      event.stopPropagation();

      if (nextPath !== currentPath) {
        history.push(nextPath);
      } else if (nextUrl.hash) {
        const id = decodeURIComponent(nextUrl.hash.slice(1));
        const anchorEl = document.getElementById(id);
        if (anchorEl) {
          anchorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.addEventListener('click', handleSidepanelLinkClick, true);
    return () => {
      document.removeEventListener('click', handleSidepanelLinkClick, true);
    };
  }, [history, isOpen]);

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

  useEffect(() => {
    if (!isOpen) return;

    const syncHistoryState = () => {
      const sidepanel = document.querySelector('.DocSearch-Sidepanel');
      const historyOpen =
        sidepanel?.classList.contains('conversation-history') ?? false;

      setIsHistoryOpen((prev) => (prev === historyOpen ? prev : historyOpen));
    };

    syncHistoryState();
    const syncInterval = setInterval(syncHistoryState, 150);

    return () => {
      clearInterval(syncInterval);
    };
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

  const focusPromptTextarea = React.useCallback(() => {
    let attempts = 0;
    const maxAttempts = 12;

    const focus = () => {
      const textarea = document.querySelector(
        '.DocSearch-Sidepanel-Prompt--textarea'
      ) as HTMLTextAreaElement | null;

      if (textarea) {
        textarea.focus();
        const length = textarea.value.length;
        textarea.setSelectionRange(length, length);
        return;
      }

      attempts += 1;
      if (attempts < maxAttempts) {
        window.setTimeout(focus, 50);
      }
    };

    focus();
  }, []);

  const handleNewConversation = React.useCallback(() => {
    triggerHeaderAction('Start a new conversation');
    focusPromptTextarea();
  }, [focusPromptTextarea, triggerHeaderAction]);

  const handleConversationHistory = React.useCallback(() => {
    const sidepanel = document.querySelector('.DocSearch-Sidepanel');
    const isHistoryOpen = sidepanel?.classList.contains('conversation-history');

    if (isHistoryOpen) {
      const backButton = document.querySelector<HTMLButtonElement>(
        '.DocSearch-Sidepanel-Action-back:not(.mobile)'
      );
      backButton?.click();
      return;
    }

    triggerHeaderAction('Conversation history');
  }, [triggerHeaderAction]);

  useEffect(() => {
    const isEditableTarget = (target: EventTarget | null) => {
      const element = target as HTMLElement | null;
      if (!element) return false;

      const tagName = element.tagName;
      return (
        element.isContentEditable ||
        tagName === 'INPUT' ||
        tagName === 'TEXTAREA' ||
        tagName === 'SELECT'
      );
    };

    const handleShortcut = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() !== 'i' ||
        (!event.metaKey && !event.ctrlKey) ||
        isEditableTarget(event.target)
      ) {
        return;
      }

      event.preventDefault();

      if (isOpen) {
        handleNewConversation();
        return;
      }

      onOpen?.();
      window.setTimeout(() => {
        handleNewConversation();
      }, 50);
    };

    document.addEventListener('keydown', handleShortcut);
    return () => {
      document.removeEventListener('keydown', handleShortcut);
    };
  }, [handleNewConversation, isOpen, onOpen]);

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

  const getFeedbackContext = React.useCallback(
    (btn: HTMLButtonElement) => {
      const response = btn.closest('.DocSearch-AskAiScreen-Response');
      const question =
        response
          ?.querySelector('.DocSearch-AskAiScreen-Query')
          ?.textContent?.trim() ?? '';
      const answer = getAssistantMessageText(btn);

      return { question, answer };
    },
    [getAssistantMessageText]
  );

  const closeFeedbackModal = React.useCallback(() => {
    setFeedbackModal(null);
    setFeedbackDetails('');
    setFeedbackSubmitError('');
  }, []);

  const handleFeedbackButtonClick = React.useCallback(
    (btn: HTMLButtonElement) => {
      const title = btn.getAttribute('title')?.toLowerCase() ?? '';
      const isNegativeFeedback = title.includes('dislike');
      if (!isNegativeFeedback) {
        return false;
      }

      const { question, answer } = getFeedbackContext(btn);

      setFeedbackDetails('');
      setFeedbackSubmitError('');
      setFeedbackModal({
        question,
        answer,
      });
      return true;
    },
    [getFeedbackContext]
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

  useEffect(() => {
    if (!isOpen) return;

    const handleDocumentFeedbackClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const btn = target.closest(
        '.DocSearch-AskAiScreen-Actions button:not(.DocSearch-AskAiScreen-CopyButton)'
      ) as HTMLButtonElement | null;
      if (!btn) return;

      handleFeedbackButtonClick(btn);
    };

    document.addEventListener('click', handleDocumentFeedbackClick, true);
    return () => {
      document.removeEventListener('click', handleDocumentFeedbackClick, true);
    };
  }, [handleFeedbackButtonClick, isOpen]);

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

  const submitFeedbackModal = React.useCallback(async () => {
    if (!feedbackModal) return;
    const trimmedDetails = feedbackDetails.trim();

    if (!trimmedDetails) {
      closeFeedbackModal();
      return;
    }

    const payload = {
      details: trimmedDetails,
      question: feedbackModal.question,
      answer: feedbackModal.answer,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    };

    setIsSubmittingFeedback(true);
    setFeedbackSubmitError('');

    try {
      if (feedbackFormUrl) {
        const formConfig = parseGoogleFormConfig(feedbackFormUrl);
        if (!formConfig) {
          throw new Error('Invalid Google Form feedback URL');
        }

        const formValues: Record<FeedbackFormField, string> = {
          created_at: new Date().toISOString(),
          question: payload.question,
          answer: payload.answer,
          details: payload.details,
          page_url: payload.url,
          client_timestamp: payload.timestamp,
        };

        const formData = new URLSearchParams();
        formConfig.fields.forEach((field) => {
          const entryKey = formConfig.entryMap[field];
          if (!entryKey) return;
          formData.append(entryKey, formValues[field]);
        });

        await fetch(formConfig.actionUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        });
      }

      window.dispatchEvent(
        new CustomEvent('ask-ai-feedback-submitted', {
          detail: payload,
        })
      );

      closeFeedbackModal();
      setFeedbackSubmittedNotice('Additional feedback submitted.');
    } catch (error) {
      setFeedbackSubmitError(
        error instanceof Error
          ? error.message
          : 'Failed to submit feedback details'
      );
    } finally {
      setIsSubmittingFeedback(false);
    }
  }, [
    closeFeedbackModal,
    feedbackDetails,
    feedbackFormUrl,
    feedbackModal,
  ]);

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
        className={`ask-ai-sidepanel ${isExpanded ? 'is-expanded' : ''} ${
          isHistoryOpen ? 'is-history-open' : ''
        }`}
        style={isOpen ? undefined : { display: 'none' }}
        onClickCapture={handleCopyCapture}
      >
        <SidepanelComponent
          appId={appId}
          apiKey={apiKey}
          indexName={indexName}
          assistantId={assistantId}
          isOpen={isOpen}
          onOpen={onOpen ?? (() => {})}
          onClose={handleAlgoliaClose}
          initialMessage={initialMessage || undefined}
          suggestedQuestions={suggestedQuestions}
          keyboardShortcuts={{
            'Ctrl/Cmd+I': false,
          }}
          translations={{
            title: 'Ask AI about Sumo Logic',
            placeholder: 'Ask a question about Sumo Logic...',
            greeting: 'How can I help you with Sumo Logic today?',
            introduction:
              'I can help you find information about Sumo Logic features, integrations, troubleshooting, APIs, and best practices across our documentation.',
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
              onClick={handleNewConversation}
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
              className={`ask-ai-shortcut-button ${
                isHistoryOpen ? 'is-active' : ''
              }`}
              aria-label="My conversation history"
              title="My conversation history"
              onClick={handleConversationHistory}
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
      {feedbackModal &&
        createPortal(
          <div
            className="ask-ai-feedback-modal-backdrop"
            role="presentation"
            onClick={closeFeedbackModal}
          >
            <div
              className="ask-ai-feedback-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="ask-ai-feedback-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="ask-ai-feedback-modal-header">
                <h2 id="ask-ai-feedback-title">Thanks for the feedback</h2>
                <button
                  type="button"
                  className="ask-ai-feedback-close"
                  aria-label="Close feedback dialog"
                  onClick={closeFeedbackModal}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
              <p className="ask-ai-feedback-label">
                Provide additional feedback (optional)
              </p>
              <textarea
                ref={feedbackTextareaRef}
                className="ask-ai-feedback-textarea"
                placeholder="What could be improved about this response or the documentation?"
                value={feedbackDetails}
                onChange={(e) => {
                  setFeedbackDetails(e.target.value);
                  if (feedbackSubmitError) {
                    setFeedbackSubmitError('');
                  }
                }}
              />
              <p className="ask-ai-feedback-note">
                Your feedback helps us improve Sumo Docs and AI-generated responses.
              </p>
              {feedbackSubmitError && (
                <p className="ask-ai-feedback-error">{feedbackSubmitError}</p>
              )}
              <div className="ask-ai-feedback-actions">
                <button
                  type="button"
                  className="ask-ai-feedback-button ask-ai-feedback-button-secondary"
                  onClick={closeFeedbackModal}
                  disabled={isSubmittingFeedback}
                >
                  Done
                </button>
                <button
                  type="button"
                  className="ask-ai-feedback-button ask-ai-feedback-button-primary"
                  onClick={submitFeedbackModal}
                  disabled={isSubmittingFeedback || !feedbackDetails.trim()}
                >
                  {isSubmittingFeedback ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>,
          </div>,
          document.body
        )}
      {feedbackSubmittedNotice &&
        createPortal(
          <div
            className="ask-ai-feedback-toast"
            role="status"
            aria-live="polite"
          >
            {feedbackSubmittedNotice}
          </div>,
          document.body
        )}
    </>
  );

  return createPortal(sidepanel, document.body);
}
