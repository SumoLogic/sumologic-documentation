/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  commmunity: [
    {
      type: 'category',
      label: 'Get Started',
      collapsible: false,
      collapsed: true,
      items: [
        'get-started/setup',
      ],
    },
    {
      type: 'category',
      label: 'Amazon Web Services',
      collapsible: false,
      collapsed: true,
      items: [
        'aws/aws-lambda',
        'aws/awso-drilldown',
      ],
    },
    {
      type: 'category',
      label: 'Kubernetes',
      collapsible: false,
      collapsed: true,
      items: [
        'kubernetes/schedule-search',
      ],
    },
    {
      type: 'category',
      label: 'Security🛡️',
      collapsible: false,
      collapsed: true,
      items: [
        'security/cse',
      ],
    },
    {
      type: 'category',
      label: 'Tracing',
      collapsible: false,
      collapsed: true,
      items: [
        'tracing/dashboards',
      ],
    },
    {
      type: 'link',
      label: 'Log in to Sumo',
      href: 'https://service.sumologic.com',
    },
  ],
};
