---
id: sumo-logic-limits
title: Sumo Logic Limits and Quotas Reference
sidebar_label: Limits and Quotas
description: A comprehensive reference of quotas, limitations, and maximum values across Sumo Logic services.
---

This page lists the baseline limits and quotas for various features, services, and components within Sumo Logic.

## Alerts and monitors

- **[Maximum number of monitors (active and inactive)](/docs/alerts/monitors/monitor-faq/#is-there-a-limit-to-the-number-of-monitors-i-can-have)**. Up to 5,000 (can be increased by contacting support).
- **[Email notifications](/docs/alerts/monitors/overview/#general)**. Up to 100 recipients.

### Log monitors

| [Plan](/docs/alerts/monitors/overview/#log-monitors) | Max Log Monitors |
|:-------------------------|:-----------------|
| Enterprise, Trial        | 1,000            |
| Essentials, Professional | 300              |
| Free Trial               | 50               |

- **[Query length](/docs/alerts/monitors/overview/#general)**. Up to 15,000 characters.
- **[Execution delay](/docs/alerts/monitors/overview/#general)**. 2 minutes (to allow for ingestion lag).

### Metric monitors

| [Plan](/docs/alerts/monitors/overview/#metrics-monitors) | Max Metric Monitors |
|:-------------------------|:--------------------|
| Enterprise, Trial        | 1,500               |
| Essentials, Professional | 500                 |
| Free Trial               | 50                  |

- **[Aggregate monitor](/docs/alerts/monitors/overview/#general)***. Can evaluate up to 15,000 time series.
- **[Non-aggregate monitor](/docs/alerts/monitors/overview/#general)**. Can evaluate up to 3,000 time series.
- **[Execution delay](/docs/alerts/monitors/overview/#metrics-monitors)**. 1 minute.
- **[Query limit](/docs/alerts/monitors/overview/#general)**. Up to 6 queries.

### Notification grouping

- **[Log monitors](/docs/alerts/monitors/overview/#alerts)**. Always group notifications.
- **[Metric monitors](/docs/alerts/monitors/overview/#alerts)**. Can group notifications, resolving when all time series return to normal.

### Unsupported features in monitors

- **[Receipt Time](/docs/search/get-started-with-search/build-search/use-receipt-time)**. Not supported.
- **[LogReduce](/docs/search/behavior-insights/logreduce/logreduce-operator) and [LogCompare](/docs/search/behavior-insights/logcompare) operators**. Not supported.
- **[Frequent](/docs/manage/partitions/data-tiers) and [Infrequent](/docs/manage/partitions/data-tiers) data tiers**. Not supported. <!-- what about Flex? -->
- **[Save to Index](/docs/alerts/scheduled-searches/save-to-index) and [Save to Lookup](/docs/alerts/scheduled-searches/save-to-lookup)**. Not supported.
- **[Search templates](/docs/search/get-started-with-search/build-search/search-templates.md)**. Not supported.
- **[`timeshift` metrics operator](/docs/metrics/metrics-operators/timeshift)**. Not supported in Metric Monitors.

### Alert response

- **Related Alerts and Monitor History**. Shows the top 250 alerts.
- **Alert Visualization**. Only shown for alerts less than 30 days old.
- **Alert List**. Displays up to 1,000 alerts triggered within the past 30 days.

### Scheduled searches

- **Maximum searches**. Up to 6,000 per account.
- **Timeout**. One-third of search range (min 3 minutes, max 120 minutes).
- **Emails per search**. Up to 120 emails per day.
- **Webhook connections**. Limited to 512 records.
- **Row extraction**. Limited to 100 unique rows per trigger.
- **Infrequent Data Tier**. Not supported.

## Collectors and Sources

- Maximum number of collector per organization is 10,000.
- A single installed collector can handle up to 15,000 events per second.
- Log messages greater than 64KB are truncated.
- A collector or sources can have up to 10 fields.
- A collector can have up to 1,000 sources.
- Multiline logs are limited to 2000 lines or 512KB.
- Maximum of 100 processing rules per source.
- The number of Cloud-to-Cloud Sources is limited to 20 for free accounts, and 50 for all other accounts.
- You are warned when you reach 80% of the Cloud-to-Cloud Sources limit (16 Sources for free accounts, and 40 Sources for other accounts).

## Log Search

- **Query length**. Up to 15,000 characters.
- **Results limit**. Only the first 100,000 messages are included. If your time range includes more than 100,000 messages, your source message may not be highlighted in the returned results.
- **Surrounding messages**. Also limited to 100,000. If your time range includes more than 100,000 messages, your source message may not be included in your returned results.
- **Search Job API limit parameter**. Max 10,000 records.

### Subquery limits

- Up to 10,000 unique results (rows) from the child query.
- Up to 100MB of memory to return those results.
- Subqueries are not supported in:
    - Auto-refresh dashboards.
    - Field Extraction Rules.
    - Scheduled Views.

### Metric query limits

|Property|Limit|Error Message|
|:---|:---|:---|
|Query Rows|6|Too many query rows ([number of rows]). The limit is: [limit].|
|Query String Length|1500 chars|Too long ([queryLength] characters). The limit is: [limit].|
|Max Number of Operators|60|Too many operators: [number of operators]. The maximum number of possible operators is: [limit].|
|Max Number of Selectors|50|Too many selectors: [number of selectors]. The maximum number of possible selectors is: [limit].|
|Max Time Range|1000d|The given time range was invalid.|
|Max Quantization Interval|30d|The given quantization was too big.|
|Max Timeshift|1000d|The given timeshift was too big.|

## Platform service

- **Playbook actions**. Limited to 350 actions per hour per organization.

## Cloud SIEM

- **Signal limits**. Up to 100,000 signals/hour or 1 million/24 hours.

## Field extraction

- **Field name limit**. Up to 200 Field Extraction Rules per org.
- **Field name (key) length**. Up to 255 characters.
- **Field value length**. Up to 200 characters.
- **Custom field limit**. Up to 400 for Enterprise and Enterprise Suite users.
- **Shared quota**. Field Extraction Rule and metadata fields share the 200-field limit.
- **Subqueries**. Not supported.
- **HTTP request field limit**. Up to 30 fields.

## Partitions

- **Maximum partitions**. Up to 50 per account.
- **Optimal size**. Between 1%–30% of daily ingest. Ideally, with less than 5 TB data per day flowing into them.
  - Below 1% can cause index fragmentation and degraded search performance.
  - Above 30% may reduce performance gains.
- **Name restrictions**. Cannot start with `sumologic_` or an underscore (`_`).
- **Routing rule length**. Up to 2048 characters.
- **Unsupported conditions**. Do not use the `NOT` operator or `sourceHost` when defining partitions.

## Scheduled views

- **Maximum views**. Up to 500 per account.
- **Start date**. Cannot select a date older than 365 days.
- **Unsupported**. Subqueries and Field Extraction Rules are not supported.

## Users and roles

- **Users**. Up to 1,000 per account.
- **Roles**. Up to 100 per account.
- **Naming**. Role names must use alphanumeric characters or underscores (`_`).
- **Free accounts**. Limited to 3 users.

## Accounts

### Free accounts

- **Daily ingest**. 500 MB per day.
- **Retention**. 7 days for logs.
- **Storage**. Up to 4 GB.
- **Users**. Up to 3.
- **Continuous queries**. Up to 20.
- **Dashboard panel time range**. Up to 7 days.

### Trial accounts

- **Daily ingest**. 1 GB per day.
- **Retention**. 30 days for logs.
- **Users**. Up to 20 users.

### Essentials and Enterprise accounts

- **Retention**. Varies based on subscription.
- **Users**. Can be scaled to meet organizational needs.

### Cloud Flex Legacy accounts

- **Collectors**. Maximum of 10,000 Collectors per organization.
- **Sources**. Maximum of 1,000 Sources per Collector.
- **Processing Rules**. Maximum of 100 Processing Rules per Source.
- **Continuous Queries**. Maximum of 200 queries per organization (excluding Free accounts).

### Flex accounts

#### Free flex accounts

- **Daily Credit Allocation**. 1.25 credits per day.
- **Retention**. 7 days for logs.
- **Users**. Limited to 3 users.

#### Trial flex accounts

- **Daily Credit Allocation**. 1 GB per day.
- **Retention**. 30 days for logs.
- **Users**. Up to 20 users.

## Dashboards

- **Panel queries**. Up to 6 log and 6 metric queries.
- **Queries per dashboard**. Up to 100.
- **Data points per query**. Dashboard queries cannot return more than 1,440 data points.
- **Query length**. Queries built for dashboards/panels have a limit of 10,240 characters.
- **Time range**. Up to 32 days per panel.
- **PDF Export timeout**. Will timeout after 5 minutes if a panel takes too long to load.
- **Template variable queries**. Up to 10 concurrent queries per user.
- **External sharing**. Dashboards shared outside an organization are view-only.
- **Time range support**. Only relative time supported (e.g., Last 15 Minutes). Absolute time ranges are not supported.

## SLO

- **Data Retention**. 800 days.

## Metric

### Metric retention

| Data Type Retained | Retention Period |
|:--|:--|
| Raw                    | 30 days      |
| 1-hour resolution      | 13 months    |

### Host metric source limits

- **Disk metrics**. Approximately 10 metrics are collected for each Source disk on each host.
- **Network metrics**. Network metrics are calculated per interface on each host, and approximately 4 metrics per interface are collected.
- **CPU, memory, and TCP metrics**. Approximately 10 CPU, memory, and TCP metrics are collected for each host.
