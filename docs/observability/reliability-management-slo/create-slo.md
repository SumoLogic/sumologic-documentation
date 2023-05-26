---
id: create-slo
title: Create an SLO
description: Learn how to create an SLO for reliability management.
keywords:
    - _view=sumologic_slo_output
    - sloVersion
---

import useBaseUrl from '@docusaurus/useBaseUrl';

When creating an SLO, you'll need to define the following:

* SLI (service level indicator) metric you are tracking and target configuration using ratio- or threshold-based definitions
* SLO (service level objective) defining the target and duration to monitor (for example, the uptime for the target)
* Basic details for SLO name and description

You have multiple configurations for creating SLOs:

* **Measurement for SLO**: Windows of time or Requests.
* **Query type**: Metrics or Logs.
* **Calculation definition**: Ratio (tracked amount against a total) or Threshold. Instead of defining two queries to identify successful versus total events to create a Ratio, you can specify a Threshold for the Total Events query that identifies successful events.

The following table lists the available options for an SLO:

|    | Window-based      | Request-based    |
|:---------|:-----|:---------|
| **Metrics-based SLO** | Ratio and Threshold | Ratio Only   |
| **Logs-based SLO**   | Ratio and Threshold | Ratio and Threshold |

## Create an SLO (General)

1. Click **Manage Data** > **Monitoring** > **SLO** tab.
2. Click **Add** > **New SLO**. Optionally, you can also:
   * Create folders to manage your SLOs.
   * Import an SLO:
      1. To transfer data immediately and create an SLO using an import, you should first export JSON content to use that formatting. The Sumo Logic JSON format may change without notice. See [Export and Import Content in the Library](/docs/get-started/library#import-content) for complete details.
      2. Click **Manage Data**, then **Monitoring**. Select the SLO tab if not loaded.
      3. Click **Add** > **Import**.
      4. Enter a Name for the SLO.
      5. Copy and paste the JSON in the text editor.
      6. Click **Import**.<br/><img src={useBaseUrl('img/observability/slo-import.png')} alt="Reliability Management SLO SLI" />
3. Select the **Signal Type**:
    * **Latency**. Select to calculate the speed of services, lag time.
    * **Error**. Select to monitor for errors that occur in your services.
    * **Throughput**. Select to track the throughput of services and processing.
    * **Availability**. Select to monitor the uptime of services.
    * **Other**. Select to monitor any other metric or log for SLIs.<br/><img src={useBaseUrl('img/observability/slo-create-type.png')} alt="Reliability Management SLO SLI" />
4. Select the Evaluation Type which determines how the events are measured:
    * **Window-based**. Select the time frame window for the events. Window sizes should be between 1m to 60m.<br/><img src={useBaseUrl('img/observability/slo-create-window-base.png')} alt="Reliability Management SLO SLI" />
    * **Request-based.**<br/><img src={useBaseUrl('img/observability/slo-create-request-base.png')} alt="Reliability Management SLO SLI" />

Select the **Query Type** to select and build your queries for the SLI data. You have a choice of Metrics or Logs with a ratio-based (partial against the total) or threshold-based (events amount against a set threshold amount) calculation. Review [Query recommendations](#query-recommendations) before building.

Follow the instructions below based on the query type:

<table>
  <tr>
   <td>Metrics: Ratio-based
   </td>
   <td>Metrics: Threshold-based
   </td>
  </tr>
  <tr>
   <td>For <strong>Ratio-based</strong> definition, define queries for the successful or unsuccessful events to calculate against total events:
<ol>
<li>Specify Total Events query.</li>
<li>Build a query using metrics and filters. See <a href="/docs/metrics/introduction">Overview of Metrics in Sumo</a>.</li>
<li>Select the values to use from <strong>Number of data points </strong>or <strong>Metric value</strong>.</li>
<li>Configure the Total Events, including a query and values, to use <strong>Number of data points</strong> or <strong>Metric value</strong>. You can copy and paste the previous query, removing filters to get the total.</li>
</ol>
   </td>
   <td>
    For <strong>Threshold-based</strong> definitions, which calculate against success criteria:
<ol>
<li>Select <strong>Successful</strong> or <strong>Unsuccessful Events</strong> to measure.</li>
<li>Build a query using metrics and filters. See <a href="/docs/metrics/introduction">Overview of Metrics in Sumo</a> for more information.</li>
<li>For <strong>Use values from</strong>, it always uses the Metric value.</li>
<li>For <strong>Success Criteria</strong> for <strong>Avg</strong>, <strong>Min</strong>, <strong>Max</strong>, or <strong>Sum</strong> of the selected signal type (such as latency) which must be <strong>greater than</strong>, <strong>greater than or equal to</strong>, <strong>less than</strong>, or <strong>less than equal to</strong> an amount you enter (positive or negative number).</li>
</ol>
   </td>
  </tr>
</table>

<img src={useBaseUrl('img/observability/slo-metrics.gif')} alt="Reliability Management SLO SLI" />

<table>
  <tr>
   <td>Logs: Ratio-based
   </td>
   <td>Logs: Threshold-based
   </td>
  </tr>
  <tr>
   <td>For <strong>Ratio-based</strong> definitions, which calculate successful or unsuccessful events against total events:
<ol><li>Specify Total Events query.</li>
<li>Search logs selecting and entering a log query. See <a href="/docs/search/get-started-with-search/search-basics/about-search-basics">About Search Basics</a> for more information.</li>
<li>For <strong>Use values from</strong>, select the numeric value available for that query to pull data from.</li>
<li>Then configure the <strong>Total Events</strong>, including a query and values. You can copy and paste the previous query, perhaps with filters removed to get the total.</li>
</ol>
   </td>
   <td>For <strong>Threshold-based</strong> definitions, which calculate against success criteria:
<ol><li>Select <strong>Successful</strong> or <strong>Unsuccessful Events</strong> to measure.</li>
<li>Search logs selecting and entering a log query. See <a href="/docs/search/get-started-with-search/search-basics/about-search-basics">About Search Basics</a> for more information.</li>
<li>For <strong>Use values from</strong>, it always uses the Metric value.</li>
<li>For <strong>Success Criteria</strong> for <strong>Avg</strong>, <strong>Min</strong>, <strong>Max</strong>, or <strong>Sum</strong> of the selected signal type (such as latency), which must be <strong>greater than</strong>, <strong>greater than or equal to</strong>, <strong>less than</strong>, or <strong>less than equal to</strong> an amount you enter (positive or negative number).</li>
</ol>
   </td>
  </tr>
</table>

<img src={useBaseUrl('img/observability/slo-logs.gif')} alt="Reliability Management SLO SLI" />

8. Define your SLO for target amount and duration period to monitor:
    * **Target**. The value in percentage you want to target for the SLO, for example 99 for 99%.
    * **Compliance Type**. **Rolling** provides a sequence of recent days for the Compliance Period, such as the last 7d or last 30d. **Calendar** calculator over a window of time for a Week.
    * **Timezone**. Select a timezone. This is important to accurately assign events on the boundary of a compliance period, such as events received at 11:59 PM in a particular time zone.<br/><img src={useBaseUrl('img/observability/slo-create-slo.png')} alt="Reliability Management SLO SLI" />
9. Enter SLO Details, including a **Name** and **Description**. This is used in the list and for searches.<br/><img src={useBaseUrl('img/observability/slo-create-details.png')} alt="Reliability Management SLO SLI" />
10. Click **Save**. To create a monitor, click [Save and Create Monitor](#create-an-slo-monitor).


## Create an SLO from Log Search page

You can create SLOs directly from your Sumo Logic log search. This allows you to validate queries, quickly create SLOs, and re-use queries from existing dashboard panels.

1. Enter a new **Log search** query (or use an existing one).<br/><img src={useBaseUrl('img/observability/log-search.png')} alt="log search" />
1. Click the **More Actions** (kebab icon) dropdown menu.<br/><img src={useBaseUrl('img/observability/slo-more-actions-kebab.png')} alt="More Actions" width="400"/>
1. Click **Create an SLO**.<br/><img src={useBaseUrl('img/observability/slo-create.png')} alt="Create an SLO" width="150"/>

## Create an SLO from Metrics page

:::note Coming soon
You'll be able to create SLOs from Metrics Explorer.
:::

## Create an SLO from Monitors list page

Critical Monitors are great candidates to convert to SLOs. From the **Monitors** section, you can create a Monitor- and window-based SLO for a given trigger condition.

As an example, say you have an existing Monitor that fires a **Critical** alert if the latency of a customer-critical service exceeds 500ms. By creating an SLO directly through this specific Monitor, those thresholds will automatically carry over into the new SLO, saving you time and effort.

:::caution Prerequisite
Your Monitor must be in an **active** state.
:::

1. Go to **Manage Data** > **Monitoring** > **Monitors** tab.
1. Click on any active Monitor to open its panel.
1. Choose one of the methods below:<br/>Click **More Actions** > **Create SLO**.<br/><img src={useBaseUrl('img/observability/more-actions-create-slo.png')} alt="Monitor-based SLO" width="500"/>   <br/>Or, click <strong>Monitor-based SLO</strong> > <strong>Add Monitor-based SLO</strong>.<br/><img src={useBaseUrl('img/observability/add-monitor-based-slo.png')} alt="Monitor-based SLO" width="500"/><br/>
This will open the **New SLO** window.
1. **Define your SLI**. Your Monitor's **Source**, **Signal Type**, and **Trigger Event** settings will auto-populate here (you can override these if you need to).<br/><img src={useBaseUrl('img/observability/new-slo1.png')} alt="Monitor-based SLO" />
1. **Define your SLO**. Set your window-based threshold here.<br/><img src={useBaseUrl('img/observability/new-slo2.png')} alt="Monitor-based SLO" />
1. When you're done, click **Save**, which will save the SLO.<br/><img src={useBaseUrl('img/observability/new-slo4.png')} alt="Monitor-based SLO" width="350" />

To edit SLO parameters:
1. Go to the **SLO** tab, locate your SLO and click on it. (If you're unable to find it, try applying filters or go to the search bar at the top and enter the SLO name or folder name.)
1. Edit definition and other parameters.

To edit SLO parameters from a Monitor:
1. Go to the **Monitors** tab and click on any Monitor.<br/><img src={useBaseUrl('img/observability/monitors-tab.png')} alt="Monitor-based SLO" width="500" />
1. In the panel, click **Monitor-based SLO** to view the list of SLOs associated with that particular Monitor.<br/><img src={useBaseUrl('img/observability/monitor-based-slo-panel.png')} alt="Monitor-based SLO" />

:::important
Any Monitor update that changes the Monitor definition will lead to a change in the version of related SLOs. This means that the SLO history or SLI will get reset for the SLO. Example include trigger condition changes and evaluation delay changes. Changes unrelated to the definition like **Name**, **Description** will not affect the related SLOs.
:::

### SLI calculation for Monitor-based SLOs

SLIs for Monitor-based SLOs are calculated at a granularity of 1 minute. A minute is treated as unsuccessful if the Monitor threshold is violated at any point of time within that minute.

## SLO as Code

You can use the Sumo Logic Terraform provider to automate [SLO folder](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/slo_folder) and [SLO creation](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/slo). This can be useful for organizations that want to templatize SLOs, standardize SLO configuration, Monitors and dashboards and automate SLO-related workflows.

Use the [Monitor Terraform provider](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/monitor) to create Monitors associated with SLOs.
