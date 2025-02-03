---
slug: /manage/partitions/data-tiers
title: Data Tiers
description: Data Tiers provide the ability to allocate data to different storage tiers based on frequency of access - Continuous, Frequent, and Infrequent.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

This page describes Sumo Logic's Data Tiers feature.

:::tip
For related information, see [Data Tiers FAQ](faq.md).
:::

:::info
Data tier is only applicable for logs and not for metrics and trace data.
:::

Modern enterprises collect and analyze vast amounts of data for a variety of use cases. Sumo Logic customers use ingested data to monitor operations, troubleshoot problems, to understand and better serve customers, to ensure security, and more. 

Some use cases require “high touch” data that you need to monitor and analyze continuously or frequently. For example, you need to constantly monitor production applications, troubleshoot issues, and understand your security posture. These use cases require continuous access to data like production web server and application logs; error and warning logs; and compliance and security assurance data.

Other use cases require much less frequent data analysis. Here, we’re talking about “low touch” data that can be very valuable when you want to mine your data for insights, provide periodic reports, or perform a root cause analysis. These use cases can require frequent or infrequent access to data like development, test, and pre-production logs; debug logs; CDN logs; and network logs.

Sumo Logic’s *Data Tiers* provide a comprehensive solution for all types of data that an organization has, low touch, high touch and everything in between, at an economical price. Data Tiers provide tier-based pricing based on your planned usage of the data you ingest. 

:::note
Data Tiers must be enabled on your [Cloud Flex Legacy account](/docs/manage/manage-subscription/cloud-flex-legacy-accounts) or [Sumo Logic Credits account](/docs/manage/manage-subscription/sumo-logic-credits-accounts) plan to be able to access this functionality. Infrequent Tier, described below, is only available on Sumo Logic Credits. For more information, contact your Sumo Logic account representative.
:::

## Types of Data Tiers 

Each Sumo Logic Data Tier supports a different use case and provides its own set of features and capabilities: 

* The Continuous Tier is for the data you use to monitor and troubleshoot production applications and to ensure the security of your applications.
* The Frequent Tier - available only for Sumo Logic Enterprise Suite plans - is for data you need to frequently access to troubleshoot and investigate issues. For example, you might use the Frequent Tier for development and test data that helps you investigate issues during development. Searching the Frequent Tier is free: it's included in the data ingestion price.
* The Infrequent Tier - available only for Sumo Logic Enterprise Suite plans - is for data that is used to troubleshoot intermittent or hard-to-reproduce issues. For example, you might use the Infrequent Tier for debug logs, OS logs, thread dumps, and so on. The Infrequent Tier has a pay-per-search pricing model, and very low ingestion cost.  

## Planning your use of Data Tiers 

If you do not specify a data tier, all data ingested into Sumo Logic will go to the Continuous Tier. Only data that goes to a partition can go to the Frequent or Infrequent Tiers. You'll need to configure the target tier for the data in a partition on the **Partition** page.

When planning your use of Data Tiers, it is important to remember the following guidelines:

* The General Index cannot be changed, and it is always in the Continuous Tier.
* The tier where you assign your data governs how you can search and analyze the data. The table below shows capabilities that are available in each tier. 

The amount of data you can ingest to the Frequent or Infrequent Tier is defined by your Sumo Logic account plan. For more information, contact your Sumo Logic account representative.

:::note
After a partition is created in a given tier, you cannot change its tier. If you decide the data should be in a different tier, you must decommission the partition and create a new one.
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
| API Queries |  ![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |![check](/img/reuse/check.png) |

## Assigning data to a Data Tier

You assign data to a Data Tier at the partition level. When you create a partition, you define a routing expression and select the target tier for the data that matches the routing expression. For instructions, see [Create a Partition](/docs/manage/partitions/data-tiers/create-edit-partition).

## Searching Data Tiers 

For information about searching data tiers, see [Searching Data Tiers](searching-data-tiers.md).

## Common error messages

This section describes the most common error messages for Data Tiers.

* If you try to add a panel to a dashboard that uses data from the Frequent or Infrequent Tiers, you'll receive the following error message, because you can only use data from the Continuous Tier in a dashboard: `This query is not supported in Dashboards/Scheduled Searches because it is not in the Continuous Analytics tier. Please modify query and try again.`<br/>![create-panel.png](/img/manage/partitions-data-tiers/no-dashboard-support.png)    
* If you try to specify the scope of a Scheduled View or a Scheduled Search using a partition in the Frequent or Infrequent Data tiers, you'll receive this error message: `This query is not supported in Dashboards/Scheduled Searches because it is not in the Continuous Analytics tier. Please modify query and try again.`

## Guides

In this section, we'll introduce the following concepts:

<div className="box-wrapper" >
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/partitions/data-tier/create-edit-partition"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Create and Edit a Partition</h4></a>
  <p>Learn how to create and edit a Partition in an Index.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/partitions/data-tier/view-partition-details"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>View Details About a Partition</h4></a>
  <p>Learn how to view details about a Sumo Logic Partition.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/partitions/data-tiers"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Data Tiers</h4></a>
  <p>Get to know about Sumo Logic's Data Tiers feature.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/partitions/data-tier/data-tiers-faqs">  <img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Data Tiers FAQs</h4></a>
  <p>Get answers on various FAQs about Data Tiers.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/partitions/data-tier/searching-data-tiers"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Searching Data Tiers</h4></a>
  <p>Learn how to search specific Data Tiers.</p>
  </div>
</div>
</div>
