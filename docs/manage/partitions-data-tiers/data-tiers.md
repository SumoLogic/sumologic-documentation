---
id: data-tiers
title: Data Tiers
description: Data Tiers provide the ability to allocate data to different storage tiers based on frequency of access - Continuous, Frequent, and Infrequent.
---


This page describes Sumo Logic's Data Tiers feature. For related information, see [Data Tiers FAQs](data-tiers-faqs.md).

:::note
The Continuous Data Tier is available in all Sumo subscriptions. Frequent and Infrequent are available only if you have Sumo Logic Enterprise Suite. 
:::

Modern enterprises collect and analyze vast amounts of data for a variety of use cases. Sumo Logic customers use ingested data to monitor operations, troubleshoot problems, to understand and better serve customers, to ensure security, and more. 

Some use cases require “high touch” data that you need to monitor and analyze continuously or frequently. For example, you need to constantly monitor production applications, troubleshoot issues, and understand your security posture. These use cases require continuous access to data like production web server and application logs; error and warning logs; and compliance and security assurance data.

Other use cases require much less frequent data analysis. Here, we’re talking about “low touch” data that can be very valuable when you want to mine your data for insights, provide periodic reports, or perform a root cause analysis. These use cases can require frequent or infrequent access to data like development, test, and pre-production logs; debug logs; CDN logs; and network logs.

Sumo Logic’s *Data Tiers* provide a comprehensive solution for all types of data that an organization has, low touch, high touch and everything in between, at an economical price. Data Tiers provide tier-based pricing based on your planned usage of the data you ingest. 

:::note
Data Tiers must be enabled on your [Cloud Flex](/docs/manage/manage-subscription/cloud-flex-accounts.md) or [Cloud Flex Credits](/docs/manage/manage-subscription/cloud-flex-credits-accounts.md) plan to be able to access this functionality. Infrequent Tier, described below, is only available on Cloud Flex Credits. For more information, contact your Sumo Logic Account Representative.
:::

## Types of Data Tiers 

Each Sumo Logic Data Tier supports a different use case and provides its own set of features and capabilities: 

* The Continuous tier is for the data you use to monitor and troubleshoot production applications and to ensure the security of your applications. 
* The Frequent tier is for data you need to frequently access to troubleshoot and investigate issues. For example, you might use the Frequent tier for development and test data that helps you investigate issues during development. Searching the Frequent tier is free: it's included in the data ingestion price.
* The Infrequent tier is for data that is used to troubleshoot intermittent or hard-to-reproduce issues. For example, you might use the Infrequent Tier for debug logs, OS logs, thread dumps, and so on. The Infrequent Tier has a pay-per-search pricing model, and very low ingestion cost.   

## Planning your use of Data Tiers 

All the data that is ingested into Sumo goes to the Continuous Tier, if no other tier has been specified. Only data that goes to a partition can go to the Frequent or Infrequent tiers. You configure the target tier for the data in a partition on the Partition page.

When planning your use of Data Tiers, it is important to remember the following guidelines:

* The General Index cannot be changed, and it is always in the Continuous Tier.
* The tier you assign your data to governs how you can search and analyze the data. The table below shows capabilities that are available in each tier. 

The amount of data you can ingest to the Frequent or Infrequent Tier is defined by your Sumo account plan. For more information, contact your Sumo Account Representative.

:::note
After a partition is created in a given tier, you can't change its tier. If you decide the data should be in a different tier, you must decommission the partition and create a new one.
:::

## Feature support by tier

How you can search and use your ingested data varies by the Data Tier it resides in, as described in the following table. 

| Feature support | Continuous Tier | Frequent Tier | Infrequent Tier |
| :-- | :-- | :-- | :-- |
| Centralized, secure, multi-tenant cloud-native platform | ![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |
| Data replication across availability zones, data encryption | ![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |
| Interactive queries (UI) | ![check](/img/reuse/check.png)<br/>Partitions can be specified, but are optional. |![check](/img/reuse/check.png)<br/>Partition or `_dataTier` must be specified. |![check](/img/reuse/check.png)<br/>Partition or `_dataTier` must be specified. |
| Support for Installed and Hosted Collectors | ![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |
| RBAC support | ![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |
| Support for search operators | ![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |
| Field Extraction Rules | ![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |
| Logs to Metrics | ![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |
| Data Forwarding | ![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |![x](/img/reuse/x.png) |
| Live Tail | ![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |
| Dashboards | ![check](/img/reuse/check.png) |![x](/img/reuse/x.png) |![x](/img/reuse/x.png) |
| Monitors | ![check](/img/reuse/check.png) |![x](/img/reuse/x.png) |![x](/img/reuse/x.png) |
| Scheduled Searches | ![check](/img/reuse/check.png) |![x](/img/reuse/x.png) |![x](/img/reuse/x.png) |
| Scheduled Views | ![check](/img/reuse/check.png) |![x](/img/reuse/x.png) |![check](/img/reuse/x.png) |
| API Queries |  ![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |![check](/img/reuse/check.png)


## How to choose between Frequent and Infrequent 

Choosing between Frequent and Infrequent for a data set depends on how frequently you need to access the data. If you expect to search the data often, the Frequent Tier, with its predictable upfront pricing model, is appropriate. Data that you expect to access less often is an ideal candidate for the Infrequent Tier, which offers low ingest cost, and competitive on-demand search pricing.

For example, for a large development team with hundreds of developers, it is better to send development and test logs to the Frequent Tier if your developers are going to access it often during development. 

In contrast, debug or other verbose log sources that are only used to troubleshoot very specific issues that occur infrequently, for example, only a couple of times a week, are better off in the Infrequent tier to keep the cost of ownership low.  

## Assigning data to a Data Tier

You assign data to a Data Tier at the partition level. When you create a partition, you define a routing expression and select the target tier for the data that matches the routing expression. For instructions, see [Add a Partition](/docs/manage/partitions-data-tiers/create-edit-partition.md).

## Searching Data Tiers 

For information about searching data tiers, see [Searching Data Tiers](searching-data-tiers.md).

## Common error messages

This section describes the most common error messages for Data Tiers.

* If you try to add a panel to a dashboard that uses data from the Frequent or Infrequent tiers, you receive the following error message, because you can only use data from the Continuous Tier in a dashboard:

    ```
    This query is not supported in Dashboards/Scheduled Searches because it is not in the Continuous Analytics tier. Please modify query and try again.
    ```

    ![create-panel.png](/img/partitions-data-tiers/no-dashboard-support.png)    

* If you try to specify the scope of a Scheduled View or a Scheduled Search using a partition in the Frequent or Infrequent Data tiers, you receive this error message:

    ```
    This query is not supported in Dashboards/Scheduled Searches because it is not in the Continuous Analytics tier. Please modify query and try again.
    ```
