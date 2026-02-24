import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';

// Tab 1: Log Search
export const features1 = [
  {
    title: translate({
      id: 'landing.feature.searches-logs.title',
      message: 'Log Search',
      description: 'Title for Log Search',
    }),
    imageUrl: 'img/icons/search.png',
    description: (<Translate
      id='landing.feature.searches-logs.desc'
      description='Log Search description'>
      Search, query and analyze your log data sent to Sumo Logic.
    </Translate>),
    link: 'docs/search',
  },
  {
    title: translate({
      id: 'landing.feature.search-query-language.title',
      message: 'Search Query Language',
      description: 'Title for Search Query Language',
    }),
    imageUrl: 'img/icons/search.png',
    description: (<Translate
      id='landing.feature.search-query-language.desc'
      description='Search Query Language description'>
      Learn the operators, syntax, and keywords used to build powerful log queries.
    </Translate>),
    link: 'docs/search/search-query-language',
  },
  {
    title: translate({
      id: 'landing.feature.cheat-sheets.title',
      message: 'Log Search Cheat Sheets',
      description: 'Title for Log Search Cheat Sheets',
    }),
    imageUrl: 'img/icons/search.png',
    description: (<Translate
      id='landing.feature.cheat-sheets.desc'
      description='Log Search Cheat Sheets description'>
      Quick-reference guides for common search patterns and operators.
    </Translate>),
    link: 'docs/search/search-cheat-sheets',
  },
];


// Tab 2: AI and Automation
export const features2 = [
  {
    title: translate({
      id: 'landing.feature.mobot.title',
      message: 'Mobot (Dojo AI)',
      description: 'Title for Dojo AI / Mobot',
    }),
    imageUrl: 'img/icons/operations/human-to-machine.png',
    description: (<Translate
      id='landing.feature.mobot.desc'
      description='Mobot description'>
      Our AI-powered log assistant allows you to ask questions in plain English and get accurate log queries without writing code.
    </Translate>),
    link: 'docs/search/mobot',
  },
  {
    title: translate({
      id: 'landing.feature.platform-services.title',
      message: 'Platform Services',
      description: 'Title for Platform Services',
    }),
    imageUrl: 'img/icons/operations/human-to-machine.png',
    description: (<Translate
      id='landing.feature.platform-services.desc'
      description='Platform Services description'>
      Core platform capabilities powering search, automation, and data management across Sumo Logic.
    </Translate>),
    link: 'docs/platform-services',
  },
];

// After it goes GA: docs/cse/get-started-with-cloud-siem/soc-analyst-agent
// After it goes GA: mcp-server


// Tab 3: Security
export const features3 = [
  {
    title: translate({
      id: 'landing.feature.cse.title',
      message: 'Cloud SIEM',
      description: 'Title for CSE',
    }),
    imageUrl: 'img/icons/security/cloud-siem.png',
    description: (<Translate
      id='landing.feature.cse.desc'
      description='CSE description'>
      Detect threats faster and gain insight into security events.
    </Translate>),
    link: 'docs/cse',
  },
  {
    title: translate({
      id: 'landing.feature.soar.title',
      message: 'Cloud SOAR',
      description: 'Title for SOAR',
    }),
    imageUrl: 'img/icons/security/soar-2-color-icon.png',
    description: (<Translate
      id='landing.feature.soar.desc'
      description='SOAR description'>
      Modernize and automate your SOC for faster response times.
    </Translate>),
    link: 'docs/cloud-soar',
  },
  {
    title: translate({
      id: 'landing.feature.threat-intel.title',
      message: 'Threat Intelligence',
      description: 'Title for Threat Intelligence',
    }),
    imageUrl: 'img/icons/security/cloud-siem.png',
    description: (<Translate
      id='landing.feature.threat-intel.desc'
      description='Threat Intelligence description'>
      Enrich your security operations with curated threat intelligence data.
    </Translate>),
    link: 'docs/security/threat-intelligence',
  },
];


// Tab 4: Observability
export const features4 = [
  {
    title: translate({
      id: 'landing.feature.metrics.title',
      message: 'Metrics',
      description: 'Title for metrics',
    }),
    imageUrl: 'img/icons/metrics.png',
    description: (<Translate
      id='landing.feature.metrics.desc'
      description='Metrics description'>
      Review performance and activity data collected to monitor and troubleshoot.
    </Translate>),
    link: 'docs/metrics',
  },
  {
    title: translate({
      id: 'landing.feature.observability.title',
      message: 'Observability',
      description: 'Title for Observability',
    }),
    imageUrl: 'img/icons/observe.png',
    description: (<Translate
      id='landing.feature.observability.desc'
      description='Observability description'>
      Deploy and configure solutions to monitor apps and analyze root causes.
    </Translate>),
    link: 'docs/observability',
  },
  {
    title: translate({
      id: 'landing.feature.aws.title',
      message: 'AWS Observability',
      description: 'Title for AWS Observability',
    }),
    imageUrl: 'img/icons/operations/app-stack.png',
    description: (<Translate
      id='landing.feature.aws.desc'
      description='AWS Observability description'>
      Monitor and troubleshoot AWS cloud infrastructure.
    </Translate>),
    link: 'docs/observability/aws',
  },
];


// Tab 5: Alerts, Dashboards, and Apps
export const features5 = [
  {
    title: translate({
      id: 'landing.feature.alerts.title',
      message: 'Alerts',
      description: 'Title for alerts',
    }),
    imageUrl: 'img/icons/alerts.png',
    description: (<Translate
      id='landing.feature.alerts.desc'
      description='Alerts description'>
      Visualize your data and set alerts to monitor activity.
    </Translate>),
    link: 'docs/alerts',
  },
  {
    title: translate({
      id: 'landing.feature.integrations.title',
      message: 'Apps and Integrations',
      description: 'Title for Apps',
    }),
    imageUrl: 'img/icons/integrations.png',
    description: (<Translate
      id='landing.feature.integrations.desc'
      description='Apps description'>
      Gain visibility into your data sources using our third-party app integrations and services.
    </Translate>),
    link: 'docs/integrations',
  },
  {
    title: translate({
      id: 'landing.feature.dashboards.title',
      message: 'Dashboards and Visuals',
      description: 'Title for dashboards',
    }),
    imageUrl: 'img/icons/dashboards.png',
    description: (<Translate
      id='landing.feature.dashboards.desc'
      description='Dashboards description'>
      Create visualizations, monitors, and alerts for your apps.
    </Translate>),
    link: 'docs/dashboards',
  },
];


// Tab 6: APM and Tracing
export const features6 = [
  {
    title: translate({
      id: 'landing.feature.traces.title',
      message: 'Traces',
      description: 'Title for Traces',
    }),
    imageUrl: 'img/icons/apm.png',
    description: (<Translate
      id='landing.feature.traces.desc'
      description='Traces description'>
      Observe apps and microservices at the level of individual requests to pinpoint issues.
    </Translate>),
    link: 'docs/apm/traces',
  },
  {
    title: translate({
      id: 'landing.feature.apm.title',
      message: 'App Performance Monitoring',
      description: 'Title for APM',
    }),
    imageUrl: 'img/icons/apm.png',
    description: (<Translate
      id='landing.feature.apm.desc'
      description='APM description'>
      Monitor and analyze infrastructure health and app performance metrics.
    </Translate>),
    link: 'docs/apm',
  },
  {
    title: translate({
      id: 'landing.feature.rum.title',
      message: 'Real User Monitoring',
      description: 'Title for RUM',
    }),
    imageUrl: 'img/icons/business/customer-retention.png',
    description: (<Translate
      id='landing.feature.rum.desc'
      description='RUM description'>
      Gain visibility into how users interact with your web apps.
    </Translate>),
    link: 'docs/apm/real-user-monitoring',
  },
];


export const features = [
  features1, // Log Search
  features2, // AI and Automation
  features3, // Security
  features4, // Observability
  features5, // Alerts, Dashboards, and Apps
  features6, // APM and Tracing
];
