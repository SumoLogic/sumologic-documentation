---
id: view-partition-details
title: View Details About a Partition
description: Learn how to view details about a Sumo Logic partition.
---

To view details about a Partition:

1. Go to **Manage Data** > **Logs** > **Partitions**.

    ![partitions-page.png](/img/partitions-data-tiers/partitions-page.png)

1. Click the row for a Partition to view its details.

    ![view-edit-partition-pane.png](/img/partitions-data-tiers/view-edit-partition-pane.png)

    :::note
    The information displayed for partitions that contain CSE Records varies from other partitions. You can tell if a partition contains CSE Records from its name: The names of the Sumo Logic partitions that contain CSE Records begin with the string `sec_record_`.  The detailed view for security partitions does not display Data Tier or a routing expression. Note also that you can’t edit a security partition, or configure data forwarding for it. CSE users can search security partitions, as described in [Searching for CSE Records in Sumo Logic](../../cse/records-signals-entities-insights/search-cse-records-in-sumo.md).
    :::

 
