---
id: create-edit-partition
title: Create and Edit a Partition
description: Learn how to create and edit a Partition in an Index.
---

Partitions provide three primary functions:
* Enhance performance
* Enhance searches
* Enhance retention options

:::important
To create a Partition you must be an admin or have the Manage Partitions [role capability](../users-roles/roles/role-capabilities.md). Partitions apply to data from the date they are created (going forward only), and do not include data before the date of their creation.
:::

Partitions ingest your messages in real time, and differ from Scheduled Views, which backfill with aggregate data. Partitions begin building a non-aggregate index from the time the Partition is created and only index data moving forward (from the time of creation).

See [Partitions and Data Tiers](/docs/manage/partitions-data-tiers) for limitations.


## Partitions and Data Tiers

If you have a Sumo Logic Enterprise Suite account, you can take advantage of the [Data Tiers](data-tiers.md) feature, which allows you to choose the tier where the Partition will reside. You select the tier when you configure the Partition. 

## Create a Partition

1. In the Sumo left navigation bar, go to **Manage Data > Logs**, then select the **Partitions** tab.
1. Click **+ Add Partition**.
1. The **Create New Partition** pane appears.
    ![create-new-partition.png](/img/partitions-data-tiers/create-new-partition.png)
1. **Name**. Enter a name for the Partition. Partitions must be named alphanumerically, with no special characters, with the exception of underscores ( `_` ). However, a Partition name cannot start with `sumologic_` or an underscore `_`.
1. **Data Tier.** (Enterprise Suite accounts only) Click the radio button for the tier where you want the Partition to reside.
1. **Routing Expression**. Enter a [keyword search expression](../../search/get-started-with-search/build-search/keyword-search-expressions.md) that matches the data you want to have in the Partition, using [built-in metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) or [custom metadata fields](/docs/manage/fields.md). If you have an Enterprise Suite account, and are going to assign the Partition to the Infrequent Tier, see the information in the [Assigning Data to a Data Tier](/docs/manage/partitions-data-tiers/data-tiers#assigning-data-to-a-data-tier) section of the [Data Tiers](/docs/manage/partitions-data-tiers/data-tiers) page.
    :::note
    The [_dataTier](searching-data-tiers.md) search modifier is not supported in Partition routing expressions.
    :::
1. **Retention Period**. Enter the number of days you wish to retain the data in the Partition, or click **Apply the retention period of the Default Continuous Index**.
1. **Data Forwarding**. If you want to forward the data in the Partition to a cloud environment, click **Enable Data Forwarding **and specify the necessary information for the options that appear. For more information [Data Forwarding](/docs/manage/data-forwarding).

### Enhance search and retention

* See [Run a Search Against a Partition](run-search-against-partition.md) and [Optimize Your Search with Partitions](../../search/optimize-search-partitions.md) for information on the various ways to run a search against a Partition.
* See [Manage Indexes with Variable Retention](manage-indexes-variable-retention.md) for information on data retention periods and how to modify them.


### Best practices for optimum performance

When designing partitions, keep the following in mind:
* **Avoid using queries that are subject to change.** In order to benefit from using Partitions, they should be used for long-term message organization.
* **Make the query as specific as possible.** Making the query specific will reduce the amount of data in the Partition, which increases search performance.
* **Keep the query flexible.** Use a flexible query, such as `sourceCategory=*Apache*`, so that metadata can be adjusted without breaking the query.
* **Group data together that is most often used together.** For example, create Partitions for categories such as web data, security data, or errors.
* **Group data together that is used by teams.** Partitions are an excellent way to organize messages by role and teams within your organization.
* **Avoid including too much data in your partition.** Send between 2% and 20% of your data to a Partition. Including 90% of the data in your index in a Partition won’t improve search performance.
* **Don’t create overlapping partitions**. With multiple Partitions, messages could be duplicated if you create routing expressions that overlap. For example, if you have the following Partitions, messages for `_sourceCategory=prod/Apache` would be duplicated as they would be stored in both Partitions. 
  * Partition1: `_sourceCategory=prod`
  * Partition2: `_sourceCategory=*/Apache`

Overlapping data between two or more Partitions will count as additional ingest toward your account's quota. See [Data Volume Index](/docs/manage/ingestion-volume/data-volume-index).

## Edit a partition

This section has instructions for editing a partition.  

:::important
To edit a partition you must be an admin or have the Manage Partitions [role capability](../users-roles/roles/role-capabilities.md). Partitions apply to data from the date they are created (going forward only), and do not include data before the date of their creation.
:::

When you create a partition, you specify the Data Tier where the partition will reside, a routing expression that determines what data is stored in the partition, and a retention period. Optionally, you can enable data forwarding of the partition’s data to an S3 bucket.  

### About partition editability

You can make some changes to an existing partition:  

* You can change the routing expression, as long as the partition is active (not decommissioned). It takes about five minutes for the change to take effect. The routing expression takes effect going forward—it doesn’t affect data previously added to the partition. 
* You can change the retention period of the partition.
:::note
By default, Sumo Logic internal partitions, like `sumologic_audit_events`, `sumologic_volume`, and so on, have the same retention period as the Default Continuous Index. You can change the retention period for any of these internal partitions as desired.
:::
* You can change the data forwarding configuration.
* You cannot change the name of partition, reuse a partition name, or change the target Data Tier.  
* Security partitions can’t be edited. Sumo Logic stores CSE Records in seven partitions, one for each CSE Record type. The names of the Sumo Logic partitions that contain CSE Records begin with the string `sec_record_`.  If you have a role that grants you the **View Partitions** capability, you can view the security partitions in the Sumo Logic UI. Note however, that no user can edit or remove a security partition.

### Changing a partition's routing expression

If you want to change what data is routed to a partition, you can edit its routing expression. This is useful if you’ve decided that you prefer to re-route some or all of the data that is currently configured to go to the partition to a different data tier than that configured for the partition. For example, assume that Partition A is configured to reside in the Infrequent tier, but you realize that some of the data routed to the partition should actually be in the Frequent tier, you can solve the problem by changing the routing expression for Partition A, and creating a new partition for the data you want to go to the Frequent tier. 

Before changing the routing expression for a partition, consider the impact of the change. For instance, changing the partition’s routing expression might affect the results returned by existing queries that refer to the partition. Note also, that if a partition is configured to forward data to an S3 destination, changing the partitions routing expression will affect what data is forwarded to S3.

### How to edit a partition

1. In the Sumo left navigation bar, go to **Manage Data** > **Logs**, then select the **Partitions** tab.
1. Click the row with the partition you want to edit.
1. The partition details are displayed on the right side of the page.
1. Click **Edit **to open the pane for editing.<br/> ![edit-partition-pane.png](/img/partitions-data-tiers/edit-partition-pane.png)
1. **Routing Expression**. Enter a [keyword search expression](../../search/get-started-with-search/build-search/keyword-search-expressions.md) that matches the data you want to have in the partition, using [built-in metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) or [custom metadata fields](/docs/manage/fields.md).
1. **Retention Period.** Enter the number of days you wish to retain the data in the partition, or click **Apply the retention period of the Default Continuous Index**.
1. **Data Forwarding**. You can configure Data Forwarding, or if Data Forwarding is already configured, modify the configuration. For more information, see [Data Forwarding](/docs/manage/data-forwarding).

### Audit logging for routing expression changes

If you change the routing expression for a partition, an event is
written to the Audit Event Index with the following details:

* `EventName` is "PartitionUpdated"
* `Subsystem` is "Partition"
* `Operator` identifies the user that made the change. 
