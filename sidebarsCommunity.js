/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  hackathon: [
    {
      type: 'category',
      label: '🌐Amazon Web Services',
      collapsible: false,
      collapsed: true,
      items: [
        'aws/aws-lambda',
        'aws/awso-drilldown',
      ],
    },
    {
      type: 'category',
      label: '🛞Kubernetes',
      collapsible: false,
      collapsed: true,
      items: [
        'kubernetes/kubernetes-overview',
      ],
    },
    {
      type: 'category',
      label: '🪵Log Management and Analytics',
      collapsible: false,
      collapsed: true,
      items: [
        'log-management-analytics/log-reduce',
        'log-management-analytics/drilldown-to-search',
      ],
    },
    {
      type: 'category',
      label: '⚙️Infrastructure Monitoring',
      collapsible: false,
      collapsed: true,
      items: [
        'infrastructure-monitoring/install-agent',
      ],
    },
    {
      type: 'category',
      label: '📱App Observability',
      collapsible: false,
      collapsed: true,
      items: [
        'app-observability/end-to-end',
        'app-observability/services-list-map',
        'app-observability/real-user-monitoring',
      ],
    },
    {
      type: 'category',
      label: '🛡️Security',
      collapsible: false,
      collapsed: true,
      items: [
        'security/cloud-siem',
        'aws/aws-lambda',
      ],
    },
    {
      type: 'category',
      label: '📈Platform Capabilities',
      collapsible: false,
      collapsed: true,
      items: [
        'platform-capabilities/dashboards',
        'platform-capabilities/schedule-search',
        'platform-capabilities/create-monitor',
      ],
    },
    {
      type: 'link',
      label: 'Log in to Sumo',
      href: 'https://service.sumologic.com',
    },
  ],
};
