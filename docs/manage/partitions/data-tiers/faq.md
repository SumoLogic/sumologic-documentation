---
id: faq
title: Data Tiers FAQ
sidebar_label: FAQ
description: Answers to frequently asked questions about Data Tiers.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page answers frequently asked questions about Data Tiers. For information about each data tier and selecting the right one for your use case, see [Data Tiers](/docs/manage/partitions/data-tiers).

## In which Sumo subscriptions are Data Tiers available? 

The Continuous Data Tier is available in all Sumo subscriptions. Frequent and Infrequent are available only if you have Sumo Logic Enterprise Suite. 

## Is the Infrequent Tier available to existing Cloud Flex customers?

No. Infrequent Tier is only available to customers who have [Sumo Logic Credits](/docs/manage/manage-subscription/sumo-logic-credits-accounts) packaging.

## How to choose between Frequent and Infrequent ?

Choosing between Frequent and Infrequent for a data set depends on how frequently you need to access the data. If you expect to search the data often, the Frequent Tier, with its predictable upfront pricing model, is appropriate. Data that you expect to access less often is an ideal candidate for the Infrequent Tier, which offers low ingest cost, and competitive on-demand search pricing.

For example, for a large development team with hundreds of developers, it is better to send development and test logs to the Frequent Tier if your developers are going to access it often during development.

In contrast, debug or other verbose log sources that are only used to troubleshoot very specific issues that occur infrequently, for example, only a couple of times a week, are better off in the Infrequent Tier to keep the cost of ownership low.   

## Can I restrict access to Infrequent or Frequent data to select users?

You can use [Role-Based Access Control (RBAC)](/docs/manage/users-roles/roles/role-based-access-control) to restrict access to partitions in the Infrequent or Frequent Tiers. Although you can’t use a role search filter to restrict access to a partition by name, you can filter by the metadata that forms the routing expression for a partition. 

For example, if you want to restrict access to a partition whose routing expression is:

```
_sourceCategory=staging/*
```

You can create a role with this role search filter:

```
!(_sourceCategory=staging/*)
```

Then, you assign that role to any user that shouldn’t have access to data in that partition.

If you change the routing expression for partition in the future, you should update the role search filter accordingly.

## How does pricing work for Infrequent Tier searches? 

When you run a search In the Infrequent Tier, the cost of a search is based on how much data Sumo Logic scans in order to return your search results. At the current rate, your account’s Cloud Flex Credits are consumed at a rate of .016 per 1 GB scanned.

The table below shows how many credits would be consumed for the same query over multiple time ranges.

| Query                  | Data Scanned | Credits Consumed   |
|:-----------------------|:-------------|:-------------------|
| Search 1/2 day of data | 500          | 500 \* 0.016 = 8   |
| Search 1 day of data   | 1000         | 1000 \* 0.016 = 16 |
| Search 2 days of data  | 2000         | 2000 \* 0.016 = 32 |

## How can I get visibility into our Infrequent Tier search costs?

Your **Account Overview** page shows the credits your org has consumed for Infrequent searches. 

![infrequent-usage.png](/img/manage/partitions-data-tiers/infrequent-usage.png)

In addition, when you enter an Infrequent query in a [Log Search](/docs/search), before you run it, you'll see an estimate of the amount of data that will be scanned for that query. 

![estimated-scan.png](/img/manage/partitions-data-tiers/estimated-scan.png)

After you run an Infrequent query, you can see the volume of data that was actually scanned.  

![total-scan.png](/img/manage/partitions-data-tiers/total-scan.png)

## How do I create partitions to reroute data to a different tier later? 

:::note
These recommendations only apply if you do not use Data Streams. You can change the scope of a Data Stream to change the target tier.
:::

Add a custom metadata field at either the collector or source level, and then use it as the routing expression for the partition. For example, you could create a field named `usage`, and set it to **infrequent**.

<img src={useBaseUrl('img/manage/partitions-data-tiers/field.png')} alt="field" width="450"/> 

Then, when you create a new partition, you can use the field in the scoping expression along with other scoping rules.

<img src={useBaseUrl('img/manage/partitions-data-tiers/use-tier.png')} alt="use-tier.png" width="350"/> 

In the future, if you want to change the data that goes into the partition, you can just update the usage field.

## How can I minimize Infrequent Tier search costs?

One of the main ways to control costs is to split your data into multiple partitions. 

Assume you have three different services sending logs to Sumo Logic. There a couple of approaches you can take:

* **Create one partition per service**. All the logs for that service go there. This approach can be leveraged if each team owns a service, and they typically query the logs within their service to find issues.
* **Create one partition per log type (debug, infra, and so on)**. This approach can be leveraged if most of the time, the team searches one log type per query. For example, team only queries debug logs, and typically queries other logs like Database logs and OS logs in separate queries. 

## How can I control the cost of queries in the Infrequent Tier?

The cost of queries depends on two factors: 

* **Partition size**. The partition size governs the volume of data that will be scanned by a search against it. 
* **Time range of the query**. The time range further reduces the volume of data scanned.

Using keywords or other metadata in a query will not reduce the amount of data scanned. For example, the inclusion of a keyword and custom field in the scope of the query below does not reduce the amount of data that Sumo Logic will scan. Sumo Logic will scan all data in the partition named `ybase_partition`.

```sql
_index=ybase_partition (error and cluster=nxt)
```

The table below should give you a sense of how the number of partitions you use and the query time range affects the volume of data scanned.  

| Query Time Range | Number of Partitions Queried | Data Scanned |
|:-----------------|:-----------------------------|:-------------|
| 1 day            | 1                            | 2 TB         |
| 1/2 day          | 1                            | 1 TB         |
| 4 day            | 1                            | 8 TB         |
| 1 day            | 2                            | 4 TB         |
| 1/2 day          | 2                            | 2 TB         |
| 2 days           | 2                            | 8 TB         |

There are two ways you can control the cost of running queries data in the Infrequent Tier:

* Logically apportion your data, depending on how you plan to query it, into multiple partitions, instead of creating a single large partition. Try to limit queries to a single partition as much as possible. 
* Try to use a restrictive time range, instead of running a query with very long time range. 

## What is an ideal size for a partition for Infrequent Tier?

We recommend you configure partitions to have less than 5 TB per day flowing into them. This practice:

* Reduces the cost of each query.
* Results in faster queries, since less data has to be scanned.  

## How will searching my data be affected by storing data in different tiers?

See [Searching Data Tiers](searching-data-tiers.md).

## Can I use Scheduled Searches on the lower data tiers?

Currently, you cannot use [Scheduled Searches](/docs/alerts/scheduled-searches) on the Infrequent Tier.  

## What happens to the queries with _dataTier modifier while migrating to Flex Pricing?

:::note
Users will continue to have support for the `_dataTier` modifier while still migrating to Flex pricing.
:::

After migrating to the Flex pricing, queries with the `_dataTier` modifier will continue to work as usual. The definition of `_dataTier=Continuous or Frequent or Infrequent` at the time of transition is a snapshot of the partitions that were part of the tier. This ensures a smooth transition to Flex pricing without encountering any issues.

Once the move to Flex pricing is settled, based on the convenience of Administrators and Users, it is recommended to rewrite the queries to move away from the `_dataTier` modifier to improve the scope of queries. There is currently no set time to deprecate the support for the `_dataTier` modifier in Flex pricing.
