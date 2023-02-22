/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  opentelemetry: [
    {
      type: 'category',
      label: 'OTEL Collector',
      collapsible: true,
      collapsed: false,
      items: [
        'overview',
        'installation',
        'configuration',
      ],
    },
  ],
};
