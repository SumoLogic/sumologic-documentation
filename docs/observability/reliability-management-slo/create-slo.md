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


## Create a Logs-based SLO

You can create SLOs directly from your Sumo Logic log search. This allows you to validate queries, quickly create SLOs, and re-use queries from existing dashboard panels.

1. Enter a new **Log search** query (or use an existing one).<br/><img src={useBaseUrl('img/observability/log-search.png')} alt="log search" />
1. Click the **More Actions** (kebab icon) dropdown menu.<br/><img src={useBaseUrl('img/observability/slo-more-actions-kebab.png')} alt="More Actions" width="400"/>
1. Click **Create an SLO**.<br/><img src={useBaseUrl('img/observability/slo-create.png')} alt="Create an SLO" width="150"/>

## Create a Metrics-based SLO

:::note Coming soon
You'll be able to create SLOs from Metrics Explorer.
:::

## Create a Monitor-based SLO

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

## Create an SLO Monitor

:::note Limitations
* [Alert Responses](/docs/alerts/monitors/alert-response) are not yet supported for SLO-based Monitors. Notifications will provide information and links to SLO dashboards.
* It is not possible to create an SLO on top of an SLO Monitor.
:::

Create one or more Monitors as needed for your SLO. We recommend creating separate Monitors for SLI-based and Burn Rate-based condition types. You can access SLO Monitors through your SLO Details or from the Monitors list page.

You will receive notifications according to Monitor configurations, such as email messages and Slack channel posts. Use the variable `{{SloDashboardUrl}}` in your connection payloads, which will generate an SLO dashboard link in notifications. This variable will be included automatically in email notifications.

The Alert Response page is not supported for SLO-based Monitors at this time. Notifications will provide access to the SLO dashboard when warning and critical triggers occur.

Monitor notifications may auto-resolve. See [Auto-Resolving Notifications](/docs/observability/reliability-management-slo/create-slo/#auto-resolving-notifications) for details according to the evaluation type (Windows or Request) and compliance type (Calendar or Rolling).

You can create one condition type for your SLO Monitor, either an SLI trigger or Error Budget trigger. You can create one condition type for your SLO Monitor, either a SLI condition or Error Budget condition. We support configuring a threshold value per critical and warning trigger for that condition type.

You have two options to create an SLO Monitor:
* Select **Save and Create Monitor** when creating an SLO. <br/><img src={useBaseUrl('img/observability/button-save-create-monitor.png')} alt="Reliability Management SLO SLI" />
* Go to the **Monitors** tab, select **Add** > **New Monitor**, then select the SLO option. <br/><img src={useBaseUrl('img/observability/button-new-monitor.png')} alt="Reliability Management SLO SLI" />

When you click **Save and Create Monitor**, a New Monitor dialog loads:
1. For the **Monitor Type**, select **SLO**. When creating from the **Monitors** tab, select an SLO from the dropdown menu. A preview of the SLO loads on the page. <br/><img src={useBaseUrl('img/observability/ani-new-monitor1.gif')} alt="Reliability Management SLO SLI" />
2. Select and configure a Condition Type:
   * For the **SLI Condition Type**, you can select to alert when the SLI is below an entered percentage, as it nears your SLI target. For example, you could set this to 99.1% to raise a critical alert when it is getting close to a target of 99%. <br/><img src={useBaseUrl('img/observability/slo-monitor-sli.png')} alt="Reliability Management SLO SLI" width="200"/>
   * For the **Burn Rate Condition Type**, create an alert indicating Critical and Warning conditions based on burn rate or the rate at which error budget is depleted. Enter a percentage depleted within an amount of minutes, hours, or days. For example, a critical alert for 10% depletion within 3 hours indicates the error budget is depleting quickly.<br/><img src={useBaseUrl('img/observability/slo-monitor-burn.png')} alt="Reliability Management SLO SLI" width="350"/>
3. Under **Notifications**, select your preferred **Connection Type** for sending messages via email, Slack, webhook, or other methods. Select **Alert** and/or **Recovery** to notify for **Critical** and **Warning** triggers. You can add as many notifications as needed. A message is sent with a link to the SLO dashboard to investigate.<br/><img src={useBaseUrl('img/observability/slo-monitor-notifications.png')} alt="Reliability Management SLO SLI" />

  For example, to set up a Slack notification, select **Slack** from the dropdown menu and edit the **Payload** as needed. The following information shows the default settings: <br/><img src={useBaseUrl('img/observability/slack-payload.png')} alt="Reliability Management SLO SLI" />
4. For **Monitor Details**, enter the following information:
    * **Name**. Name for the Monitor.
    * **Location**. Path for the Monitor, default is /Monitor.
    * **Description**. Optional description for the Monitor.
    * **Playbook**. Optional playbook for handling these Monitors and situations if an issue occurs.<br/><img src={useBaseUrl('img/observability/slo-monitor-detals.png')} alt="Reliability Management SLO SLI" />
5. Click **Save**.


### Auto-Resolving Notifications

SLO Monitors in a triggered state can auto-resolve. See the following table for details.

<table><small>
  <tr>
   <td>EvaluationType
   </td>
   <td>ComplianceType
   </td>
   <td>MonitorConditionType
   </td>
   <td>Auto-resolves
   </td>
  </tr>
  <tr>
   <td>Window
   </td>
   <td>Calendar
   </td>
   <td>SLITrigger
   </td>
   <td>No. SLI never recovers within the same compliance period as the triggered alert, but it can recover in a different compliance period. So the Monitor can auto-resolve then. New alert is created for each compliance period. Monitor status is based on latest compliance period’s alert status.
   </td>
  </tr>
  <tr>
   <td>Window
   </td>
   <td>Calendar
   </td>
   <td>ErrorBudgetTrigger
   </td>
   <td>Yes, if the error budget consumed is less than the alert threshold for a complete detection window. Resolution behavior is same as log monitors.
   </td>
  </tr>
  <tr>
   <td>Window
   </td>
   <td>Rolling
   </td>
   <td>SLITrigger
   </td>
   <td>Same as “Window-Calendar”. Separate alert is triggered for each compliance period.
   </td>
  </tr>
  <tr>
   <td>Window
   </td>
   <td>Rolling
   </td>
   <td>ErrorBudgetTrigger
   </td>
   <td>Same as “Window-Calendar”.
   </td>
  </tr>
  <tr>
   <td>Request
   </td>
   <td>Calendar
   </td>
   <td>SLITrigger
   </td>
   <td>Yes, when SLI value goes above alert threshold. A new alert is created for each compliance period. Monitor status is based on the latest compliance period’s alert status.
   </td>
  </tr>
  <tr>
   <td>Request
   </td>
   <td>Calendar
   </td>
   <td>ErrorBudgetTrigger
   </td>
   <td>Same as “Window-Calendar”.
   </td>
  </tr>
  <tr>
   <td>Request
   </td>
   <td>Rolling
   </td>
   <td>SLITrigger
   </td>
   <td>Same as “Request-Calendar”. Separate alert for each compliance period.
   </td>
  </tr>
  <tr>
   <td>Request
   </td>
   <td>Rolling
   </td>
   <td>ErrorBudgetTrigger
   </td>
   <td>Same as “Window-Calendar”.
   </td>
  </tr></small>
</table>



#### Notification Example

When a notification is sent, it includes information from the alert and a link to load the dashboard. Below is an example of a critical alert email notification. See [SLO Dashboards](/docs/observability/reliability-management-slo/dashboards) for information.<br/><img src={useBaseUrl('img/observability/slo-email-alert.png')} alt="Reliability Management SLO SLI" width="350"/>


#### Resolution Email Example

<img src={useBaseUrl('img/observability/resolution-email.png')} alt="Reliability Management SLO SLI" width="350"/>

### Installing AWS SLO Alerts via Terraform

AWS ELB users can now install Sumo Logic out-of-the-box SLOs and associated Monitors using [this Sumo Logic Terraform script](https://github.com/SumoLogic/sumologic-solution-templates/tree/master/slo_packages/aws).

The script allows you to install Sumo Logic SLOs in your specified AWS ELB directory and configure SLO alert notifications (e.g., latency limit breached, server error limit breached). Once installed, you can view and edit your SLO alerts via Terraform or from your Sumo Logic **Monitors** page.

## SLO as Code

You can use the Sumo Logic Terraform provider to automate [SLO folder](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/slo_folder) and [SLO creation](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/slo). This can be useful for organizations that want to templatize SLOs, standardize SLO configuration, Monitors and dashboards and automate SLO-related workflows.

Use the [Monitor Terraform provider](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/monitor) to create Monitors associated with SLOs.


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

As an example, say you had a SLO [dashboard](/docs/dashboards-new) and wanted to see error budget burndown from several of your apps and services combined.<br/><img src={useBaseUrl('img/observability/percent-error-remain.png')} alt="percent-error-remain" width="450"/>

You would need to create a custom graphic that combines multiple SLOs from multiple services:

1. Go to **Manage Data** > **Monitoring** > **SLO**.
1. Click on any SLO line item.
1. Hover over the **Percentage budget remaining** panel, then click the three-dot icon > **Open in Log Search**.<br/><img src={useBaseUrl('img/observability/open-in-logsearch.png')} alt="open-in-logsearch" width="150"/>
1. In the search field, enter the following snippet. This will join data from multiple sources for your lookup table.
  ```sql
  _view=sumologic_slo_output
  | lookup * from sumo: //content/slos on sloId, sloVersion
  | where !isBlank (sloname) and slofolderpath matches "*"
  | concat (sloname, " (", sloId, ")") as sloUniqueName
  | sum (goodCount) as goodEvents, sum(totalCount) as totalEvents, last (compliancetarget) as target, last(slofolderpath) as sloPath, last(sliwindowsize) as sliwindowsize, last(slievaluationtype) as evaluationType by s1oUniqueName
  | totalEvents - goodEvents as badEvents
  | if (evaluationType = "Window", queryTimeRange() / 1000 / sliwindowsize, totalEvents) as denominator
  | 100 * (1 - badEvents / denominator) as sli
  | 100 * (sli - target) / (100 - target) as budgetRemaining
  | fields sloUniqueName, budgetRemaining
  ```
1. Click **Add to Dashboard**.<br/><img src={useBaseUrl('img/observability/add-to-dashboard.png')} alt="add-to-dashboard" width="200"/>
