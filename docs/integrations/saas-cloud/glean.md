---
id: glean
title: Glean
image: 'https://app_icons.s3.amazonaws.com/glean.svg'
tags:
  - apps
  - glean
description: The Sumo Logic app for Glean analyzes search query logs and user activity data to provide insights into knowledge discovery patterns, content engagement, and enterprise search performance across your organization.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

The Sumo Logic app for Glean, an enterprise search and knowledge management platform, enables you to analyze search query logs and user activity data. This integration helps you monitor knowledge discovery patterns, content engagement, and search performance, providing visibility into how your organization accesses and utilizes information. With this data in Sumo Logic, you can optimize search relevance, identify knowledge gaps, and improve overall productivity.

## Log and metric types

### Sample log messages

```json
{
  "timestamp": "2026-03-22T10:15:30Z",
  "user_id": "user@example.com",
  "query": "quarterly revenue report",
  "result_count": 15,
  "click_position": 2,
  "source": "confluence",
  "response_time_ms": 245
}
```

### Sample queries

```sql
_sourceCategory=glean
| json field=_raw "query" as search_query
| json field=_raw "result_count" as results
| json field=_raw "response_time_ms" as response_time
| count by search_query
| sort by _count desc
| limit 10
```

## Installing the Glean app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Glean dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Search Overview

The **Search Overview** dashboard provides insights into search activity, query patterns, and user engagement across your Glean environment.

Use this dashboard to:
* Monitor search volume trends and identify peak usage periods.
* Analyze top search queries to understand what information users are seeking.
* Track search result click-through rates and engagement metrics.
* Identify content sources that receive the most queries and clicks.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Glean/Glean-Search-Overview.png')} alt="Search Overview dashboard" style={{border: '1px solid gray'}} width="800" />

### User Activity

The **User Activity** dashboard helps you understand how users interact with Glean and what content they access.

Use this dashboard to:
* Track active users and session patterns over time.
* Identify power users and their search behaviors.
* Monitor user engagement with different content types and sources.
* Analyze search abandonment rates and refine opportunities.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Glean/Glean-User-Activity.png')} alt="User Activity dashboard" style={{border: '1px solid gray'}} width="800" />

### Performance Metrics

The **Performance Metrics** dashboard displays search performance and system health indicators for your Glean deployment.

Use this dashboard to:
* Monitor average search response times and latency trends.
* Identify slow queries that may need optimization.
* Track API performance and error rates.
* Analyze search quality metrics like zero-result queries.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Glean/Glean-Performance-Metrics.png')} alt="Performance Metrics dashboard" style={{border: '1px solid gray'}} width="800" />

## Upgrade/Downgrade the Glean app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Glean app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
