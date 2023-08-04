---
id: dashboards
title: Viewing SLO Dashboards
sidebar_label: SLO Dashboards
description: Learn how to view and configure reliability management (SLO) dashboards.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

SLO Dashboards provide an active view into the health and status of services and systems based on your SLI and SLO configurations.<br/><img src={useBaseUrl('img/observability/slo-email-alert-click.png')} alt="Reliability Management SLO SLI" width="350"/>

After [setting up SLO monitors](/docs/observability/reliability-management-slo/create-slo/#creating-slo-monitors), you'll start receiving notifications, which you can configure to be sent to you by email, Slack channel, and other options. To begin reviewing your data for this alert in Sumo, click **View SLO Dashboard**.

The dashboard will load in Sumo Logic with that time period in view with vital information to begin investigating the service. For example, selecting the option for this error opens the following board. Here, we can review the current SLI and target, the remaining error budget, compliance settings, and review trending issues caught by the SLO.<br/><img src={useBaseUrl('img/observability/slo-dashboard-alert.png')} alt="Reliability Management SLO SLI" />


## Dashboard Metrics

Each dashboard contains the following information:<br/><img src={useBaseUrl('img/observability/slo-dash-annotated.png')} alt="Reliability Management SLO SLI" />

<table>
  <tr>
   <td><strong>A</strong>
   </td>
   <td>General information, including the SLO name/description and SLI information:
<ul>
<li><strong>Signal Type</strong>: Latency, Error, Availability, Throughput, Other</li>
<li><strong>Evaluation Type</strong>: Windows-based, Request-based</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>B</strong>
   </td>
   <td>Panels showing:
<ul>
<li><strong>Current SLI</strong>: Calculated currently tracked SLI using the configured SLI, SLO, and queries</li>
<li><strong>Target</strong>: Configured SLO target</li>
<li><strong>Error Budget Remaining (relative and absolute)</strong>: The calculated remaining budget from the configured maximum. If this value is negative, that means you've gone over your error budget limit. For example, a value of <code>0% (-2h)</code> means 2 hours more downtime than what was allowed.</li>
<li><strong>Compliance</strong>: The configured compliance as Rolling or Calendar and selected window</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>C</strong>
   </td>
   <td><strong>Error Budget Burndown</strong>: Chart tracking amount of error budget and the events that consumed it within the compliance period. Hover over any timeline to receive more information.
   </td>
  </tr>
  <tr>
   <td><strong>D</strong>
   </td>
   <td><strong>Event History</strong>: Tracked events that occurred during the compliance period as successful (good) and unsuccessful (bad) events. Hover over the chart to learn more about the total number of good or bad events, timeframe, and more.
   </td>
  </tr>
  <tr>
   <td><strong>E</strong>
   </td>
   <td><strong>Compliance History/Historical Data</strong>: Displays SLI and SLO for up to 30 compliance periods.
   </td>
  </tr>
</table>


## Setting SLO Data Granularity

### Time Ranges

To modify the time range, select and drag across dates to zoom in further. This can be useful if you want to zoom in for granular details, especially for charts with larger compliance periods.<br/><img src={useBaseUrl('img/observability/2022-08-02_14-29-19.gif')} alt="Reliability Management SLO SLI" />

### Compliance Period

You can also filter by compliance period to view your past activity and plan ahead.<br/><img src={useBaseUrl('img/observability/compliance-period-filter.png')} alt="Reliability Management SLO SLI" />

### Open in Log Search

You can launch a Log Search session directly from an SLO dashboard panel, giving you the ability to drill down into further granular details.
1. Go to **Manage Data** > **Monitoring** > **SLO**.
1. Double-click on any SLO line item.
1. Hover over the panel > Click the kebab icon > **Open in Log Search**.<br/><img src={useBaseUrl('img/observability/open-in-logsearch.png')} alt="open-in-logsearch" width="150"/>

## SLO as Log Messages

Sumo Logic continuously computes data for your SLO behind the scenes. This data, which powers your SLO dashboard, is also made available as log messages that conform to the following schema:

* `Time`: timestamp
* `sloId`: Id of the SLO, as displayed in the SLO dashboard URL
* `goodCount`: count of good requests, for request-based, and good windows for windows-based SLOs, based on SLO query definition
* `totalCount`: count of eligible requests for request-based, and eligible windows for windows-based SLOs, based SLO query definition
* `sloVersion`: version of SLO definition

View the schema by executing the following query:

```sql
_view=sumologic_slo_output sloId="<your-SLO-ID>"
| where [subquery: _view=sumologic_slo_output sloId="<your-SLO-ID>"
| max(sloVersion) as sloVersion | compose sloVersion]
-- (replace with a valid SLO Id)
```

These log messages will be delayed by one hour, as the system ensures consistency to account for ingest delay of source telemetry.


### SLO Lookup Tables

You can call a SLO Lookup Table to view all SLO metadata in your environment. These tables reside under a fixed path, `sumo://content/slos`. Data is managed and refreshed automatically on our end.

There are two ways to use it:

* To join the results of your SLO precomputed data from `_view=sumologic_slo_output` with your metadata contained in the internal lookup table based on the joining key (`sloId`, `sloVersion`):
  ```sql
  _view=sumologic_slo_output
  | lookup * from sumo://content/slos on sloId, sloVersion
  ```
* To enlist the contents of the lookup table:
  ```sql
  cat sumo://content/slos
  ```

As an example, say you had a SLO [dashboard](/docs/dashboards) and wanted to see error budget burndown from several of your apps and services combined.<br/><img src={useBaseUrl('img/observability/percent-error-remain.png')} alt="percent-error-remain" width="450"/>

You would need to create a custom graphic that combines multiple SLOs from multiple services:

1. Go to **Manage Data** > **Monitoring** > **SLO**.
1. Click on any SLO line item.
1. Hover over the **Percentage budget remaining** panel, then click the three-dot icon > **Open in Log Search**.<br/><img src={useBaseUrl('img/observability/open-in-logsearch.png')} alt="open-in-logsearch" width="150"/>
1. In the search field, enter the following snippet. This will join data from multiple sources for your lookup table.
  ```sql
  _view=sumologic_slo_output
  | lookup * from sumo://content/slos on sloId, sloVersion
  | where !isBlank (sloname) and slofolderpath matches "*"
  | concat (sloname, " (", sloId, ")") as sloUniqueName
  | sum (goodCount) as goodEvents, sum(totalCount) as totalEvents, last (compliancetarget) as target, last(slofolderpath) as sloPath, last(sliwindowsize) as sliwindowsize, last(slievaluationtype) as evaluationType by sloUniqueName
  | totalEvents - goodEvents as badEvents
  | if (evaluationType = "Window", queryTimeRange() / 1000 / sliwindowsize, totalEvents) as denominator
  | 100 * (1 - badEvents / denominator) as sli
  | 100 * (sli - target) / (100 - target) as budgetRemaining
  | fields sloUniqueName, budgetRemaining
  ```
1. Click **Add to Dashboard**.<br/><img src={useBaseUrl('img/observability/add-to-dashboard.png')} alt="add-to-dashboard" width="200"/>


## Refreshing Your Data

You can also refresh individual charts or the entire page by clicking the Reset button.<br/><img src={useBaseUrl('img/observability/reset.png')} alt="Reliability Management SLO SLI" />

To revise or review your SLO parameters, click **Go to SLO Definition** to open the specific SLO.<br/><img src={useBaseUrl('img/observability/slo-def.png')} alt="Reliability Management SLO SLI" />
