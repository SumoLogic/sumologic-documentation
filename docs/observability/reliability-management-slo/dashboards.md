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


## Setting Granularity for SLO Time Ranges

To modify the time range, select and drag across dates to zoom in further. This can be useful if you want to zoom in for granular details, especially for charts with larger compliance periods:<br/><img src={useBaseUrl('img/observability/2022-08-02_14-29-19.gif')} alt="Reliability Management SLO SLI" />

You can also filter by compliance period to view your past activity and plan ahead:<br/><img src={useBaseUrl('img/observability/compliance-period-filter.png')} alt="Reliability Management SLO SLI" />


## Refreshing Your Data

You can also refresh individual charts or the entire page by clicking the Reset button.<br/><img src={useBaseUrl('img/observability/reset.png')} alt="Reliability Management SLO SLI" />

To revise or review your SLO parameters, click **Go to SLO Definition** to open the specific SLO.<br/><img src={useBaseUrl('img/observability/slo-def.png')} alt="Reliability Management SLO SLI" />
