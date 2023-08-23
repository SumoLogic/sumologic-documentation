import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';

export const features1 = [
  {
    title: translate({
      id: 'landing.feature.searches-logs.title',
      message: 'Searches and Logs',
      description: 'Title for searches & logs',
    }),
    imageUrl: 'img/icons/search.png',
    description: (<Translate
      id='landing.feature.searches-logs.desc'
      description='Searches and logs description'>
      Search, query and analyze your log data sent to Sumo Logic.
    </Translate>),
    link: 'docs/search',
  },
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
];


export const features2 = [
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
  {
    title: translate({
      id: 'landing.feature.k8s.title',
      message: 'Kubernetes Observability',
      description: 'Title for Kubernetes Observability',
    }),
    imageUrl: 'img/icons/operations/kubernetes.png',
    description: (<Translate
      id='landing.feature.k8s.desc'
      description='AWS Observability description'>
      Deploy and monitor Kubernetes.
    </Translate>),
    link: 'docs/observability/kubernetes',
  },
  {
    title: translate({
      id: 'landing.feature.rce.title',
      message: 'Root Cause Explorer',
      description: 'Title for Root Cause Explorer',
    }),
    imageUrl: 'img/icons/observe.png',
    description: (<Translate
      id='landing.feature.rce.desc'
      description='Root Cause Explorer description'>
      Accelerate app troubleshooting and root cause isolation.
    </Translate>),
    link: 'docs/observability/root-cause-explorer',
  },
  {
    title: translate({
      id: 'landing.feature.sensu.title',
      message: 'Sensu',
      description: 'Title for Sensu',
    }),
    imageUrl: 'img/icons/observe.png',
    description: (<Translate
      id='landing.feature.sensu.desc'
      description='Root Cause Explorer description'>
      Visibility into apps, containers, traditional servers, and more.
    </Translate>),
    link: 'https://docs.sensu.io/sensu-go/latest',
  },
];


export const features3 = [
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
      id: 'landing.feature.apm.title',
      message: 'App performance monitoring',
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
];

export const features4 = [
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
      Security event management and insight into key issues.
    </Translate>),
    link: 'docs/cse',
  },
  {
    title: translate({
      id: 'landing.feature.soar.title',
      message: 'Cloud SOAR',
      description: 'Title for SOAR',
    }),
    imageUrl: 'img/icons/security/SOC.png',
    description: (<Translate
      id='landing.feature.soar.desc'
      description='SOAR description'>
      Modernize and automate your SOC for faster response times.
    </Translate>),
    link: 'docs/cloud-soar',
  },
];


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
      description='alerts description'>
      Visualize your data and set alerts to monitor activity.
    </Translate>),
    link: 'docs/alerts',
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
  {
    title: translate({
      id: 'landing.feature.manage.title',
      message: 'Manage Sumo',
      description: 'Title for manage',
    }),
    imageUrl: 'img/icons/manage.png',
    description: (<Translate
      id='landing.feature.manage.desc'
      description='Manage description'>
      Manage Sumo admin settings and advanced features.
    </Translate>),
    link: 'docs/manage',
  },
];


export const features6 = [
  {
    title: translate({
      id: 'landing.feature.sdo.title',
      message: 'Software Dev Optimization',
      description: 'Title for SDO',
    }),
    imageUrl: 'img/icons/sdo.png',
    description: (<Translate
      id='landing.feature.sdo.desc'
      description='SDO description'>
      Monitor your CI/CD pipelines and accelerate release velocity.
    </Translate>),
    link: 'docs/observability/sdo',
  },
  {
    title: translate({
      id: 'landing.feature.rum.title',
      message: 'Real User Monitoring',
      description: 'Title for rum',
    }),
    imageUrl: 'img/icons/business/customer-retention.png',
    description: (<Translate
      id='landing.feature.rum.desc'
      description='rum description'>
      Gain visibility into how users interact with your web apps.
    </Translate>),
    link: 'docs/apm/real-user-monitoring',
  },
  {
    title: translate({
      id: 'landing.feature.gi.title',
      message: 'Global Intelligence',
      description: 'Title for Global Intelligence',
    }),
    imageUrl: 'img/icons/cloud/global-intelligence.png',
    description: (<Translate
      id='landing.feature.gi.desc'
      description='Global Intelligence description'>
      Leverage machine learning to uncover global key performance and risk indicators.
    </Translate>),
    link: 'docs/global-intelligence',
  },
];

export const features7 = [
  {
    title: translate({
      id: 'landing.feature.logreduce.title',
      message: 'LogReduce',
      description: 'Title for logreduce',
    }),
    imageUrl: 'img/icons/search.png',
    description: (<Translate
      id='landing.feature.logreduce.desc'
      description='SDO description'>
      Cluster messages together based on string and pattern similarity.
    </Translate>),
    link: 'docs/search/logreduce',
  },
];

export const features = [
  features1,
  features2,
  features3,
  features4,
  features5,
  features6,
  features7,
];
