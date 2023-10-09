---
id: view-records-signal
title: View Records for a Signal
description: Learn how to view Records associated with a Signal.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

CSE uses rules to evaluate incoming Records, and when the conditions of a rule are met, generates a Signal. This topic explains how to view Records associated with a Signal in CSE. 

## View attached Records for a Signal

When you view the details page for a Signal that was triggered by a threshold, aggregation, or chain rule, you’ll see an **Attached Records** section, which displays up to 20 of the Records that matched the rules conditions. Attached Records will continue to be associated with the Signal as long as the Signal is available.

Click the plus sign (+) for Record to view its details.

<img src={useBaseUrl('img/cse/attached-records.png')} alt="View attached records" width="800"/>

If other Records matched the rule conditions during the time window of the Signal, you can search for them from the Signal details page, as described in the following section.

## View additional Records for a Signal

To view additional Records that matched the rule conditions during the time window of the Signal, click **Queried Records** near the upper right corner of the Signal details page.

<img src={useBaseUrl('img/cse/queried-records-link.png')} alt="Queried records link" width="800"/>

The Records are retrieved in real time. The query is limited to the time window of the Signal. So, the list of Records may change over time; if you run the query occurs during the Signal’s time window, new Records could still be occurring, and if the query occurs after the retention period for records (by default, 90 days), it’s possible that no additional Records could be returned. 

<img src={useBaseUrl('img/cse/queried-records-results.png')} alt="Queried records result" width="800"/>

