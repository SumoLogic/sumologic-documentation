---
id: infrequent-data-tier
title: Sumo Logic Infrequent Data Tier App
sidebar_label: Infrequent Data Tier
description: The Infrequent Data Tier App provides visibility into the usage and costs associated with data stored in an Infrequent Data Tier with its intuitive pre-configured dashboards and searches.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/sumo-apps/InfrequentDT.png')} alt="Thumbnail icon" width="75"/>

The Infrequent Data Tier App provides visibility into the On-demand Search usage and costs associated with Infrequent Data Tier by providing intuitive pre-configured dashboard and searches. Infrequent Data Tiers are an economical, fully managed log analytics solution for high volume, infrequently accessed data. With Infrequent Data Tiers, organizations have a solution that can aggregate, store and analyze verbose sources such as App Debug, CDN, Load Balancer, and other infrequently accessed logs at a dramatically lower price point.

With growing adoption of modern application stacks that leverage micro-services and distributed architectures, organizations are generating more and more machine data. A large part of this data is not required for every day mission-critical operations. However, organizations still need to retain and analyze this data, as it can provide value across multiple groups within a digital enterprise. A cost efficient solution that manages infrequently used data is currently lacking in the market place, forcing customers to either not retain the data or build home-grown solutions that are difficult to maintain, secure, and don’t provide easy access to insights when enterprise needs it.


## Log Types

The Search Audit Index for Infrequent Data Tier App has the following fields:

* analytics_tier
* capacity_used
* daily_capacity
* data_retrieved_bytes
* data_scanned_bytes
* execution_duration_ms
* is_aggregate
* query
* query_end_time
* query_start_time
* query_type
* remote_ip
* retrieved_message_count
* scanned_message_count
* scanned_partition_count
* session_id
* status_me

You can start using the index by using following query:

```sql
_index=sumologic_search_usage_per_query \
analytics_tier="Infrequent"
```


### Sample Query

The following query is from the **Data Scanned Over Time** panel of the **Infrequent Cost** dashboard.

```sql
_index=sumologic_search_usage_per_query analytics_tier = "Infrequent" !(user_name=*sumologic.com) !(status_message="Query Failed")
| fields data_scanned_bytes, query, is_aggregate, query_type, remote_ip, retrieved_message_count, scanned_message_count, scanned_partition_count, session_id, status_message, user_name
|data_scanned_bytes / 1Gi as sizeInGB
| timeslice 1d
| sum (sizeInGB) as total_data_scanned_GB, count as query_count by _timeslice
| fillmissing timeslice (1d)
```


## Prerequisites

:::sumo availability

Sumo Logic Infrequent Data Tier App is only available for Enterprise Suite customers.

<table>
  <tr>
   <td>Account Type
   </td>
   <td>Account Level
   </td>
  </tr>
  <tr>
   <td>Credits
   </td>
   <td>Enterprise Suite
   </td>
  </tr>
</table>

:::

## Collecting Data for the Infrequent Data Tier App

Infrequent Data Tiers enable you to ingest log or machine data for a minimal cost per GB. Your data is then securely stored by Sumo Logic and is instantly available on-demand for interactive analysis without any additional preparation, re-ingestion, or rehydration. This service is ideal when you need to quickly and/or periodically investigate issues, troubleshoot code, configuration problems, or address customer support cases which can rely on searching high volumes of data for insights. This allows you to only pay for the specific data sets that you analyze at a given time.

[Infrequent Data Tiers](/docs/manage/partitions-data-tiers/data-tiers) allow you to effectively analyze high volumes of log data that is accessed on a minimal basis. In this data tier, you pay for the amount of data scanned in each search. This on-demand payment model allows you to minimize costs by only paying the data accessed.

You can verify if you already have the Search Audit Index enabled by querying:
```sql
_index=sumologic_search_usage_per_query
```

If no results are returned even for longer time ranges, it means you don't have Search Audit index enabled.


## Installing the Infrequent Data Tier App

Complete the following instructions to install the Sumo Logic Infrequent Data Tier App.

:::note required step
Before installing the Infrequent Data Tier App, you need to enable the [Search Audit Index](/docs/manage/security/search-audit-index), which is currently in beta. Please reach out to your account executive or Sumo Logic support to get the Search Audit index enabled.
:::

{@import ../../reuse/apps/app-install.md}

## Viewing Infrequent Data Tier Dashboards

**Each dashboard has a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

You can use filters to drill down and examine the data on a granular level.


**Each panel has a set of filters** that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

<img src={useBaseUrl('img/integrations/sumo-apps/IDT_Panel_Filter.png')} alt="test" />


### Data Scanned Overview

The **Infrequent Data Tier - Data Scanned Overview** dashboard provides visibility into the total amount of data scanned by infrequent queries. This allows you to monitor and control on-demand search costs for the Infrequent Tier.

Use this dashboard to:

* Monitor data scan information per day.
* Analyze monthly comparisons of scanned data.
* Understand data scanned by caller module, query type, and query status.

<img src={useBaseUrl('img/integrations/sumo-apps/IDT_Data_Scanned_Overview.png')} alt="test" />

### Data Scanned by Users

The **Infrequent Data Tier - Data Scanned by Users** dashboard provides insights into the amount of infrequent data scanned by specific users, user trends, and the geographic locations of users.

Use this dashboard to:

* Monitor data scan information by user.
* To analyze trends in data scanned by users over a 30 day period.
* Monitor the geographical locations for data scan information.

<img src={useBaseUrl('img/integrations/sumo-apps/IDT_Data_Scanned_by_Users.png')} alt="IDT_Data_Scanned_by_Users" />

### Query Analysis

The **Infrequent Data Tier - Query Analysis** dashboard provides visibility into the Infrequent Data Tier queries that are most expensive, as well as detailed information on the queries.

Use this dashboard to:

* Identify the most expensive queries on the Infrequent Tier.
* Analyze queries executed against Infrequent Tier.

<img src={useBaseUrl('img/integrations/sumo-apps/IDT_Query_Analysis.png')} alt="IDT_Query_Analysis" />


### Credits Consumed
The **Infrequent Data Tier - Credits Consumed** dashboard provides visibility into the total amount of Cloud Flex Credits your organization has consumed with infrequent queries. This allows you to monitor and control on-demand search costs for the Infrequent Tier.

Use this dashboard to:
* Monitor credits consumed per day.
* Monitor credits consumed per user.
* Monitor the geographical locations of credit consumption.
* Identify the most expensive queries on the Infrequent Tier.

<img src={useBaseUrl('img/integrations/sumo-apps/IDT_Credits_Consumed.png')} alt="IDT_Credits_Consumed" />
