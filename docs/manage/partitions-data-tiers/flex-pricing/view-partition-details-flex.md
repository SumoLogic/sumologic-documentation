---
id: view-partition-details-flex
title: View Details About a Partition 
description: Learn how to view details about a Sumo Logic partition.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To view details about a Partition:

1. Go to **Manage Data** > **Logs** > **Partitions**.<br/> <img src={useBaseUrl('/img/partitions-data-tiers/partitions-page-flex.png')} alt="partitions-page" style={{border:'1px solid gray'}} width="800"/>
1. Click the row for a Partition to view its details.<br/><img src={useBaseUrl('img/partitions-data-tiers/view-edit-partition-pane-flex.png')} alt="view-edit-partition-pane.png" style={{border:'1px solid gray'}} width="350"/>

    :::note
    The information displayed for partitions that contain Cloud SIEM Records varies from other partitions. You can tell if a partition contains Cloud SIEM Records from its name: The names of the Sumo Logic partitions that contain Cloud SIEM Records begin with the string `sec_record_`. Note also that you can’t edit a security partition, or configure data forwarding for it. Cloud SIEM users can search security partitions, as described in [Searching for Cloud SIEM Records in Sumo Logic](../../cse/records-signals-entities-insights/search-cse-records-in-sumo.md).
    :::

 
