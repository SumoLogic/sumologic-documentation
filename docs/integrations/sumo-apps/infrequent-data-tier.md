---
id: infrequent-data-tier
title: Sumo Logic Infrequent Data Tier App
sidebar_label: Infrequent Data Tier
description: The Infrequent Data Tier App provides visibility into usage and costs for data stored in the Infrequent Data Tier through intuitive, preconfigured dashboards and searches.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/sumo-apps/InfrequentDT.png')} alt="Thumbnail icon" width="75"/>

The Sumo Logic app for the Infrequent Data Tier provides visibility into on-demand search usage and associated costs through intuitive, preconfigured dashboards and searches. Infrequent Data Tiers offer an economical, fully managed log analytics solution for high-volume data that is accessed infrequently. This enables you to aggregate, store, and analyze verbose log sources, such as application debug logs, CDN logs, load balancer logs, and other infrequently accessed logs at a significantly lower cost.

With growing adoption of modern application stacks that leverage micro-services and distributed architectures, organizations are generating more and more machine data. A large part of this data is not required for everyday mission-critical operations. However, organizations still need to retain and analyze this data, as it can provide value across multiple groups within a digital enterprise. A cost-efficient solution that manages infrequently used data is currently lacking in the marketplace, forcing customers to either not retain the data or build home-grown solutions that are difficult to maintain, secure, and don’t provide easy access to insights when the enterprise needs it.

## Log types

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

You can start using the index by using the following query:

```sql
_index=sumologic_search_usage_per_query \
analytics_tier="Infrequent"
```

### Sample queries

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
   <td>Account Type </td>
   <td>Account Level   </td>
  </tr>
  <tr>
   <td>Credits </td>
   <td>Enterprise Suite </td>
  </tr>
</table>

:::

## Collecting Data for the Infrequent Data Tier App

Infrequent Data Tiers enable you to ingest log or machine data at a minimal cost per GB. Your data is securely stored by Sumo Logic and remains instantly available for on-demand, interactive analysis, without requiring any additional preparation, re-ingestion, or rehydration. This makes it ideal for quick and periodic investigations such as troubleshooting issues, analyzing code or configuration problems, and resolving customer support cases that require searching large volumes of data.

With [Infrequent Data Tiers](/docs/manage/partitions/data-tiers), you only pay for the amount of data scanned during each search. This on-demand pricing model enables cost-effective analysis of high-volume data that is accessed infrequently, ensuring you pay only for the specific datasets you analyze.

The Search Audit Index must be enabled by an administrator. To enable the Search Audit Index:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Administration**, and then under **Account Security Settings** select **Policies**. You can also click the **Go To...** menu at the top of the screen and select **Policies**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Policies**. 
1. Under **Sumo Logic Auditing**, select **Enable Search Audit Record**. <br/><img src={useBaseUrl('img/security/Search_Audit_Index_Enabled.png')} alt="Enable Search Audit Index Record checkbox" style={{border: '1px solid gray'}} width="600" />

You can verify if you already have the Search Audit Index enabled by querying:
```sql
_index=sumologic_search_usage_per_query
```

If no results are returned even for longer time ranges, it means that the Search Audit index is disabled.

## Installing the Infrequent Data Tier app

### Prerequisite

Enable the `_view = sumologic_search_usage_per_query` index before installation. See [Data Tiers](/docs/manage/partitions/data-tiers/) for instructions.

import AppInstallNoDataSourceV2 from '../../reuse/apps/app-install-index-apps-v2.md';

<AppInstallNoDataSourceV2/>

## Viewing Infrequent Data Tier dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Data Scanned Overview

The **Infrequent Data Tier - Data Scanned Overview** dashboard provides visibility into the total amount of data scanned by infrequent queries. This allows you to monitor and control on-demand search costs for the Infrequent Tier.

Use this dashboard to:

* Monitor data scan information per day.
* Analyze monthly comparisons of scanned data.
* Understand data scanned by the caller module, query type, and query status.

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

## Create monitors for the Sumo Logic Infrequent Data Tier app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Infrequent Data Tier app alerts

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Infrequent Data Tier - Caller Module Scan Dominance` | This alert is triggered if the total scanned data bytes exceed the configured threshold in GB for any caller module(API, Scheduled Search, Scheduled Views, Interactive). | Count > 1 | Count < = 1 |
| `Infrequent Data Tier - Daily Consumption Spike` | This alert is triggered when a consumption spike is detected, and daily credit usage exceeds the configured alert threshold. | Count > = 5 | Count < 5 |
| `Infrequent Data Tier - Expensive Query Detection` | This alert is triggered when the query runtime exceeds the set alert value. | Count > 0 | Count < = 0 |
| `Infrequent Data Tier - High Data Scan from Cancelled or Timed-Out Queries` | This alert is triggered when a query returns a non-successful status, indicating potential wasted credit. | Count > 0 | Count < = 0 |
| `Infrequent Data Tier - Per-User Infrequent Data Scan Over-Consumption` | This alert is triggered when unusually high cumulative scan volume is detected for a single user. | Count > 0 | Count < = 0 |


## Upgrade/Downgrade the Infrequent Data Tier app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Infrequent Data Tier app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
