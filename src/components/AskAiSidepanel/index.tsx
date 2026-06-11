import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import '@docsearch/css/dist/sidepanel.css';
import './styles.css';

interface AskAiSidepanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AskAiSidepanel({ isOpen, onClose }: AskAiSidepanelProps) {
  const { siteConfig } = useDocusaurusContext();
  const [SidepanelComponent, setSidepanelComponent] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);
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
      timer = setTimeout(() => { isResizingRef.current = false; }, 500);
    };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); clearTimeout(timer); };
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
      const container = document.querySelector('.DocSearch-Sidepanel-Container');
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

      setIsExpanded(prev => !prev);
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

  // Handle submit button state based on textarea content
  useEffect(() => {
    if (!isOpen) return;

    const updateButtonState = () => {
      const textarea = document.querySelector('.DocSearch-Sidepanel-Prompt--textarea') as HTMLTextAreaElement;
      const submitButton = document.querySelector('.DocSearch-Sidepanel-Prompt--submit') as HTMLButtonElement;

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
      const textarea = document.querySelector('.DocSearch-Sidepanel-Prompt--textarea') as HTMLTextAreaElement;
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
      const textarea = document.querySelector('.DocSearch-Sidepanel-Prompt--textarea');
      if (textarea) {
        textarea.removeEventListener('input', handleInput);
      }
    };
  }, [isOpen]);

  if (!SidepanelComponent) {
    return null;
  }

  const algoliaConfig = (siteConfig.themeConfig as any)?.algolia;

  if (!algoliaConfig?.askAi) {
    console.error('Ask AI configuration not found in docusaurus.config.js');
    return null;
  }

  const { assistantId, indexName, appId, apiKey, suggestedQuestions } = algoliaConfig.askAi;

  const handleAlgoliaClose = () => {
    if (!isResizingRef.current) onClose();
  };

  const sidepanel = (
    <>
      <div
        className={`ask-ai-sidepanel ${isExpanded ? 'is-expanded' : ''}`}
        style={isOpen ? undefined : { display: 'none' }}
      >
        <SidepanelComponent
          appId={appId}
          apiKey={apiKey}
          indexName={indexName}
          assistantId={assistantId}
          isOpen={isOpen}
          onOpen={() => {}}
          onClose={handleAlgoliaClose}
          suggestedQuestions={suggestedQuestions}
          translations={{
            title: 'Ask AI about Sumo Logic',
            placeholder: 'Ask a question about Sumo Logic...',
            greeting: 'How can I help you with Sumo Logic today?',
            introduction: 'I can help you find information about Sumo Logic features, integrations, troubleshooting guides, APIs, and best practices across our documentation.',
            poweredBy: 'Powered by Algolia',
          }}
          insights
        />
      </div>
    </>
  );

  return createPortal(sidepanel, document.body);
}
