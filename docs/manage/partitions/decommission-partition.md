---
id: decommission-partition
title: Decommission a Partition
description: Decommissioning a Partition keeps it from being started, although the data in the Partition remains in your account.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

After creation, partitions within our system are permanent and cannot be deleted, nor can their names be reused. This safeguard is in place because partitions may contain log messages exclusive to that partition; deleting it would result in the loss of these logs.

Only active partitions count toward your 50 partition limit. If you've reached this limit, you can decommission unused or unwanted partitions to free up space.

Should you no longer require a partition, you have the option to decommission it. Once decommissioned, the data within the partition remains accessible for search purposes, but the partition itself cannot be reactivated, and its routing expression cannot be altered. 

To decommission a partition:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Manage Data > Logs > Partitions**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Partitions**. You can also click the **Go To...** menu at the top of the screen and select **Partitions**. <br/><img src={useBaseUrl('/img/manage/partitions-data-tiers/partitions-page.png')} alt="partitions-page" style={{border:'1px solid gray'}} width="800"/>
1. To refine the table results, use the **Add a filter** section located above the table. *AND* logic is applied when filtering between different sections, while *OR* logic is applied when filtering within the same section. Click the row for the partition you want to decommission. 
     :::note 
     You can see the suggestions only if there are two or more responses for the same column or section. 
     :::
1. The partition details appear on the right side of the page.<br/><img src={useBaseUrl('/img/manage/partitions-data-tiers/decommision-button.png')} alt="decommision-button" style={{border:'1px solid gray'}} width="400"/>
1. Click **Decommission**.
1. In the Confirm dialog, click **OK**.
1. The partition is decommissioned.
