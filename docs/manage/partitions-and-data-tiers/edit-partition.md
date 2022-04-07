---
id: edit-partition
---

# Edit a Partition

This page has instructions for editing a partition.  

:::important
To edit a partition you must be an admin or have the Manage Partitions [role capability] (../Users-and-Roles/Manage-Roles/05-Role-Capabilities.md "Role Capabilities"). Partitions apply to data from the date they are created (going forward only), and do not include data before the date of their creation.
:::

When you create a partition, you specify the Data Tier where the partition will reside, a routing expression that determines what data is stored in the partition, and a retention period. Optionally, you can enable data forwarding of the partition’s data to an S3 bucket.  

## About partition editability

You can make some changes to an existing partition:  

* You can change the routing expression, as long as the partition is active (not decommissioned). It takes about five minutes for the change to take effect. The routing expression takes effect going forward—it doesn’t affect data previously added to the partition. 
* You can change the retention period of the partition. 

    :::note
    By default, Sumo Logic internal partitions, like `sumologic_audit_events`, `sumologic_volume`, and so on, have the same retention period as the Default Continuous Index. You can change the retention period for any of these internal partitions as desired.
    :::

* You can change the data forwarding configuration.
* You cannot change the name of partition, reuse a partition name, or change the target Data Tier.  
* Security partitions can’t be edited. Sumo Logic stores CSE Records in seven partitions, one for each CSE Record type. The names of the Sumo Logic partitions that contain CSE Records begin with the string `sec_record_`.  If you have a role that grants you the **View Partitions** capability, you can view the security partitions in the Sumo Logic UI. Note however, that no user can edit or remove a security partition.

## Changing a partition's routing expression

If you want to change what data is routed to a partition, you can edit its routing expression. This is useful if you’ve decided that you prefer to re-route some or all of the data that is currently configured to go to the partition to a different data tier than that configured for the partition. For example, assume that Partition A is configured to reside in the Infrequent tier, but you realize that some of the data routed to the partition should actually be in the Frequent tier, you can solve the problem by changing the routing expression for Partition A, and creating a new partition for the data you want to go to the Frequent tier. 

Before changing the routing expression for a partition, consider the impact of the change. For instance, changing the partition’s routing expression might affect the results returned by existing queries that refer to the partition. Note also, that if a partition is configured to forward data to an S3 destination, changing the partitions routing expression will affect what data is forwarded to S3.

## Edit a partition

1. In the Sumo left navigation bar, go to **Manage Data** \> **Logs**, then select the **Partitions** tab.
1. Click the row with the partition you want to edit.
1. The partition details are displayed on the right side of the page.
1. Click **Edit **to open the pane for editing.

    ![edit-partition-pane.png](/img/partitions-and-data-tiers/edit-partition-pane.png)

1. **Routing Expression**.  Enter a [keyword search expression](../../search/get-started-with-search/build-search/keyword-search-expressions.md) that matches the data you want to have in the partition, using [built-in metadata](../../search/get-started-with-search/search-basics/built-in-metadata.md) or [custom metadata fields] (../Fields.md "Fields").
1. **Retention Period.** Enter the number of days you wish to retain the data in the partition, or click **Apply the retention period of the Default Continuous Index**.
1. **Data Forwarding**. You can configure Data Forwarding, or if Data Forwarding is already configured, modify the configuration. For more information, see [Data Forwarding](/docs/manage/data-forwarding).

## Audit logging for routing expression changes

If you change the routing expression for a partition, an event is
written to the Audit Event Index with the following details:

* `EventName` is "PartitionUpdated"
* `Subsystem` is "Partition"
* `Operator` identifies the user that made the change. 
