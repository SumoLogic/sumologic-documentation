---
id: create-edit-partition-flex
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

To create or edit a Partition, you must be an account Administrator or have the [Manage Partitions role capability](/docs/manage/users-roles/roles/role-capabilities). It's important to note that Partitions only affect data generated from the date of their creation onwards; any data predating their establishment is not included.
 
## Create a Partition

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Manage Data > Logs > Partitions**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Partitions**. You can also click the **Go To...** menu at the top of the screen and select **Partitions**. 
1. Click **+ Add Partition**.
1. The **Create New Partition** pane appears.<br/><img src={useBaseUrl('img/manage/partitions-data-tiers/create-new-partition-flex.png')} alt="create-new-partition-flex.png"  style={{border:'1px solid gray'}} width="300"/>
1. **Name**. Enter a name for the Partition. Partitions must be named alphanumerically, with no special characters, with the exception of underscores (`_`). However, a Partition name cannot start with `sumologic_` or an underscore `_`.
1. (Optional) **Include this partition in default scope**. By default, this checkbox is selected. Deselect this checkbox if you need to exclude this partition from the [default scope in your search](/docs/manage/partitions/flex/faq/#how-can-i-optimize-my-query-using-default-scope).
    :::note
    After changing the default scope of a partition, expect a delay of 2 to 3 minutes to reflect the change in the query scope.  
    :::
1. **Routing Expression**. Enter a [keyword search expression](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md) that matches the data you want to have in the Partition, using [built-in metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) or [custom metadata fields](/docs/manage/fields). 
1. **Retention Period**. Enter the number of days you wish to retain the data in the Partition, or click **Apply the retention period of sumologic_default**.
1. **Compliance data**. Click the **Mark as compliance data** to not change the routing expression and the retention period for partitions.
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

The best practice for cost optimization is to ensure that data from a source category is maintained in a single partition rather than multiple partitions to minimize multiple partitions from being included in the scope of the query. If data from a single source category is maintained in multiple partitions, it could potentially increase scan costs, as the query may need to consider data from multiple partitions.

## Edit a partition

This section has instructions for editing a partition.  

When you create a partition, you specify the routing expression that determines what data is stored in the partition, and a retention period. Optionally, you can enable data forwarding of the partition’s data to an S3 bucket.  

### About partition editability

You can make some changes to an existing partition:  

* You can change the retention period of the partition.
  :::note
  By default, Sumo Logic internal partitions like `sumologic_audit_events`, `sumologic_volume`, and so on, have the same retention period of `sumologic_default`. You can change the retention period for any of these internal partitions as desired.
  :::
* You can change the data forwarding configuration.
* You cannot change the name of a partition, the routing expression, or reuse a partition name.
* You cannot edit the audit index partition to include it in the default scope. 
* Security partitions can’t be edited. Sumo Logic stores Cloud SIEM Records in seven partitions, one for each [Cloud SIEM Record type](/docs/cse/schema/cse-record-types). The names of the Sumo Logic partitions that contain Cloud SIEM Records begin with the string `sec_record_`. If you have a role that grants you the **View Partitions** capability, you can view the security partitions in the Sumo Logic UI. Note, however, that no user can edit or remove a security partition.

### How to edit a partition

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Manage Data > Logs > Partitions**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Partitions**. You can also click the **Go To...** menu at the top of the screen and select **Partitions**. 
1. To refine the table results, use the **Add a filter** section located above the table. *AND* logic is applied when filtering between different sections, while *OR* logic is applied when filtering within the same section.
  :::note 
  You can see the suggestions only if there are two or more responses for the same column or section. 
  :::
1. Click the row with the partition you want to edit.
1. The partition details are displayed on the right side of the page.
1. Click **Edit** to open the pane for editing.<br/><img src={useBaseUrl('img/manage/partitions-data-tiers/edit-partition-pane-flex.png')} alt="edit-partition-pane-flex.png"  style={{border:'1px solid gray'}} width="300"/>
1. **Include this partition in default scope**. Select/deselect the checkbox to include/exclude this partition as the default scope in your search.
    :::note
    After changing the default scope of a partition, expect a delay of 2 to 3 minutes to reflect the change in the query scope.
    :::
1. **Retention Period**. Enter the number of days you wish to retain the data in the partition, or click **Apply the retention period of `sumologic_default`**.
1. **Data Forwarding**. You can configure Data Forwarding, or if Data Forwarding is already configured, modify the configuration. For more information, see [Data Forwarding](/docs/manage/data-forwarding).

### Audit logging for routing expression changes

If you change the routing expression for a partition, an event is
written to the [Audit Event Index](/docs/manage/security/audit-indexes/audit-event-index) with the following details:

* `EventName` is "PartitionUpdated"
* `Subsystem` is "Partition"
* `Operator` identifies the user that made the change. 
