---
id: edit-data-forwarding-destinations-partition
title: Edit Data Forwarding Destinations for a Partition
description: You can specify Data Forwarding settings for a partition so that the messages that were routed to an index can be forwarded to and existing or new Amazon S3 destination.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can specify data forwarding settings for a partition so that the messages that were routed to an index can be forwarded to an existing or new Amazon S3 destination.

1. On the **Manage Data** > **Logs** > **Partitions** page, click the Partition you want to update.<br/>![partitions-page.png](/img/partitions-data-tiers/partitions-page.png)
1. The partition details are displayed on the right side of the page.<br/><img src={useBaseUrl('img/partitions-data-tiers/edit-partition-pane-search-icon.png')} alt="edit-partition-pane-search-icon" width="300"/>    
1. Click **Edit** to open the pane for editing. <br/><img src={useBaseUrl('img/partitions-data-tiers/edit-partition-pane.png')} alt="edit-partition-pane.png" width="300"/>
1. You can configure Data Forwarding, or if Data Forwarding is already configured, modify the configuration. For more information, see [Data Forwarding](../data-forwarding/amazon-s3-bucket.md).
