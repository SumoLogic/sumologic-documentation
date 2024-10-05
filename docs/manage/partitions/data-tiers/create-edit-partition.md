---
id: create-edit-partition
title: Create and Edit a Partition
description: Learn how to create and edit a Partition in an Index.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Partitions provide three primary functions:
* Enhance performance
* Enhance searches
* Enhance retention options

Partitions ingest your messages in real time, and differ from [Scheduled Views](/docs/manage/scheduled-views), which backfill with aggregate data. Partitions begin building a non-aggregate index from the time the Partition is created and only index data moving forward (from the time of creation).

See [Partitions](/docs/manage/partitions) for limitations.

## Prerequisites

To create or edit a Partition, you must be an account Administrator or have the [Manage Partitions role capability](/docs/manage/users-roles/roles/role-capabilities). It's important to note that Partitions only affect data generated from the date of their creation onwards; any data predating their establishment is not included.

## Partitions and Data Tiers

If you have a Sumo Logic Enterprise Suite account, you can take advantage of the [Data Tiers](/docs/manage/partitions/data-tiers/) feature, which allows you to choose the tier where the Partition will reside. You select the tier when you configure the Partition. 

## Create a Partition

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Manage Data > Logs > Partitions**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Partitions**. You can also click the **Go To...** menu at the top of the screen and select **Partitions**. 
1. Click **+ Add Partition**.
1. The **Create New Partition** pane appears.<br/><img src={useBaseUrl('img/manage/partitions-data-tiers/create-new-partition.png')} alt="create-new-partition.png" width="300"/>
1. **Name**. Enter a name for the Partition. Partitions must be named alphanumerically, with no special characters, with the exception of underscores (`_`). However, a Partition name cannot start with `sumologic_` or an underscore `_`.
1. **Data Tier**. (Enterprise Suite accounts only) Click the radio button for the tier where you want the Partition to reside.
1. **Routing Expression**. Enter a [keyword search expression](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md) that matches the data you want to have in the Partition, using [built-in metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) or [custom metadata fields](/docs/manage/fields). If you have an Enterprise Suite account, and are going to assign the Partition to the Infrequent Tier, see the information in the [Assigning Data to a Data Tier](/docs/manage/partitions/data-tiers#assigning-data-to-a-data-tier) section of the [Data Tiers](/docs/manage/partitions/data-tiers/) page.
    :::note
    The [`_dataTier`](searching-data-tiers.md) search modifier is not supported in Partition routing expressions.
    :::
1. **Retention Period**. Enter the number of days you wish to retain the data in the Partition, or click **Apply the retention period of the Default Continuous Index**.
1. **Data Forwarding**. If you want to forward the data in the Partition to a cloud environment, click **Enable Data Forwarding** and specify the necessary information for the options that appear. For more information, see [Data Forwarding](/docs/manage/data-forwarding).

### Enhance search and retention

* To learn how to run a search against a Partition, see [Run a Search Against a Partition](/docs/manage/partitions/run-search-against-partition) and [Optimize Your Search with Partitions](/docs/search/optimize-search-partitions.md).
* To learn about data retention periods and how to modify them, see [Manage Indexes with Variable Retention](/docs/manage/partitions/manage-indexes-variable-retention).


### Best practices for optimum performance

When designing partitions, keep the following in mind:
* **Avoid using queries that are subject to change**. In order to benefit from using Partitions, they should be used for long-term message organization.
* **Make the query as specific as possible**. Making the query specific will reduce the amount of data in the Partition, which increases search performance.
* **Keep the query flexible**. Use a flexible query, such as `sourceCategory=*Apache*`, so that metadata can be adjusted without breaking the query.
* **Group data together that is most often used together**. For example, create Partitions for categories such as web data, security data, or errors.
* **Group data together that is used by teams**. Partitions are an excellent way to organize messages by role and teams within your organization.
* **Avoid including too much data in your partition**. Send between 2% and 20% of your data to a Partition. Including 90% of the data in your index in a Partition won’t improve search performance.
* **Don’t create overlapping partitions**. With multiple Partitions, messages could be duplicated if you create routing expressions that overlap. For example, if you have the following Partitions, messages for `_sourceCategory=prod/Apache` would be duplicated as they would be stored in both Partitions. 
  * Partition1: `_sourceCategory=prod`
  * Partition2: `_sourceCategory=*/Apache`

Overlapping data between two or more Partitions will count as additional ingest toward your account's quota. See [Data Volume Index](/docs/manage/ingestion-volume/data-volume-index).

## Edit a partition

This section has instructions for editing a partition.  

When you create a partition, you specify the Data Tier where the partition will reside, a routing expression that determines what data is stored in the partition, and a retention period. Optionally, you can enable data forwarding of the partition’s data to an S3 bucket.  

### About partition editability

You can make some changes to an existing partition:  

* You can change the routing expression, as long as the partition is active (not decommissioned). It takes about five minutes for the change to take effect. The routing expression takes effect going forward—it doesn’t affect data previously added to the partition. 
* You can change the retention period of the partition.
  :::note
  By default, Sumo Logic internal partitions like `sumologic_audit_events`, `sumologic_volume`, and so on, have the same retention period as the Default Continuous Index. You can change the retention period for any of these internal partitions as desired.
  :::
* You can change the data forwarding configuration.
* You cannot change the name of partition, reuse a partition name, or change the target Data Tier.  
* Security partitions can’t be edited. Sumo Logic stores Cloud SIEM Records in seven partitions, one for each [Cloud SIEM Record type](/docs/cse/schema/cse-record-types). The names of the Sumo Logic partitions that contain Cloud SIEM Records begin with the string `sec_record_`. If you have a role that grants you the **View Partitions** capability, you can view the security partitions in the Sumo Logic UI. Note, however, that no user can edit or remove a security partition.

### Changing a partition's routing expression

If you want to change what data is routed to a partition, you can edit its routing expression. This is useful if you’ve decided that you prefer to re-route some or all of the data that is currently configured to go to the partition to a different data tier than that configured for the partition. For example, assume that Partition A is configured to reside in the Infrequent Tier, but you realize that some of the data routed to the partition should actually be in the Frequent Tier, you can solve the problem by changing the routing expression for Partition A, and creating a new partition for the data you want to go to the Frequent Tier. 

Before changing the routing expression for a partition, consider the impact of the change. For instance, changing the partition’s routing expression might affect the results returned by existing queries that refer to the partition. Note also, that if a partition is configured to forward data to an S3 destination, changing the partitions routing expression will affect what data is forwarded to S3.

### How to edit a partition

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Manage Data > Logs > Partitions**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Partitions**. You can also click the **Go To...** menu at the top of the screen and select **Partitions**. 
1. To refine the table results, use the **Add a filter** section located above the table. *AND* logic is applied when filtering between different sections, while *OR* logic is applied when filtering within the same section.
  :::note 
  You can see the suggestions only if there are two or more responses for the same column or section. 
  :::
1. Click the row with the partition you want to edit.
1. The partition details are displayed on the right side of the page.
1. Click **Edit** to open the pane for editing.<br/><img src={useBaseUrl('img/manage/partitions-data-tiers/edit-partition-pane.png')} alt="edit-partition-pane.png" width="300"/>
1. **Routing Expression**. Enter a [keyword search expression](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md) that matches the data you want to have in the partition, using [built-in metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) or [custom metadata fields](/docs/manage/fields).
1. **Retention Period**. Enter the number of days you wish to retain the data in the partition, or click **Apply the retention period of the Default Continuous Index**.
1. **Data Forwarding**. You can configure Data Forwarding, or if Data Forwarding is already configured, modify the configuration. For more information, see [Data Forwarding](/docs/manage/data-forwarding).

### Audit logging for routing expression changes

If you change the routing expression for a partition, an event is
written to the [Audit Event Index](/docs/manage/security/audit-indexes/audit-event-index) with the following details:

* `EventName` is "PartitionUpdated"
* `Subsystem` is "Partition"
* `Operator` identifies the user that made the change. 
