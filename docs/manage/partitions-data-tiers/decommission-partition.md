---
id: decommission-partition
title: Decommission a Partition
description: Decommissioning a Partition keeps it from being started, although the data in the Partition remains in your account.
---


Once they are created, partitions cannot be deleted, and partition names cannot be reused. This is due to the fact that a partition may include log messages that are not stored anywhere else, and if the partition were to be deleted, the log messages would be lost.

:::note
We only count active partitions as part of your 50 partition limit. You can decommission unused or unwanted partitions if you have reached our 50 partition limit.
:::

If a partition is no longer needed, you can decommission it. Once a partition is decommissioned, the data in the partition remains in your account and can be searched, but the partition cannot be re-activated, and you cannot change its routing expression.   

**To decommission a partition**

1. Go to  **Manage Data > Logs > Partitions**.  

    ![partitions-page.png](/img/partitions-data-tiers/partitions-page.png)

1. Click the row for the partition you want to decommission.  
1. The partition details appear on the right side of the page.

    ![decommision-button.png](/img/partitions-data-tiers/decommision-button.png)

1. Click **Decommission**.
1. In the Confirm dialog, click **OK**.
1. The partition is decommissioned.
