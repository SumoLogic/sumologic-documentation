/**
 * Ask AI Sidepanel Component
 *
 * Renders the Algolia Ask AI sidepanel modal using Algolia's official component.
 * Integrates with Docusaurus theme and configuration.
 */

import React, { useEffect, useState } from 'react';
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

  // Lazy load the Algolia Sidepanel component
  useEffect(() => {
    if (isOpen && !SidepanelComponent) {
      import('@docsearch/react/sidepanel').then((module) => {
        setSidepanelComponent(() => module.Sidepanel);
      });
    }
  }, [isOpen, SidepanelComponent]);

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
      // Force the panel to stay visible by ensuring container classes are maintained
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

      // Get all buttons in the header
      const headerButtons = Array.from(
        document.querySelectorAll('.DocSearch-Sidepanel-Header button')
      );

      // Check if this button is in the header
      if (!headerButtons.includes(button)) return;

      // Get aria-label to identify button type
      const ariaLabel = button.getAttribute('aria-label')?.toLowerCase() || '';

      // Skip if it's the close button
      if (ariaLabel.includes('close')) return;

      // If it's any other header button, toggle expansion
      console.log('Detected expand button click, aria-label:', ariaLabel);
      setIsExpanded(prev => !prev);
    };

    // Wait for header to be rendered then attach listener
    const checkInterval = setInterval(() => {
      const header = document.querySelector('.DocSearch-Sidepanel-Header');
      if (header) {
        header.addEventListener('click', handleClick);
        console.log('Attached click listener to header');
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

    // Initial check
    const checkInterval = setInterval(() => {
      const textarea = document.querySelector('.DocSearch-Sidepanel-Prompt--textarea') as HTMLTextAreaElement;
      if (textarea) {
        updateButtonState();
        textarea.addEventListener('input', updateButtonState);
        // Auto-focus the textarea when panel opens
        textarea.focus();
        clearInterval(checkInterval);
      }
    }, 100);

    // Cleanup
    return () => {
      clearInterval(checkInterval);
      const textarea = document.querySelector('.DocSearch-Sidepanel-Prompt--textarea');
      if (textarea) {
        textarea.removeEventListener('input', updateButtonState);
      }
    };
  }, [isOpen]);

  if (!isOpen || !SidepanelComponent) {
    return null;
  }

  // Get Algolia config from Docusaurus config
  const algoliaConfig = (siteConfig.themeConfig as any)?.algolia;

  if (!algoliaConfig?.askAi) {
    console.error('Ask AI configuration not found in docusaurus.config.js');
    return null;
  }

  const { assistantId, indexName, appId, apiKey, suggestedQuestions } = algoliaConfig.askAi;

  // Create the sidepanel element
  const sidepanel = (
    <>
      {/* Backdrop */}
      <div className="ask-ai-backdrop" onClick={onClose} />

      {/* Sidepanel */}
      <div className={`ask-ai-sidepanel ${isExpanded ? 'is-expanded' : ''}`}>
        <SidepanelComponent
          appId={appId}
          apiKey={apiKey}
          indexName={indexName}
          assistantId={assistantId}
          onClose={onClose}
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

  // Render as portal to avoid z-index issues
  return createPortal(sidepanel, document.body);
}
