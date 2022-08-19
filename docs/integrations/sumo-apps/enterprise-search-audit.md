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


## Installing the Enterprise Search Audit App

Your administrator must enable Search Audit from Administration > Security > Policies before you can install this app.

To install the app:
1. From App Catalog, search for the Enterprise Search Audit app.
2. Click Enterprise Search Audit.
3. Click Add to Library, this will open a window. Within the window click on Advanced and choose a location to install the app.


1. Choose a location for Enterprise Search Audit in your Personal folder.
2. Click Add to Library. A dialog will confirm the app is installed successfully.


## Enterprise Search Audit App Dashboards
This page has information about the pre-built dashboards for Enterprise Search Audit App and a description of each of the app dashboards.


### Search Overview
The Enterprise Search Audit - Search Overview dashboard provides a high-level overview of search usage within your account. The panels also display current search usage in terms of the total number of queries, types of query, and other query characteristics run by users.

Use this dashboard to:
* To quickly monitor searches run in your account, including by search type.
* To get insights into query statistics, time ranges, and query failure rate.

<img src={useBaseUrl('img/integrations/sumo-apps/ESA-SearchOverview.png')} alt="test" />


### Data Tier Usage Over Time
The Enterprise Search Audit - Data Tier Usage Over Time dashboard provides detailed insights into search usage by analytics tier. It displays the total number of searches and the types of queries run by users.

Use this dashboard to:

* To drill-down on search usage by different analytics tiers.
* Quickly Identify trends and usage patterns within each analytic tier.

<img src={useBaseUrl('img/integrations/sumo-apps/ESA-DataTierUsageOverTime.png')} alt="test" />


### User Insights
The Enterprise Search Audit - User Insights dashboard provides a high-level view to understand who are the key users of search in your account. The dashboard panels provide details about search usage of top users in terms of search query count, data scanned and retrieved by tiers.

Use this dashboard to:

* Monitor top users by search count, data scanned and retrieved across the account.
* To view the distribution of query time range.
* Identify top users for each query type in every tier.

<img src={useBaseUrl('img/integrations/sumo-apps/ESA-UserInsights.png')} alt="test" />

### Commonly Referenced Data Sources
The Enterprise Search Audit - Commonly Referenced Data Sources dashboard provides insights into the key or most popular data sources and metadata referenced in users’ searches. The dashboard helps you understand what your users most commonly search for in your organization.

Use this dashboard to:

* Identify the most commonly referenced partitions (indexes) and scheduled views to gauge user adoption and awareness of these options.
* Identify the most commonly referenced source categories and other metadata in search queries to understand the most commonly used/relied upon data sources within your organization.

<img src={useBaseUrl('img/integrations/sumo-apps/ESA-CommonlyReferencedDataSources.png')} alt="test" />


### Queries Characteristics and Opportunities to Improve
The Enterprise Search Audit - Queries Characteristics and Opportunities to Improve dashboard provides information about which of your queries take and don’t take advantage of important optimization techniques and metadata to improve efficiency.

Use this dashboard to:

* Assess which optimization techniques and search best practices are most adopted by your users.
* Identify which queries span large time ranges and may be costly in terms of performance.
* To identify the searches that do not apply any optimization techniques and could benefit from optimization.

<img src={useBaseUrl('img/integrations/sumo-apps/ESA-QueriesCharacteristicsAndOpportunitiestoImprove.png')} alt="test" />
