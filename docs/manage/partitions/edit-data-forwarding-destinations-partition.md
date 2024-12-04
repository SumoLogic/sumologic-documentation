---
id: edit-data-forwarding-destinations-partition
title: Edit Data Forwarding Destinations for a Partition
description: You can specify Data Forwarding settings for a partition so that the messages that were routed to an index can be forwarded to and existing or new Amazon S3 destination.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can specify data forwarding settings for a partition so that the messages that were routed to an index can be forwarded to an existing or new Amazon S3 destination.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Manage Data > Logs > Partitions**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Partitions**. You can also click the **Go To...** menu at the top of the screen and select **Partitions**. 
1. To refine the table results, use the **Add a filter** section located above the table. *AND* logic is applied when filtering between different sections, while *OR* logic is applied when filtering within the same section. Click the Partition you want to update.
    :::note 
    You can see the suggestions only if there are two or more responses for the same column or section. 
    ::: 
    <img src={useBaseUrl('/img/manage/partitions-data-tiers/partitions-page.png')} alt="partitions-page" style={{border:'1px solid gray'}} width="800"/>
1. The partition details are displayed on the right side of the page.<br/><img src={useBaseUrl('img/manage/partitions-data-tiers/edit-partition-pane-search-icon.png')} alt="edit-partition-pane-search-icon" width="300"/>    
1. Click **Edit** to open the pane for editing. <br/><img src={useBaseUrl('img/manage/partitions-data-tiers/edit-partition-pane.png')} alt="edit-partition-pane.png" width="300"/>
1. You can configure Data Forwarding, or if Data Forwarding is already configured, modify the configuration. For more information, see [Data Forwarding](../data-forwarding/amazon-s3-bucket.md).
