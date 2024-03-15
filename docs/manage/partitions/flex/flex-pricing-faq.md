---
id: flex-pricing-faq
title: Flex FAQs
description: Answers to FAQ about Flex.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page answers frequently asked questions about Flex pricing.

## What is Flex Pricing?

import FlexPricing from '../../../reuse/flex-pricing.md';

<FlexPricing/>

## Is the Flex pricing available to existing Cloud Flex customers?

No, it is not available for the existing customers. Flex will become available for existing customers in the near future. Currently, Flex Licencing is the default plan for new customers who sign up with Sumo Logic. 

## How is Flex Pricing different from the other data tiers?

With Flex Pricing, there is no cost to ingest and index log data and no requirement to manage storage on your own or rehydrate at a premium for log indexing. This removes the complexity of predetermining the type of analytics required before that data is even in the system. Simply pay for analytics and insights, not data management.

## Can I restrict access to Flex data to select users?

You can use [Role-Based Access Control (RBAC)](/docs/manage/users-roles/roles/role-based-access-control) to restrict access to partitions in the Flex. Although you can’t use a role search filter to restrict access to a partition by name, you can filter by the metadata that forms the routing expression for a partition. 

For example, if you want to strict access to a partition whose routing expression is:

```
_sourceCategory=staging/*
```

You can create a role with this role search filter:

```
!(_sourceCategory=staging/*)
```

Then, you assign that role to any user that shouldn’t have access to data in that partition.

## How can I get visibility into our Flex search costs?

Your **Account Overview** page shows the credits your org has consumed for Flex data searches. <br/><img src={useBaseUrl('/img/subscriptions/flex-usage-categories.png')} alt="flex-usage-categories" style={{border:'1px solid gray'}} width="800"/>

## How can I optimize Flex data search costs?

There are two ways you can control the cost of running queries data in Flex:

* Logically apportion your data, depending on how you plan to query it, into multiple partitions, instead of creating a single large partition. Try to limit queries to a single partition as much as possible. Assume you have three different services sending logs to Sumo Logic. There a couple of approaches you can take:
    * **Create one partition per service**. All the logs for that service go there. This approach can be leveraged if each team owns a service, and they typically query the logs within their service to find issues.
    * **Create one partition per log type (debug, infra, and so on)**. This approach can be leveraged if, most of the time, the team searches one log type per query. For example, the team only queries debug logs, and typically queries other logs like Database logs and OS logs in separate queries. 
* Try to use a restrictive time range, instead of running a query with a very long time range. 

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

## What is an ideal size for a partition for Flex?

We recommend you configure partitions to have less than 5 TB per day flowing into them. This practice:

* Reduces the cost of each query.
* Results in faster queries, since less data has to be scanned.  