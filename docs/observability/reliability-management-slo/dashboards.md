---
id: dashboards
title: SLO Dashboards
sidebar_label: SLO Dashboards
description: Learn how to view and configure reliability management (SLO) dashboards.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Pre-built SLO Dashboards

Each SLO comes with a pre-built dashboard that provides an active view into the health and status of your SLO, including the current SLI, the remaining error budget, an error budget burndown chart as well as historical performance of your SLO.

<br/><img src={useBaseUrl('img/observability/slo-dashboard-alert.png')} alt="Reliability Management SLO SLI" />

<br/>

SLO dashboards are also the first point of investigation once you get alerted via [SLO monitors](/docs/observability/reliability-management-slo/alerts/#create-an-slo-monitor). Click **View SLO Dashboard** from the alert notifications to begin investigating the alerts on your SLOs.

<br/><img src={useBaseUrl('img/observability/slo-email-alert-click.png')} alt="Reliability Management SLO SLI" width="350"/>

### Dashboard Panels

Each SLO dashboard contains the following information:<br/><img src={useBaseUrl('img/observability/slo-dash-annotated.png')} alt="Reliability Management SLO SLI" />

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


### Setting SLO Data Granularity

#### Time Ranges

To modify the time range, select and drag across dates to zoom in further. This can be useful if you want to zoom in for granular details, especially for charts with larger compliance periods.<br/><img src={useBaseUrl('img/observability/2022-08-02_14-29-19.gif')} alt="Reliability Management SLO SLI" />

#### Compliance Period

You can also filter by compliance period to view your past activity and plan ahead.<br/><img src={useBaseUrl('img/observability/compliance-period-filter.png')} alt="Reliability Management SLO SLI" />

#### Open in Log Search

You can launch a Log Search session directly from an SLO dashboard panel, giving you the ability to drill down into further granular details.
1. Go to **Manage Data** > **Monitoring** > **SLO**.
1. Double-click on any SLO line item.
1. Hover over the panel > Click the kebab icon > **Open in Log Search**.<br/><img src={useBaseUrl('img/observability/open-in-logsearch.png')} alt="open-in-logsearch" width="150"/>

:::tip
Once opened in **Log Search**, you can click on **Add to Dashboard** button to add SLO dashboard panels to your own custom dashboards.<br/><img src={useBaseUrl('img/observability/add-to-dashboard.png')} alt="add-to-dashboard" width="200"/>
:::


## Custom SLO Dashboards

### SLO Output Data as Log Messages

Sumo Logic continuously computes data for your SLOs behind the scenes. This data, which powers your SLO dashboards, is also made available as log messages, and can be used to build custom dashboards. You can execute the following query to access your SLO data in logs:

```sql
_view=sumologic_slo_output
```

It has the following schema:

* `Time`: timestamp
* `sloId`: Id of the SLO, as displayed in the SLO dashboard URL
* `goodCount`: count of good requests, for request-based, and good windows for windows-based SLOs, based on SLO query definition
* `totalCount`: count of eligible requests for request-based, and eligible windows for windows-based SLOs, based SLO query definition
* `sloVersion`: version of SLO definition. The `sloVersion` is only changed whenever there is a change in semantics of the underlying SLI definition. Therefore, the `sloVersion` is incremented by 1 in case of following modifications only:
   * Changing <strong>Source</strong> of the SLO. Example: changing <strong>Query Based</strong> to <strong>Monitor Based</strong>.
   * Changing <strong>Evaluation Type</strong>. Example: changing <strong>Request-based</strong> to <strong>Window-based</strong> or changing <strong>Window size</strong> of SLO.
   * Any changes to SLO Queries. This includes modifying the queries, changing <strong>Query Type</strong>, changing the <strong>Use values from</strong> and changing the <strong>Success Criteria</strong>.
   * Changing <strong>Timezone</strong> of SLO. 
  
  Likewise, `sloVersion` does NOT change on modifications to fields like **Name**, **Description**, **Target**, **Compliance Type**, **Compliance Period**, **Tags**, and **Signal Type**.

:::note
These log messages may be delayed by up to an hour, as the system ensures consistency to account for ingest delay of source telemetry.
:::

### SLO Lookup Table

The SLO lookup table is a fully managed [lookup table](/docs/search/lookup-tables/create-lookup-table/#introduction-to-lookup-tables), that contains the latest definitions of all your SLOs. It can be use to enrich the data in your `sumologic_slo_output` view to build custom dashboards.

The SLO lookup table resides under a fixed path, `sumo://content/slos`. You can list all your SLOs using the log query `cat sumo://content/slos`.


To join the results of your SLO precomputed data from `_view=sumologic_slo_output` with the metadata contained in the SLO lookup table, you can use the following query:
  ```sql
  _view=sumologic_slo_output
  | lookup * from sumo://content/slos on sloId, sloVersion
  ```

### Custom Dashboard Examples

#### Error Budget Remaining for all SLOs

Say you want a high-level overview into the health of your SLOs. A honeycomb visualization on the error budget remaining percentage is a nice way to achieve that.

<br/><img src={useBaseUrl('img/observability/percent-error-remain.png')} alt="percent-error-remain" width="450"/>

You can use the following query to construct the above:

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

#### Visualize all SLOs for a service

Let's say you have multiple SLOs for your `ingestion` service and you want to visualize all of those together. You can tag all those SLOs with `service=ingestion` and then leverage your SLO tags in **Log Search** queries using the SLO lookup table. Here's the query that will return data from all your SLOs belonging to the `ingestion` service:

```sql
_view=sumologic_slo_output
| lookup tags from sumo://content/slos on sloId, sloVersion
| json field=tags "service"
| where service="ingestion"
```

Now that you have filtered the exact set of SLOs needed, all sorts of roll ups can be done using log search operators.

In general, to display all of your SLOs that have one or more tags:

```sql
CAT sumo://content/slos
| where !(tags = "{}")
```

<img src={useBaseUrl('img/observability/slo-tags-query-log.png')} alt="slo-tags-query.png" />
