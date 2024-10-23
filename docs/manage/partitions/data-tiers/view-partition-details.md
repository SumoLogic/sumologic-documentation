---
id: view-partition-details
title: View Details About a Partition
description: Learn how to view details about a Sumo Logic partition.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To view details about a Partition:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Manage Data > Logs > Partitions**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Partitions**. You can also click the **Go To...** menu at the top of the screen and select **Partitions**. <br/><img src={useBaseUrl('img/manage/partitions-data-tiers/partitions-page.png')} alt="partitions-page" style={{border:'1px solid gray'}} width="800"/>
1. Click the row for a Partition to view its details.<br/><img src={useBaseUrl('img/manage/partitions-data-tiers/view-edit-partition-pane.png')} alt="view-edit-partition-pane.png" style={{border:'1px solid gray'}} width="300"/>

    :::note
    The information displayed for partitions that contain Cloud SIEM Records varies from other partitions. You can tell if a partition contains Cloud SIEM Records from its name: The names of the Sumo Logic partitions that contain Cloud SIEM Records begin with the string `sec_record_`. The detailed view for security partitions does not display Data Tier or a routing expression. Note also that you can’t edit a security partition, or configure data forwarding for it. Cloud SIEM users can search security partitions, as described in [Searching for Cloud SIEM Records in Sumo Logic](/docs/cse/records-signals-entities-insights/search-cse-records-in-sumo).
    :::

 
