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

  // Lazy load the Algolia Sidepanel component
  useEffect(() => {
    if (isOpen && !SidepanelComponent) {
      import('@docsearch/react/sidepanel').then((module) => {
        setSidepanelComponent(() => module.Sidepanel);
      });
    }
  }, [isOpen, SidepanelComponent]);

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

  if (!isOpen || !SidepanelComponent) {
    return null;
  }

  // Get Algolia config from Docusaurus config
  const algoliaConfig = (siteConfig.themeConfig as any)?.algolia;

  if (!algoliaConfig?.askAi) {
    console.error('Ask AI configuration not found in docusaurus.config.js');
    return null;
  }

  const { assistantId, indexName, appId, apiKey } = algoliaConfig.askAi;

  // Create the sidepanel element
  const sidepanel = (
    <>
      {/* Backdrop */}
      <div className="ask-ai-backdrop" onClick={onClose} />

      {/* Sidepanel */}
      <div className="ask-ai-sidepanel">
        <SidepanelComponent
          appId={appId}
          apiKey={apiKey}
          indexName={indexName}
          assistantId={assistantId}
          onClose={onClose}
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
