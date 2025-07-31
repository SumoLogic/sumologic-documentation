---
title: June 2, 2025 - Application Update
image: https://help.sumologic.com/img/reuse/rss-image.jpg
keywords:
  - outlier rules
  - first seen rules
  - baseline
hide_table_of_contents: true    
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### New method for building baselines

We're happy to announce that now when you create or update a first seen or outlier rule, the baseline starts building immediately using existing system data. Typically, the baseline is ready within minutes. You no longer need to wait days for a baseline learning period to complete before it becomes usable. This change enables you to gain insights faster and iterate on your first seen and outlier rules rapidly, reducing tuning time from weeks to minutes.

To learn more, see our information about baselines for [first seen rules](/docs/cse/rules/write-first-seen-rule/) and [outlier rules](/docs/cse/rules/write-outlier-rule/#baselines-for-outlier-rules).

:::note
This feature update applies only to new and changed first seen and outlier rules. Unchanged existing rules will continue to use their existing baselines.
:::