---
id: limitations
title: Limits and Quotas
sidebar_label: Limits and Quotas
description: Reference the maximum limits and quotas across Sumo Logic, including log search, monitors, collectors, dashboards, metrics, Cloud SIEM, and Cloud SOAR.
---

import LookupTableLimits from '../reuse/lookup-table-limits.md';
import MonitorLimits from '../reuse/monitor-limits.md';

This page lists the maximum limits and quotas for various features, services, and components within Sumo Logic.

## Log search

* **Query length**. Up to 15,000 characters.
* **Results limit**. Only the first 100,000 messages are included.
* **Surrounding messages**. Also limited to 100,000.
* **Search Job API limit parameter**. Up to 10,000 records.
* **Pinned searches**. Up to 10 per user.

Learn more about [search query syntax](/docs/search/get-started-with-search/build-search/search-syntax), the [Search Job API](/docs/api/search-job), and [pinned searches](/docs/get-started/sumo-logic-ui-classic).

### Subquery limits

* **Maximum results from child query**. Up to 10,000 unique results (rows).
* **Memory limit**. Up to 100 MB to return those results.
* **Unsupported in subqueries**. Auto-refresh dashboards, Field Extraction Rules, and scheduled views are not supported.

[Learn more](/docs/search/subqueries).

### Lookup tables

<LookupTableLimits/>

* **File size**. Up to 100 MB per lookup table.
* **Row size**. Up to 200 KB per row.
* **Primary key length**. Up to 1,024 characters.

[Learn more](/docs/search/lookup-tables/create-lookup-table).

### Concurrent search jobs

* **Active concurrent search jobs**. Up to 200 per organization.

[Learn more](/docs/api/search-job/#rate-limit-throttling).

## Alerts and monitors

* **Maximum number of monitors (active and inactive)**. Up to 5,000 (can be increased by contacting Sumo Logic Support).

<MonitorLimits/>

Learn more about [monitor limits](/docs/alerts/monitors/about/#limitations) and the [maximum number of monitors](/docs/alerts/monitors/monitor-faq/#is-there-a-limit-to-the-number-of-monitors-i-can-have).

### Log monitors

| Plan | Maximum log monitors |
|:-------------------------|:-----------------|
| Enterprise, Trial        | 1,000            |
| Essentials, Professional | 300              |
| Free Trial               | 50               |

* **Execution delay**. 2 minutes (to account for ingestion delays).

[Learn more](/docs/alerts/monitors/about/#log-monitors).

### Metric monitors

| Plan | Maximum metric monitors |
|:-------------------------|:--------------------|
| Enterprise, Trial        | 1,500               |
| Essentials, Professional | 500                 |
| Free Trial               | 50                  |

* **Execution delay**. 1 minute.

[Learn more](/docs/alerts/monitors/about/#metrics-monitors).

### Notification grouping

* Log monitors always group notifications.
* Metric monitors can group notifications, resolving when all time series return to normal.

[Learn more](/docs/alerts/monitors/about/#alerts).

### Alert response

* **Related Alerts and Monitor History**. Shows the top 250 alerts.
* **Alert Visualization**. Only shown for alerts less than 30 days old.
* **Alert List**. Displays up to 1,000 alerts triggered within the past 30 days.

### Scheduled searches

* **Maximum searches**. Up to 6,000 per account.
* **Timeout**. One-third of search range (minimum 3 minutes, maximum 120 minutes).
* **Emails per search**. Up to 120 emails per day.
* **Webhook connections**. Limited to 512 records.
* **Row extraction**. Limited to 100 unique rows per trigger.

Learn more about [scheduling searches](/docs/alerts/scheduled-searches/schedule-search) and [preventing timeouts](/docs/alerts/scheduled-searches/faq/#how-do-i-prevent-my-scheduled-search-from-timing-out).

## Collectors and sources

* **Maximum collectors per organization**. Up to 10,000.
* **Sources per collector**. Up to 1,000.
* **Processing rules per source**. Up to 100.
* **Events per second**. A single installed collector can handle up to 15,000 events per second.
* **Log message size**. Messages greater than 64 KB are truncated.
* **Fields per collector or source**. Up to 10.
* **Multiline logs**. Limited to 2,000 lines or 512 KB.
* **Maximum Cloud-to-Cloud sources**. Limited to 20 for free accounts, and 50 for all other accounts.
   * **Warning threshold**. You are warned when you reach 80% of the limit (16 sources for free accounts, 40 for other accounts).

Learn more about [installed collector configuration](/docs/send-data/installed-collectors/configuration), [fields](/docs/manage/fields), [multiline settings](/docs/send-data/use-json-configure-sources/json-parameters-installed-sources), and [Cloud-to-Cloud sources](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework).

## Dashboards

* **Panel queries**. Up to six log and six metric queries.
* **Queries per dashboard**. Up to 100.
* **Data points per query**. Dashboard queries cannot return more than 1,440 data points.
* **Time range**. Up to 32 days per panel.
* **PDF export timeout**. Will time out after 5 minutes if a panel takes too long to load.
* **Template variable queries**. Up to 10 concurrent queries per user.
* **External sharing**. Dashboards shared outside an organization are view-only.
* **Unsupported time ranges**. Absolute time ranges are not supported. Only relative time ranges (for example, Last 15 Minutes) are supported.

[Learn more](/docs/dashboards/about).

## Metrics

### Metric query limits

* **Query rows**. Up to six.
* **Query string length**. Up to 1,500 characters.
* **Operators**. Up to 60.
* **Selectors**. Up to 50.
* **Time range**. Up to 1,000 days.
* **Quantization interval**. Up to 30 days.
* **Timeshift**. Up to 1,000 days.

### Metric retention

* **Raw data**. Retained for 30 days.
* **1-hour resolution rollups**. Retained for 13 months.

[Learn more](/docs/metrics/manage-metric-volume/metric-ingestion-and-storage).

## Data management

### Field extraction

* **Field name (key) length**. Up to 255 characters.
* **Field value length**. Up to 200 characters.
* **Field quota**. Field Extraction Rules and metadata fields share a quota of 200 fields. Enterprise and Enterprise Suite accounts can have up to 400 fields.
* **HTTP request field limit**. Up to 30 fields.

[Learn more](/docs/manage/fields).

### Partitions

* **Maximum partitions**. Up to 50 per account.
* **Optimal size**. Between 1%–30% of daily ingest. Ideally, with less than 5 TB of data per day flowing into each.
  * Below 1% can cause index fragmentation and degraded search performance.
  * Above 30% may reduce performance gains.
* **Name restrictions**. Cannot start with `sumologic_` or an underscore (`_`).
* **Routing rule length**. Up to 2,048 characters.
* **Unsupported**. The `NOT` operator and `sourceHost` are not supported when defining partitions.

[Learn more](/docs/manage/partitions).

### Scheduled views

* **Maximum views**. Up to 500 per account.
* **Start date**. Cannot select a date older than 365 days.
* **Unsupported**. Subqueries and Field Extraction Rules are not supported.

[Learn more](/docs/manage/scheduled-views).

## Accounts and plans

### Free accounts

* **Daily ingest**. 500 MB per day.
* **Retention**. 7 days for logs.
* **Storage**. Up to 4 GB.
* **Users**. Up to three.
* **Continuous queries**. Up to 20.
* **Dashboard panel time range**. Up to 7 days.

[Learn more](/docs/manage/manage-subscription/cloud-flex-legacy-accounts).

### Trial accounts

* **Daily ingest**. 1 GB per day.
* **Retention**. 30 days for logs.
* **Users**. Up to 20.

[Learn more](/docs/manage/manage-subscription/cloud-flex-legacy-accounts).

### Essentials and Enterprise accounts

* **Retention**. Varies based on subscription.
* **Users**. Can be scaled to meet organizational needs.

[Learn more](/docs/manage/manage-subscription/sumo-logic-credits-accounts).

## Users and roles

* **Users**. Up to 1,000 per account.
* **Roles**. Up to 100 per account.
* **Naming**. Role names must use alphanumeric characters or underscores (`_`).
* **Concurrent sessions per user**. Administrators can restrict each user to between 1 and 100 concurrent sessions. No limit by default.

Learn more about [users](/docs/manage/users-roles/users), [roles](/docs/manage/users-roles/roles), and [concurrent session limits](/docs/manage/security/set-limit-user-concurrent-sessions).

## Cloud SIEM

* **Signal limits**. Up to 100,000 signals per hour or 1 million signals per 24 hours.
* **Match list items**. Up to 100,000 per match list.
* **Suppressed list items**. Up to 50,000 per suppressed list.
* **Match list value length**. Up to 2,000 characters.

Learn more about [signal limits](/docs/cse/rules/rules-status), [match lists](/docs/cse/match-lists-suppressed-lists/create-match-list), and [suppressed lists](/docs/cse/match-lists-suppressed-lists/suppressed-lists).

## Threat intelligence

* **Total indicators**. Default storage limit is 10 million total indicators (excluding Sumo Logic-provided sources).
* **Indicators per API call**. Up to 100 per upload call.
* **Expired indicator retention**. Up to 180 days (configurable).

Learn more about [threat intelligence indicators](/docs/security/threat-intelligence/threat-intelligence-indicators) and [uploading indicators](/docs/security/threat-intelligence/about-threat-intelligence).

## Cloud SOAR

* **Custom fields per section**. Up to 100 (for example, in the Incidents section).
* **Data retention — standard**. Incidents, Triage, Entities, and Playbook/action executions are retained for 2 years.
* **Data retention — HIPAA**. Incidents, Triage, Entities, and Playbook/action executions are retained for 7 years.
* **Custom retention range**. Can be set between 1 day and 5,000 days.

[Learn more](/docs/cloud-soar/overview).

## Platform service

* **Playbook actions**. Limited to 350 actions per hour per organization. Custom, Notification, Enrichment, Daemon, Scheduled, and Trigger Actions count toward this limit. User Choice, IF, and Task actions do not.

[Learn more](/docs/platform-services/automation-service/about-automation-service/#actions-limit).

## SLO

* **Data retention**. 800 days.

[Learn more](/docs/observability/reliability-management-slo).

## Application performance monitoring

### Traces

* **Spans per trace**. Up to 10,000.
* **Trace query retention**. 15 days.
* **Unique tag names**. Up to 10,000 per retention period per org.
* **Span data retention** (`_trace_spans` index). Same as default log index retention.

Learn more about [spans](/docs/apm/spans) and [trace queries](/docs/apm/traces/view-and-investigate-traces).

### Real User Monitoring

* Real User Monitoring (RUM) data is stored in the `_trace_spans` index and follows the same retention as log data.

[Learn more](/docs/apm/real-user-monitoring/).

## Additional resources

* [Manage your subscription](/docs/manage/manage-subscription) — view plan details, account type comparisons, and upgrade options.
* Need a higher limit? Many limits on this page can be increased. [Contact Sumo Logic Support](https://support.sumologic.com) to request a change.
