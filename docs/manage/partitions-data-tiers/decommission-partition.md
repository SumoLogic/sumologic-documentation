---
id: decommission-partition
title: Decommission a Partition
description: Decommissioning a Partition keeps it from being started, although the data in the Partition remains in your account.
---

After creation, partitions within our system are permanent and cannot be deleted, nor can their names be reused. This safeguard is in place because partitions may contain log messages exclusive to that partition; deleting it would result in the loss of these logs.

Only active partitions count toward your 50 partition limit. If you've reached this limit, you can decommission unused or unwanted partitions to free up space.

Should you no longer require a partition, you have the option to decommission it. Once decommissioned, the data within the partition remains accessible for search purposes, but the partition itself cannot be reactivated, and its routing expression cannot be altered. 

To decommission a partition:

1. Go to  **Manage Data** > **Logs** > **Partitions**. <br/>  ![partitions-page.png](/img/partitions-data-tiers/partitions-page.png)
1. Click the row for the partition you want to decommission.  
1. The partition details appear on the right side of the page.<br/>  ![decommision-button.png](/img/partitions-data-tiers/decommision-button.png)
1. Click **Decommission**.
1. In the Confirm dialog, click **OK**.
1. The partition is decommissioned.
