---
id: sumologic-limits
title: Sumo Logic Limits
sidebar_label: Sumo Logic Limits
description: Learn about the limitation of Sumo Logic objects.
---

This documents list all the maximum permissible limits for different Sumo Lpgic objects.

## Alerts and Monitors

### Log monitors

- **Enterprise and Trial plan customers**. Up to 1,000 log monitors.
- **Essentials and Professional plan customers**. Up to 300 log monitors.
- **Free Trial customers**. Up to 50 log monitors.
- **Log Monitor Query Length**. Up to 15,000 characters.
- **Execution Delay**. 2 minutes (to account for ingestion delays).

### Metric monitors

- **Enterprise and Trial plan customers**. Up to 1,500 metric monitors.
- **Essentials and Professional plan customers**. Up to 500 metric monitors.
- **Free Trial customers**. Up to 50 metric monitors.
- **Aggregate Metric Monitor**. Can evaluate up to 15,000 time series.
- **Non-aggregate Metric Monitor**. Can evaluate up to 3,000 time series.
- **Execution Delay**. 1 minute.
- **Metric Monitor Query**. Up to 6 queries.

### General monitor limits

- **Maximum number of monitors (active and inactive)**. Up to 5,000 (can be increased by contacting support).
- **Email notifications**. Up to 100 recipients.

### Notification grouping

- Log monitors always group notifications.
- Metric monitors can group notifications, resolving when all time series return to normal.

### Unsupported features in monitors

- [Receipt Time](/docs/search/get-started-with-search/build-search/use-receipt-time) is not supported.
- [LogReduce](/docs/search/behavior-insights/logreduce/logreduce-operator) and [LogCompare](/docs/search/behavior-insights/logcompare) operators are not supported.
- Monitors only support the Continuous data tier.
- [Save to Index](/docs/alerts/scheduled-searches/save-to-index) and [Save to Lookup](/docs/alerts/scheduled-searches/save-to-lookup) are not supported.
- [Search templates](/docs/search/get-started-with-search/build-search/search-templates.md) are not supported.
- [`Timeshift metrics`](/docs/metrics/metrics-operators/timeshift) operator is not supported in Metric Monitors.

### Alert response

- **Related Alerts and Monitor History**. Shows the top 250 alerts.
- **Alert Visualization**. Only shown for alerts less than 30 days old.
- **Alert List**. Displays up to 1,000 alerts triggered within the past 30 days.

### Scheduled searches

- A maximum of 6,000 Scheduled Searches are allowed per account.
- The timeout for a Scheduled Search is equivalent to 1/3rd of the search's time range, with a minimum timeout of 3 minutes and a maximum timeout of 120 minutes.
- A maximum of 120 emails can be sent per day per Scheduled Search.
- No more than 512 records returned by a Scheduled Search run are used for webhook connections.
- Scheduled Searches are limited to extracting 100 unique rows of data each time they trigger.
- Scheduled Searches *cannot* be used on the Infrequent Tier.

## Collectors and Sources

- Maximum number of collector per organization is 10,000.
- A single installed collector can handle up to 15,000 events per second.
- Log messages greater than 64KB are truncated.
- A collector or sources can have up to 10 fields.
- A collector can have up to 1,000 sources.
- Multiline logs are limited to 2000 lines or 512KB.
- Maximum of 100 processing rules per source.
- The number of Cloud-to-Cloud Sources is limited to 20 for free accounts, and 50 for all other accounts.
- You are warned when you reach 80% of the limit (16 Sources for free accounts, and 40 Sources for other accounts).

## Log Search

- Search queries are limited to 15,000 characters for search queries.
- Only the first 100,000 messages will be included in your search results. If your time range includes more than 100,000 messages, your source message may not be highlighted in the returned results.
- Surrounding messages are limited to the first 100,000 messages. If your time range includes more than 100,000 messages, your source message may not be included in your returned results.
- The maximum value for the limit parameter in the Search Job API is 10,000 records.

### Subquery limits

- Maximum of 10,000 unique results (rows) from the child query.
- Limited to 100MB of memory to return those results.
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

## Platform Service

- To prevent abuse of system resources or runaway processes the number of playbook actions your organization can execute to 350 per hour.

## Cloud SIEM

- Limit of 100K signals per hour or 1M signals for 24 hours,

## Field Extraction

- Field name limit for Field Extraction Rules is limited to 200.
- A field name (key) is limited to a maximum length of 255 characters.
- A field value is limited to a maximum length of 200 characters. 
- Enterprise and Enterprise Suite users can create a maximum of 400 fields.
- Subqueries are *not supported* in Field Extraction Rules.
- Fields created as log metadata and from Field Extraction Rules share the same quota of 200 fields.
- An HTTP request is limited to 30 fields.

## Partitions

- Maximum of 50 partitions can be created per account.
- **Optimal Size**. Between 1% and 30% of total ingest.
    - Partitions smaller than 1% may cause index fragmentation and degraded search performance.
    - Partitions larger than 30% are possible but may result in diminished performance gains.
- Partition names cannot start with `sumologic_` or an underscore `_`.
- Partition routing rule length cannot exceed 2048 characters.
- Do not use the `NOT` operator in partition definitions.
- Avoid using `sourceHost` to define partitions.
- Ideal partition size is less than 5 TB data per day flowing into them.

## Scheduled Views

- Maximum of 500 scheduled views can be created per account.
- Subqueries are not supported in Scheduled Views. 
- You cannot select a start date older than 365 days.
- Field Extraction Rules are not supported in Scheduled Views.

## Users and Roles

- Maximum of 1000 users and 100 roles can be created per account.
- Role names can only contain alphanumeric characters and underscores `_`.
- Free accounts are limited to 3 users.

## Accounts

### Free account limits

- **Daily ingest**. 500 MB per day.
- **Retention**. 7 days for logs.
- **Storage**. 4 GB total.
- **Users**. Limited to 3 users.
- **Continuous queries**. Limited to 20 queries.
- **Dashboard panel time range**. Cannot exceed 7 days. 

### Trial account limits

- **Daily ingest**. 1 GB per day.
- **Retention**. 30 days for logs.
- **Users**. Up to 20 users.

### Essentials and Enterprise account limits

- **Retention**. Varies based on subscription.
- **Users**. Can be scaled to meet organizational needs.

### Cloud Flex Legacy account limits

- **Collectors**. Maximum of 10,000 Collectors per organization.
- **Sources**. Maximum of 1,000 Sources per Collector.
- **Processing Rules**. Maximum of 100 Processing Rules per Source.
- **Continuous Queries**. Maximum of 200 queries per organization (excluding Free accounts).

### Flex account limits

#### Free flex account

- **Daily Credit Allocation**. 1.25 credits per day.
- **Retention**. 7 days for logs.
- **Users**. Limited to 3 users.

#### Trial flex aaccounts

- **Daily Credit Allocation**. 1 GB per day.
- **Retention**. 30 days for logs.
- **Users**. Up to 20 users.

## Dashboards

- Maximum of 6 log queries and 6 metric queries per panel.
- A Dashboard can have up to 100 queries.
- Dashboard queries cannot return more than 1,440 data points.
- Queries built for dashboards/panels have a limit of 10,240 characters.
- Panels are limited to a 32-day maximum time range.
- PDF export will timeout after 5 minutes if panels take too long to load. 
- Template variable queries are limited to 10 concurrent queries per user.
- Dashboards shared outside the organization are view-only.
- Panels must use relative time ranges (e.g., Last 15 Minutes). Absolute time ranges are not supported.

## SLO 

- **Data Retention**. 800 days.

## Metric

### Metric retention

| Data Type Retained | Retention Period |
|:--|:--|
| Raw                    | 30 days      |
| 1-hour resolution      | 13 months    |

### Limits for host metrics sources

- **Disk metrics**. Approximately 10 metrics are collected for each Source disk on each host.
- **Network metrics**. Network metrics are calculated per interface on each host, and approximately 4 metrics per interface are collected.
- **CPU, memory, and TCP metrics.** Approximately 10 CPU, memory, and TCP metrics are collected for each host.