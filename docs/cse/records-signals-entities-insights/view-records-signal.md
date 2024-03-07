---
id: view-records-signal
title: View Records for a Signal
description: Learn how to view Records associated with a Signal.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Cloud SIEM uses rules to evaluate incoming Records, and when the conditions of a rule are met, generates a Signal. This topic explains how to view Records associated with a Signal in Cloud SIEM. 

When you view the details page for a Signal that was triggered by a threshold, aggregation, or chain rule, you’ll see a section that displays Records that matched the rules conditions. These Records will continue to be associated with the Signal as long as the Signal is available. 

Click the plus sign (+) for a Record to view its details. Click the **Timestamp** button to sort Records by their timestamp.

<img src={useBaseUrl('img/cse/attached-records.png')} alt="View attached records" width="800"/>

:::note
Only a single record is attached to the Signal itself. Any other involved records are retrieved via log search. If the records are past their retention period, they no longer appear in the UI. In the API and `sec_signal` index, only the single attached record is included, along with a list of any other entities that were seen on the involved records (in `involvedEntities`). You must [perform a log search](/docs/cse/records-signals-entities-insights/search-cse-records-in-sumo/#partition-for-cloud-siem-signals) to find the other involved records.
:::
