---
id: limitations
title: Limits and Quotas
sidebar_label: Limits and Quotas
description: A reference of quotas, limitations, and maximum values across Sumo Logic services.
---

import LookupTableLimits from '../reuse/lookup-table-limits.md';
import MonitorLimits from '../reuse/monitor-limits.md';

This page lists the maximum limits and quotas for various features, services, and components within Sumo Logic.

## Log search

* **[Query length](/docs/search/get-started-with-search/build-search/keyword-search-expressions)**. Up to 15,000 characters.
* **[Results limit](/docs/search/index)**. Only the first 100,000 messages are included.
* **[Surrounding messages](/docs/search/index)**. Also limited to 100,000.
* **[Search Job API limit parameter](/docs/api/search-job)**. Max 10,000 records.
* **[Pinned searches](/docs/get-started/sumo-logic-ui-classic)**. Up to 10 per user.

### Subquery limits

* **[Maximum results from child query](/docs/search/subqueries)**. Up to 10,000 unique results (rows).
* **[Memory limit](/docs/search/subqueries)**. Up to 100 MB to return those results.
* **[Unsupported in subqueries](/docs/search/subqueries)**. Auto-refresh dashboards, Field Extraction Rules, and Scheduled Views.

### Lookup tables

<LookupTableLimits/>

* **[File size](/docs/search/lookup-tables/create-lookup-table)**. Up to 100 MB per lookup table.
* **[Row size](/docs/search/lookup-tables/create-lookup-table)**. Up to 200 KB per row.
* **[Primary key length](/docs/search/lookup-tables/create-lookup-table)**. Up to 1,024 characters.

### Concurrent search jobs

* **[Active concurrent search jobs](/docs/api/search-job/#rate-limit-throttling)**. Up to 200 per organization.

## Alerts and monitors

* **[Maximum number of monitors (active and inactive)](/docs/alerts/monitors/monitor-faq/#is-there-a-limit-to-the-number-of-monitors-i-can-have)**. Up to 5,000 (can be increased by contacting support).

<MonitorLimits/>

### Log monitors

| Plan | Max Log Monitors |
|:-------------------------|:-----------------|
| Enterprise, Trial        | 1,000            |
| Essentials, Professional | 300              |
| Free Trial               | 50               |

* **[Execution delay](/docs/alerts/monitors/overview/#log-monitors)**. 2 minutes (to account for ingestion delays).

### Metric monitors

| Plan | Max Metric Monitors |
|:-------------------------|:--------------------|
| Enterprise, Trial        | 1,500               |
| Essentials, Professional | 500                 |
| Free Trial               | 50                  |

* **[Execution delay](/docs/alerts/monitors/overview/#metrics-monitors)**. 1 minute.

### Notification grouping

* [Log monitors always group notifications.](/docs/alerts/monitors/overview/#alerts)
* [Metric monitors can group notifications, resolving when all time series return to normal.](/docs/alerts/monitors/overview/#alerts)

### Alert response

* **Related Alerts and Monitor History**. Shows the top 250 alerts.
* **Alert Visualization**. Only shown for alerts less than 30 days old.
* **Alert List**. Displays up to 1,000 alerts triggered within the past 30 days.

### Scheduled searches

* **[Maximum searches](/docs/alerts/scheduled-searches/schedule-search)**. Up to 6,000 per account.
* **[Timeout](/docs/alerts/scheduled-searches/faq/#how-do-i-prevent-my-scheduled-search-from-timing-out)**. One-third of search range (min 3 minutes, max 120 minutes).
* **[Emails per search](/docs/alerts/scheduled-searches/schedule-search)**. Up to 120 emails per day.
* **Webhook connections**. Limited to 512 records.
* **Row extraction**. Limited to 100 unique rows per trigger.

## Collectors and sources

* **[Maximum collectors per organization](/docs/send-data/installed-collectors/configuration)**. Up to 10,000.
* **[Sources per collector](/docs/send-data/installed-collectors/configuration)**. Up to 1,000.
* **[Processing rules per source](/docs/send-data/installed-collectors/configuration)**. Up to 100.
* **[Events per second](/docs/send-data/installed-collectors/configuration)**. A single installed collector can handle up to 15,000 events per second.
* **Log message size**. Messages greater than 64 KB are truncated.
* **[Fields per collector or source](/docs/manage/fields)**. Up to 10.
* **[Multiline logs](/docs/send-data/use-json-configure-sources/json-parameters-installed-sources)**. Limited to 2,000 lines or 512 KB.
* **[Maximum Cloud-to-Cloud sources](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework)**. Limited to 20 for free accounts, and 50 for all other accounts.
   * **Warning threshold**. You are warned when you reach 80% of the limit (16 sources for free accounts, 40 for other accounts).

## Dashboards

* **[Panel queries](/docs/dashboards/about)**. Up to 6 log and 6 metric queries.
* **[Queries per dashboard](/docs/dashboards/about)**. Up to 100.
* **[Data points per query](/docs/dashboards/about)**. Dashboard queries cannot return more than 1,440 data points.
* **[Query length](/docs/dashboards/about)**. Up to 10,240 characters.
* **[Time range](/docs/dashboards/about)**. Up to 32 days per panel.
* **[PDF Export timeout](/docs/dashboards/about)**. Will time out after 5 minutes if a panel takes too long to load.
* **[Template variable queries](/docs/dashboards/about)**. Up to 10 concurrent queries per user.
* **External sharing**. Dashboards shared outside an organization are view-only.
* **Time range support**. Only relative time supported (for example, Last 15 Minutes). Absolute time ranges are not supported.

## Metrics

### Metric query limits

* **Query rows**. Up to 6.
* **Query string length**. Up to 1,500 characters.
* **Operators**. Up to 60.
* **Selectors**. Up to 50.
* **Time range**. Up to 1,000 days.
* **Quantization interval**. Up to 30 days.
* **Timeshift**. Up to 1,000 days.

### Metric retention

See [Metric Ingestion and Storage](/docs/metrics/manage-metric-volume/metric-ingestion-and-storage) for details.

* **Raw data**. Retained for 30 days.
* **1-hour resolution rollups**. Retained for 13 months.

## Data management

### Field extraction

* **[Field Extraction Rules per org](/docs/manage/fields)**. Up to 200.
* **[Field name (key) length](/docs/manage/fields)**. Up to 255 characters.
* **[Field value length](/docs/manage/fields)**. Up to 200 characters.
* **[Custom field limit](/docs/manage/fields)**. Up to 400 for Enterprise and Enterprise Suite users.
* **[Shared quota](/docs/manage/fields)**. Field Extraction Rule and metadata fields share the 200-field limit.
* **Subqueries**. Not supported.
* **[HTTP request field limit](/docs/manage/fields)**. Up to 30 fields.

### Partitions

* **[Maximum partitions](/docs/manage/partitions)**. Up to 50 per account.
* **[Optimal size](/docs/manage/partitions)**. Between 1%–30% of daily ingest. Ideally, with less than 5 TB data per day flowing into each.
  * Below 1% can cause index fragmentation and degraded search performance.
  * Above 30% may reduce performance gains.
* **[Name restrictions](/docs/manage/partitions)**. Cannot start with `sumologic_` or an underscore (`_`).
* **[Routing rule length](/docs/manage/partitions)**. Up to 2,048 characters.
* **[Unsupported conditions](/docs/manage/partitions)**. Do not use the `NOT` operator or `sourceHost` when defining partitions.

### Scheduled views

* **[Maximum views](/docs/manage/scheduled-views)**. Up to 500 per account.
* **[Start date](/docs/manage/scheduled-views)**. Cannot select a date older than 365 days.
* **[Unsupported](/docs/manage/scheduled-views)**. Subqueries and Field Extraction Rules are not supported.

## Accounts and plans

### Free accounts

* **[Daily ingest](/docs/manage/manage-subscription/cloud-flex-legacy-accounts)**. 500 MB per day.
* **[Retention](/docs/manage/manage-subscription/cloud-flex-legacy-accounts)**. 7 days for logs.
* **[Storage](/docs/manage/manage-subscription/cloud-flex-legacy-accounts)**. Up to 4 GB.
* **[Users](/docs/manage/manage-subscription/cloud-flex-legacy-accounts)**. Up to 3.
* **[Continuous queries](/docs/manage/manage-subscription/cloud-flex-legacy-accounts)**. Up to 20.
* **[Dashboard panel time range](/docs/manage/manage-subscription/cloud-flex-legacy-accounts)**. Up to 7 days.

### Trial accounts

* **[Daily ingest](/docs/manage/manage-subscription/cloud-flex-legacy-accounts)**. 1 GB per day.
* **[Retention](/docs/manage/manage-subscription/cloud-flex-legacy-accounts)**. 30 days for logs.
* **[Users](/docs/manage/manage-subscription/cloud-flex-legacy-accounts)**. Up to 20 users.

### Essentials and Enterprise accounts

* **[Retention](/docs/manage/manage-subscription/sumo-logic-credits-accounts)**. Varies based on subscription.
* **[Users](/docs/manage/manage-subscription/sumo-logic-credits-accounts)**. Can be scaled to meet organizational needs.

## Users and roles

* **[Users](/docs/manage/users-roles/users)**. Up to 1,000 per account.
* **[Roles](/docs/manage/users-roles/roles)**. Up to 100 per account.
* **[Naming](/docs/manage/users-roles/roles)**. Role names must use alphanumeric characters or underscores (`_`).
* **Free accounts**. Limited to 3 users.
* **[Concurrent sessions per user](/docs/manage/security/set-limit-user-concurrent-sessions)**. Administrators can restrict each user to between 1 and 100 concurrent sessions. No limit by default.

## Cloud SIEM

* **[Signal limits](/docs/cse/rules/rules-status)**. Up to 100,000 signals/hour or 1 million/24 hours.
* **[Match list items](/docs/cse/match-lists-suppressed-lists/create-match-list)**. Up to 100,000 items per match list.
* **[Suppressed list items](/docs/cse/match-lists-suppressed-lists/suppressed-lists)**. Up to 50,000 items per suppressed list.
* **[Match list value length](/docs/cse/match-lists-suppressed-lists/create-match-list)**. Up to 2,000 characters.

## Threat intelligence

* **[Total indicators](/docs/security/threat-intelligence/threat-intelligence-indicators)**. Default storage limit is 10 million total indicators (excluding Sumo Logic-provided sources).
* **[Indicators per API call](/docs/security/threat-intelligence/about-threat-intelligence)**. Up to 100 indicators per upload call.
* **[Expired indicator retention](/docs/security/threat-intelligence/threat-intelligence-indicators)**. Up to 180 days (configurable).

## Cloud SOAR

* **[Custom fields per section](/docs/cloud-soar/overview)**. Up to 100 custom fields per section (for example, the Incidents section).
* **[Data retention — standard](/docs/cloud-soar/overview)**. Incidents, Triage, Entities, and Playbook/action executions are retained for 2 years.
* **[Data retention — HIPAA](/docs/cloud-soar/overview)**. Incidents, Triage, Entities, and Playbook/action executions are retained for 7 years.
* **[Custom retention range](/docs/cloud-soar/overview)**. Can be set between 1 day and 5,000 days.

## Platform service

* **[Playbook actions](/docs/platform-services/automation-service/about-automation-service/#actions-limit)**. Limited to 350 actions per hour per organization. Custom, Notification, Enrichment, Daemon, Scheduled, and Trigger Actions count toward this limit. User Choice, IF, and Task actions do not.

## SLO

* **[Data Retention](/docs/observability/reliability-management-slo)**. 800 days.

## APM, traces, and RUM

### Traces

* **[Spans per trace](/docs/apm/spans)**. Up to 10,000 spans per trace.
* **[Trace query retention](/docs/apm/traces/view-and-investigate-traces)**. 15 days.
* **[Unique tag names](/docs/apm/traces/view-and-investigate-traces)**. Up to 10,000 unique tag names per retention period per org.
* **Span data retention** (`_trace_spans` index). Same as default log index retention.

### Real User Monitoring (RUM)

* RUM data is stored in the `_trace_spans` index and follows the same retention as log data.

## Additional resources

* [Manage your subscription](/docs/manage/manage-subscription) — view plan details, account type comparisons, and upgrade options.
* Need a higher limit? Many limits on this page can be increased. [Contact Sumo Logic Support](https://support.sumologic.com) to request a change.
