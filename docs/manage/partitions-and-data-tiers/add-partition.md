---
id: add-partition
title: Add a Partition
---

#

Partitions provide three primary functions:

* Enhance performance
* Enhance searches
* Enhance retention options

:::important
To create a Partition you must be an admin or have the Manage Partitions [role capability](../users-and-roles/roles/role-capabilities.md) . Partitions apply to data from the date they are created (going forward only), and do not include data before the date of their creation.
:::

Partitions ingest your messages in real time, and differ from Scheduled Views, which backfill with aggregate data. Partitions begin building a non-aggregate index from the time the Partition is created and only index data moving forward (from the time of creation).

See [About Partitions](about-partitions.md) for limitations.

## Best practices for optimum performance

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

Overlapping data between two or more Partitions will count as additional ingest toward your account's quota. See [Manage Your Data Volume](/docs/manage/ingestion-and-volume/data-volume-index).

## Partitions and Data Tiers

If you have a Sumo Logic Enterprise Suite account, you can take advantage of the [Data Tiers](data-tiers.md) feature, which allows you to choose the tier where the Partition will reside. You select the tier when you configure the Partition. 

## Create a Partition

1. In the Sumo left navigation bar, go to **Manage Data \> Logs**, then select the **Partitions** tab.
1. Click **+ Add Partition**.
1. The **Create New Partition** pane appears.

    ![create-new-partition.png](/img/partitions-and-data-tiers/create-new-partition.png)

1. **Name**. Enter a name for the Partition. Partitions must be named alphanumerically, with no special characters, with the exception of underscores ( `_` ). However, a Partition name cannot start with `sumologic_` or an underscore `_`.
1. **Data Tier.** (Enterprise Suite accounts only) Click the radio button for the tier where you want the Partition to reside.
1. **Routing Expression**. Enter a [keyword search expression](../../search/get-started-with-search/build-search/keyword-search-expressions.md) that matches the data you want to have in the Partition, using [built-in metadata](../../search/get-started-with-search/search-basics/built-in-metadata.md) or [custom metadata fields](../fields.md). If you have an Enterprise Suite account, and are going to assign the Partition to the Infrequent Tier, see the information in the "Assigning Data to a Data Tier" section of the [Data Tiers](data-tiers.md) page.

    :::note
    The [\_dataTier](searching-data-tiers.md) search modifier is not supported in Partition routing expressions.
    :::

1. **Retention Period**. Enter the number of days you wish to retain the data in the Partition, or click **Apply the retention period of the Default Continuous Index**.
1. **Data Forwarding**. If you want to forward the data in the Partition to a cloud environment, click **Enable Data Forwarding **and specify the necessary information for the options that appear. For more information [Data Forwarding](/docs/manage/data-forwarding).

## Enhance search and retention

* See [Run a Search Against a Partition](run-search-against-partition.md) and [Optimize Your Search with Partitions](../../search/optimizing-search-with-partitions.md) for information on the various ways to run a search against a Partition.
* See [Manage Indexes with Variable Retention](manage-indexes-variable-retention.md) for information on data retention periods and how to modify them.
