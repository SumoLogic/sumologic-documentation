---
id: view-partition-details
title: View Details About a Partition
description: Learn how to view details about a Sumo Logic partition.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To view details about a Partition:

1. Go to **Manage Data** > **Logs** > **Partitions**.

    ![partitions-page.png](/img/partitions-data-tiers/partitions-page.png)

1. Click the row for a Partition to view its details.

    <img src={useBaseUrl('img/partitions-data-tiers/view-edit-partition-pane.png')} alt="view-edit-partition-pane.png" width="300"/>

    :::note
    The information displayed for partitions that contain Cloud SIEM Records varies from other partitions. You can tell if a partition contains Cloud SIEM Records from its name: The names of the Sumo Logic partitions that contain Cloud SIEM Records begin with the string `sec_record_`. The detailed view for security partitions does not display Data Tier or a routing expression. Note also that you can’t edit a security partition, or configure data forwarding for it. Cloud SIEM users can search security partitions, as described in [Searching for Cloud SIEM Records in Sumo Logic](../../cse/records-signals-entities-insights/search-cse-records-in-sumo.md).
    :::

 
