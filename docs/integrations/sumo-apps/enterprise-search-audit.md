---
id: enterprise-search-audit
title: Sumo Logic Enterprise Search Audit App
sidebar_label: Enterprise Search Audit
description: The Enterprise Search Audit App provides immediate visibility into your account's search activity and helps you identify areas of improvement.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/sumo-apps/sumologic_EnterpriseSearchAudit.png')} alt="Thumbnail icon" width="75"/>

The Enterprise Search Audit App provides immediate visibility into your account's search activity and helps you identify areas of improvement. It gives an overview of search usage within your org, with a breakdown by analytic tiers and other relevant search metrics such as data scanned bytes, etc. The pre-built dashboards also help you identify opportunities for improving search performance using the Search Audit Index.

Before you can use the Enterprise Search Audit App, an administrator must first enable the feature. For more information, see Enable and Manage the Search Audit Index.

## Installing the Enterprise Search Audit app

### Prerequisite

Enable the Search Audit Index (`_view = sumologic_search_usage_per_query`) prior to installation. See [Enable the Search Audit Index](/docs/manage/security/audit-indexes/search-audit-index/#enable-the-search-audit-index) for instructions.

import AppInstallNoDataSourceV2 from '../../reuse/apps/app-install-index-apps-v2.md';

<AppInstallNoDataSourceV2/>

## Viewing Enterprise Search Audit App dashboards

This page has information about the pre-built dashboards for the Enterprise Search Audit App and a description of each of the app dashboards.

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Enterprise Search Audit - Search Overview

The **Enterprise Search Audit - Search Overview** dashboard provides a high-level overview of search usage within your account. The panels also display current search usage in terms of the total number of queries, types of queries, and other query characteristics run by users.

Use this dashboard to:
* Quickly monitor searches run in your account, including by search type.
* Get insights into query statistics, time ranges, and query failure rate.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Enterprise-Search-Audit/Enterprise-Search-Audit-Search-Overview.png')} alt="Enterprise Search Audit - Search Overview" />


### Enterprise Search Audit - Data Tier Usage Over Time

The Enterprise Search Audit - Data Tier Usage Over Time dashboard provides detailed insights into search usage by analytics tier. It displays the total number of searches and the types of queries run by users.

Use this dashboard to:

* Drill down on search usage by different analytics tiers.
* Quickly identify trends and usage patterns within each analytic tier.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Enterprise-Search-Audit/Enterprise-Search-Audit-Data-Tier-Usage-Over-Time.png')} alt="Enterprise Search Audit - Data Tier Usage Over Time" />


### Enterprise Search Audit - User Insights

The Enterprise Search Audit - User Insights dashboard provides a high-level view of your account's key search users. The dashboard panels provide information about top users' search usage in terms of search query count, data scanned and retrieved by tiers.

Use this dashboard to:

* Monitor top users by search count, data scanned, and retrieved across the account.
* View the distribution of the query time range.
* Identify top users for each query type in every tier.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Enterprise-Search-Audit/Enterprise-Search-Audit-User-Insights.png')} alt="Enterprise Search Audit - User Insights" />

### Enterprise Search Audit - Commonly Referenced Data Sources

The Enterprise Search Audit - Commonly Referenced Data Sources dashboard provides insights into the key or most popular data sources and metadata referenced in users’ searches. The dashboard helps you understand what your users most commonly search for in your organization.

Use this dashboard to:

* Identify the most commonly referenced partitions (indexes) and scheduled views to gauge user adoption and awareness of these options.
* Identify the most commonly referenced source categories and other metadata in search queries to understand the most commonly used/relied upon data sources within your organization.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Enterprise-Search-Audit/Enterprise-Search-Audit-Commonly-Referenced-Data-Sources.png')} alt="Enterprise Search Audit - Commonly Referenced Data Sources" />


### Enterprise Search Audit - Queries Characteristics and Opportunities to Improve

The Enterprise Search Audit - Queries Characteristics and Opportunities to Improve dashboard provides information about which of your queries take and don’t take advantage of important optimization techniques and metadata to improve efficiency.

Use this dashboard to:

* Assess which optimization techniques and search best practices are most adopted by your users.
To identify queries that span large time periods and are likely to be performance-intensive.
* Identify the searches that do not apply any optimization techniques and could benefit from optimization.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Enterprise-Search-Audit/Enterprise-Search-Audit-Queries-Characteristics-and-Opportunities-to-Improve.png')} alt="Enterprise Search Audit - Queries Characteristics and Opportunities to Improve" />


### Enterprise Search Audit - Failures KPIs and breakdowns

The Enterprise Search Audit - Failures KPIs and Breakdowns dashboard highlights search reliability using the Search Audit view. It shows failure rate over time and by query type/user, and surfaces top failing, slow, and high-cost queries and content to speed up troubleshooting.

Use this dashboard to:

* Track failure rate over time, segmented by query type (Interactive Search, Interactive Dashboard, Monitors, Scheduled Searches).
* Identify users and query types with the highest failure rates and volumes to target outreach and fixes.
* Surface the slowest queries by p95 (and average) execution time to prioritize performance tuning.
* Find the most expensive queries by data scanned (GB) and run count to reduce compute cost.
* Highlight content (content_name) with the most failures to focus remediation on problematic saved searches, dashboards, or monitors.
* Prioritize remediation by combining failure, latency, and cost signals to address the highest-impact issues first.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Enterprise-Search-Audit/Enterprise-Search-Audit-Failures-KPIs-And-Breakdowns.png')} alt="Enterprise Search Audit - Failures KPIs and breakdowns" />

## Create monitors for the Sumo Logic Enterprise Search Audit app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Enterprise Search Audit app alerts

| Name  | Description   | Alert Condition | Recover Condition |
|:--|:--|:--|:---|
| `Enterprise Search Audit - Data Retrieved Bytes Threshold` | This alert is triggered if the total retrieved data bytes exceed the configured threshold value in GB. | Count > 1       | Count < = 1       |
| `Enterprise Search Audit - Elevated Search Rate Failure`   | This alert is triggered when search rate failure is higher than the set alert value.           | Count > = 5     | Count < 5         |
| `Enterprise Search Audit - Query Runtime Too High`         | This alert is triggered when query runtime is higher than the set alert value.                 | Count > = 180   | Count < 180       |
| `Enterprise Search Audit - Scanned Bytes Threshold`        | This alert is triggered when query scanned bytes goes over the set threshold value.            | Count > 500     | Count < = 500     |


## Upgrade/Downgrade the Enterprise Search Audit app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Enterprise Search Audit app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
