---
id: reliability-management-slo
title: Reliability Management
sidebar_label: reliability-management-slo
description: Learn more about SLOs, SLIs, and Reliability Management. Access and create SLOs, configuring queries, setting SLIs, and create SLO Monitors. Learn about SLO dashboards and notifications.
---

This guide provides an overview of Sumo Logic Reliability Management using Service Level Objectives (SLOs).

To work with SLOs, you need the following Sumo Logic capabilities:
* View SLOs (`viewSlos`)
* Manage SLOs (`manageSlos`) permissions

:::info
[Alert Response](/docs/alerts/monitors/alert-response) is not supported for SLO-based monitors. Notifications will provide information and links to SLO dashboards.
:::

**Max Compliance Period**

See the following information for the max compliance period:

<table>
  <tr>
   <td>
   </td>
   <td>Logs-based SLO
   </td>
   <td>Metrics-based SLO
   </td>
  </tr>
  <tr>
   <td>Maximum compliance period
   </td>
   <td>Rolling compliance: 90d. Calendar compliance: 1 Quarter.
   </td>
   <td>Rolling compliance: 90d. Calendar compliance: 1 Quarter.
   </td>
  </tr>
  <tr>
   <td>Threshold-based SLO definition
   </td>
   <td>Supported for both-Window and Request-based Evaluation
   </td>
   <td>Supported for Window-based Evaluation only
   </td>
  </tr>
</table>





## About Service Level Objectives (SLOs)

Ensuring reliable experience for end users is the key outcome for Observability. In complex systems, apps, service and infrastructure tend to fail in unpredictable ways resulting in a storm of potentially meaningless alerts. Reliability, as formalized in Service Level Objectives (SLOs), helps developers focus on monitoring and troubleshooting the end user experience.

Sumo Logic Reliability Management helps SRE and product teams define SLOs and monitor them through alerts and dashboards.


What is reliability? Typically, reliability is the uptime of systems and services. This includes the following concepts:
* **Compliance period**: A duration of time to monitor and score your system/service availability.
* **Service Level Indicator (SLI)**: Quantitative measurement of a system/service availability for end users.
* **Service level objective (SLO)**: The goal defined on the SLI for a compliance period.
* **Error Budget**: The tolerable amount/level of system unavailability in the compliance period.


For example, the checkout-service in a typical eCommerce app may consider successful (good) transactions to be completed in < 500ms. A successful 5m window may be one in which the p99 of latency is < 500ms. The SLI may be defined as the percentage of successful 5 minute (5m) windows in a compliance period of 30 days (30d) or equal to 99.9% for any month. The number of unsuccessful (bad) transactions we allow as an error budget is 0.1% of these 5m windows in 30d.

The following chart shows our calculations and an example 5m window for the month of January where a number of requests were unsuccessful due to a greater than 600ms completion:


4


With these calculations, we can configure an SLO, add a monitor, and start managing this and other services with ease. This is just one example. You can develop many different SLOs based on evaluation types (windows-based and request-based), ratios and thresholds for calculations, and error budgets for rolling or calendar compliance periods.

SLOs include all historical data. For example, when you create an SLO with a monthly range part-way into a month, collected historical data to the beginning of that month is also evaluated and displayed.


### SLO Evaluation Types

SLOs can be calculated and tracked using windows-based or request-based data.


* **Windows-based** SLOs track on a given window of time or interval, such as 5m, 1h, and so on. An SLI calculated against this time will include the percentage of good and bad windows.
* **Request-based** SLOs track the percentage of good requests within a compliance period. Request based SLOs can exhaust the error budget very quickly if you have severe incidents. However,  they smooth over SLIs that are unpredictable by focussing SLOs on a longer time range than a windows-based SLO.


### Golden Signal Types
6
SLIs may be defined on  latency, error, throughput, availability, and other actions. For detailed information, see the [Google SRE Handbook](https://sre.google/sre-book/preface/) for the golden signals of load, latency, bottleneck, and errors.


#### Latency

Latency is considered the speed of a service. This is the response of the service to users for different types of actions, including:

* Interactions: How long a user waits for a response after clicking something, sometimes a read action
* Write: Saving and changing underlying data to a server, database, or distributed system
* Background: Backend actions that may not readily be seen or recognized by users, typically for refreshes of data or asynchronous actions

Each of these actions may have different latencies and thresholds for good and bad thresholds. A user may not expect a faster response when writing data versus an interaction to read or retrieve data. You may also have defined latencies for each of these actions, such as a defined median of speed, typical latency, and tail latency.


#### Error


Systems and services include numerous errors beyond web errors, including custom errors, library errors, API errors, custom services, and edge cases. The errors SLI allows you to track specific errors in your system, focusing on key services or error types, to find and resolve issues. To best manage your SLO for errors, clearly define the errors you need to monitor and receive alerts on. Recalculate and refine your SLIs over time to best respond to organization and user needs.


#### Throughput

Throughput is the rate of processing by a service or system. Depending on the type of data and service, a data processing system may require more time to process. Bytes per second is a common measurement for processing, and tracking these SLIs can indicate a need for data processing partitions, more support and processors, and so on.


#### Availability

Availability indicates if a service is working and handling valid requests. Other systems, services, even virtual storage all have potential metrics to track with SLIs. The other option gives you the ability to include different SLOs based on your specific business needs.


## Access and Create SLOs

This guide provides information to access and create SLOs.


### Access SLOs

Access SLOs through the SLO tab. Select **Manage Data**, then **Monitoring**. Select the **SLO** tab to view, search, and add SLOs. Use folders to collect, package, and manage SLOs with ease, moving SLOs as needed.

To locate an SLO, use the search that returns a list of SLOs based on the name and description.

To open the dashboard, locate and select an SLO. The details pane gives you a preview and an option to **Open SLO Dashboard**. See [SLO Dashboards and Notifications](https://help.sumologic.com/Beta/SLO_Reliability_Management/SLO_Dashboards_and_Notifications) for more information.


#### SLO Preview

Select an SLO to see a quick preview including the configuration details, targets, queries, any associated monitors, and general information. The previewing includes the SLO Details and Monitors tabs.

* **Open SLO Dashboard**: Access the Dashboard to monitor and investigate data
* **Open**: Open this SLO to review and edit
* **More Options**: Access additional options to Edit, Copy Path, Duplicate, Move, Export, and Delete the SLO

The **SLO Details** tab provides a quick view of the SLO ID, description, configurations, and creation information.

The **Monitors** tab provides a list of associated monitors for the SLO. Expand entries to review the status, condition, and configured triggers. Select
15
to open and edit the monitor.


16



#### Query recommendations

The heart of an SLO is the queries used for the SLI query types including metrics and logs.

**General Information**

For general information on querying metrics and logs, see [Overview of Metrics in Sumo](https://help.sumologic.com/Metrics/Introduction-to-Metrics/01Overview-of-Metrics-in-Sumo) and [About Search Basics](/docs/search/Get-Started-with-Search/Search-Basics/About-Search-Basics).

A preview runs the query in real-time to help test and refine results, with a time range to see broader results as needed.

**Aggregation Queries**

You cannot use aggregate log queries to define your SLO because such queries summarize data and lose the concept of time. Aggregation occurs through the SLO backend and is not required in the query, for example avg(latency) < 500 ms or "successful event must have latency below 50ms".

**Quantize Queries**

Do not use quantize in queries as it is handled by the SLO backend based on the window duration.


### Create an SLO
18
 create-an-slo}

When creating an SLO, define the following:

* SLI metric you are tracking and target configuration using ratio- or threshold-based definitions
* SLO defining the target and duration to monitor (for example the uptime for the target)
* Basic details for SLO name and description

You have multiple configurations for creating SLOs:

* **Measurement for SLO**: Windows of time or Requests
* **Query type**: Metrics or Logs
* **Calculation definition**: Ratio (tracked amount against a total) or Threshold \
Instead of defining two queries to identify successful versus total events to create a Ratio, you can specify a Threshold for the Total Events query that identifies successful events.

The following table lists the available options for an SLO:

<table>
  <tr>
   <td>
   </td>
   <td>Windows-based
   </td>
   <td>Request-based
   </td>
  </tr>
  <tr>
   <td>Metrics-based SLO
   </td>
   <td>Ratio and Threshold
   </td>
   <td>Ratio Only
   </td>
  </tr>
  <tr>
   <td>Logs-based SLO
   </td>
   <td>Ratio and Threshold
   </td>
   <td>Ratio and Threshold
   </td>
  </tr>
</table>


To create a new SLO:



1. Click **Manage Data**, then **Monitoring**. Select the **SLO** tab if not loaded.
2. Click **Add** then **New SLO**. You can also create folders to manage your SLOs.You also have an option to import content. See [Import SLO](https://help.sumologic.com/Beta/SLO_Reliability_Management/Access_and_Create_SLOs#Import_SLO).
3. Select the Signal Type:
    * **Latency**. Select to calculate the speed of services, lag time.
    * **Error**. Select to monitor for errors that occur in your services.
    * **Throughput**. Select to track the throughput of services and processing.
    * **Availability**. Select to monitor the uptime of services.
    * **Other**. Select to monitor any other metric or log for SLIs. \

19

4. Select the Evaluation Type which determines how the events are measured:
    * **Window-based**. Select the time frame window for the events. Window sizes should be between 1m to 60m. \

20

    * **Request-based. \
**
21




5.
Select the **Query Type **to select and build your queries for the SLI data. You have a choice of Metrics or Logs with a ratio-based (partial against the total) or threshold-based (events amount against a set threshold amount) calculation. Review [Query recommendations](https://help.sumologic.com/Beta/SLO_Reliability_Management/Access_and_Create_SLOs#Query_recommendations) before building. \
 \
Follow the instructions below based on the query type: \


<table>
  <tr>
   <td>Metrics: Ratio-based
   </td>
   <td>Metrics: Threshold-based
   </td>
  </tr>
  <tr>
   <td>
    For <strong>Ratio-based</strong> definition, define queries for the successful or unsuccessful events to calculate against total events:
<ol>

<li>Select <strong>Successful</strong> or <strong>Unsuccessful Events</strong> to measure.</li>

<li>Build a query using metrics and filters. See <a href="https://help.sumologic.com/Metrics/Introduction-to-Metrics/01Overview-of-Metrics-in-Sumo">Overview of Metrics in Sumo</a>.</li>

<li>Select the values to use from <strong>Number of data points </strong>or <strong>Metric value</strong>.</li>

<li>Configure the Total Events including a query and values to use <strong>Number of data points</strong> or <strong>Metric value</strong>. You can copy and paste the previous query, removing filters to get the total.
</li>
</ol>
   </td>
   <td>
    For <strong>Threshold-based</strong> definitions, which calculates against success criteria:
<ol>

<li>Select <strong>Successful</strong> or <strong>Unsuccessful Events</strong> to measure.</li>

<li>Build a query using metrics and filters. See <a href="https://help.sumologic.com/Metrics/Introduction-to-Metrics/01Overview-of-Metrics-in-Sumo">Overview of Metrics in Sumo</a> for more information.</li>

<li>For <strong>Use values from</strong>, it always uses the Metric value.</li>

<li>For <strong>Success Criteria</strong> for <strong>Avg</strong>, <strong>Min</strong>, <strong>Max</strong>, or <strong>Sum</strong> of the selected signal type (such as latency) which must be <strong>greater than</strong>, <strong>greater than or equal to</strong>, <strong>less than</strong>, or <strong>less than equal to</strong> an amount you enter (positive or negative number). </li>
</ol>
   </td>
  </tr>
</table>




6.

22


<table>
  <tr>
   <td>Logs: Ratio-based
   </td>
   <td>Logs: Threshold-based
   </td>
  </tr>
  <tr>
   <td>
    For <strong>Ratio-based</strong> definition, which calculates successful or unsuccessful events against total events:
<ol>

<li>Select <strong>Successful</strong> or <strong>Unsuccessful Events</strong> to measure.</li>

<li>Search logs selecting and entering a log query. See <a href="/docs/search/Get-Started-with-Search/Search-Basics/About-Search-Basics">About Search Basics</a> for more information.</li>

<li>For <strong>Use values from</strong>, select the numeric value available for that query to pull data from.</li>

<li>Then configure the <strong>Total Events</strong> including a query and values. You can copy and paste the previous query, perhaps with filters removed to get the total.
</li>
</ol>
   </td>
   <td>
    For <strong>Threshold-based</strong> definitions, which calculates against success criteria:
<ol>
<li>Select <strong>Successful</strong> or <strong>Unsuccessful Events</strong> to measure.</li>

<li>Search logs selecting and entering a log query. See <a href="/docs/search/Get-Started-with-Search/Search-Basics/About-Search-Basics">About Search Basics</a> for more information.</li>

<li>For <strong>Use values from</strong>, it always uses the Metric value.</li>

<li>For <strong>Success Criteria</strong> for <strong>Avg</strong>, <strong>Min</strong>, <strong>Max</strong>, or <strong>Sum</strong> of the selected signal type (such as latency) which must be <strong>greater than</strong>, <strong>greater than or equal to</strong>, <strong>less than</strong>, or <strong>less than equal to</strong> an amount you enter (positive or negative number).
</li>
</ol>
   </td>
  </tr>
</table>




7.
23

8. Define your SLO for target amount and duration period to monitor:
    * **Target**. The value in percentage you want to target for the SLO, for example 99 for 99%.
    * **Compliance Type**. **Rolling** provides a sequence of recent days for the Compliance Period, such as last 7d or last 30d.**Calendar** calculator over a window of time for a Week.
    * **Timezone**. Select a GMT timezone. This is important to accurately assign events on the boundary of a compliance period, such as events received at 11:59 PM in a particular time zone. \

24

9. Enter SLO Details including a **Name** and **Description**. This is used in the list and for searches. \

25

10. Click **Save.** To create a monitor. click **[Save and Create Monitor](https://help.sumologic.com/Beta/SLO_Reliability_Management/Access_and_Create_SLOs#Create_an_SLO_Monitor)**.


### Create an SLO Monitor
26
 create-an-slo-monitor}

Create one or more monitors as needed for your SLO. We recommend creating a separate monitor for SLI and Burn Rate based condition types. You can access SLO monitors through the [SLO Details](https://help.sumologic.com/Beta/SLO_Reliability_Management/Access_and_Create_SLOs#SLO_Preview) or from the Monitors list page.

You will receive notifications according to monitor configurations, such as email messages and Slack channel posts. Use the variable {{SloDashboardUrl}} in your Slack channel payloads, which will generate an SLO dashboard link in notifications.

The Alert Response page is not supported for SLO-based monitors at this time. Notifications will provide access to the SLO dashboard when warning and critical triggers occur.

Monitor notifications may auto-resolve. See [Auto-resolving Notifications](https://help.sumologic.com/Beta/SLO_Reliability_Management/Access_and_Create_SLOs#Auto-resolving_Notifications) for details according to the evaluation (Windows or Request) and compliance (Calendar or Rolling) types.

**Y**ou can create one condition type for your SLO monitor, either an SLI trigger or Error Budget trigger. Only the threshold condition is supported per critical and warning for that condition type.

You have two options to create an SLO Monitor:



* Select **Save and Create Monitor** when creating an SLO. \

27

* Access the **Monitors** tab. Select **Add,** then **New Monitor**. Select the SLO option. \

28


When you click **Save and Create Monitor**, a New Monitor dialog loads:



1. For the **Monitor Type**, select **SLO**. \
When creating from the **Monitors** tab, select an SLO from the drop down menu. A preview of the SLO loads on the page. \

29

2. Select and configure a Condition Type:
    * For the **SLI** **Condition Type**, you can select to alert when the SLI is below an entered percentage, as it nears your SLI target. For example, you could set this to 99.1% to indicate when it is getting close to a target of 99%. \

30

    * For the **Burn Rate Condition Type**, create an alert indicating Critical and Warning conditions based on burn rate or the rate at which error budget is depleted. Enter a percentage depleted within an amount of minutes, hours, or days. \
For example, a critical alert for 10% depletion within 3 hours indicates the error budget is depleting quickly. \

31

3. For **Notifications**, select a Connection Type for sending messages through email, Slack, webhooks, or other methods. Select Alerts and/or Recovery to notify for Critical and Warning triggers. You can add as many notifications as needed. A message is sent with a link to the dashboard to investigate. \

32
 \
For example, to set up a Slack notification, select **Slack** from the drop down menu. Edit the **Payload** as needed, the following information shows the default settings: \

33

4. For **Monitor Details**, enter the following information:
    * **Name**. Name for the monitor.
    * **Location**. Path for the monitor, default is /Monitor.
    * **Description**. Optional description for the monitor.
    * **Playbook**. Optional playbook for handling these monitors and situations if an issue occurs. \

34

5. Click **Save**.


#### Auto-resolving Notifications
35
 auto-resolving-notifications}

SLO Monitors in a triggered state can autoresolve. See the following table for details.


<table>
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
   <td>No since SLI never recovers. New alert is created for each compliance period. Monitor status is based on latest compliance period’s alert status
   </td>
  </tr>
  <tr>
   <td>Window
   </td>
   <td>Calendar
   </td>
   <td>ErrorBudgetTrigger
   </td>
   <td>Yes, if the error budget consumed is less than the alert threshold for a complete detection window. Similar to log monitor recovery.
   </td>
  </tr>
  <tr>
   <td>Window
   </td>
   <td>Rolling
   </td>
   <td>SLITrigger
   </td>
   <td>Same as “Window-Calendar”. Separate alert for each compliance period.
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
  </tr>
</table>



#### Notification example
36
 notification-example}

When a notification is sent, it includes information from the alert and a link to load the dashboard. The following is an example email notification. See [SLO Dashboards and Notifications](https://help.sumologic.com/Beta/SLO_Reliability_Management/SLO_Dashboards_and_Notifications) for information.


37



### Import an SLO

To transfer data immediately and create an SLO using an import, you should first export JSON content to use that formatting. The Sumo Logic JSON format may change without notice. See [Export and Import Content in the Library](/docs/get-started/library) for complete details.

To import an SLO:



1. Click **Manage Data**, then **Monitoring**. Select the SLO tab if not loaded.
2. Click **Add** then **Import…**
3. Enter a Name for the SLO.
4. Copy and paste the JSON in the text editor.
5. Click **Import**.


39



## SLO Dashboards and Notifications

SLO Dashboards provide an active view into the health and status of services and systems based on your SLI and SLO configurations.


40



### Dashboard details
41
 dashboard-details}

Each dashboard includes the following:


42



<table>
  <tr>
   <td>A
   </td>
   <td>General information including the name and description of the SLO.
   </td>
  </tr>
  <tr>
   <td>B
   </td>
   <td>SLI information including:
<ul>

<li><strong>Signal Type</strong>: Latency, Error, Availability, Throughput, Other</li>

<li><strong>Evaluation Type</strong>: Windows-based, Request-based</li>

<li><strong>Timezone</strong>: GMT timezone</li>

<li><strong>Created</strong> and <strong>Modified</strong> timestamp and name of the user
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td>C
   </td>
   <td>Panels showing:
<ul>

<li><strong>Current SLI</strong>: Calculated currently tracked SLI using the configured SLI, SLO, and queries</li>

<li><strong>Target</strong>: Configured SLO target</li>

<li><strong>Error Budget Remaining</strong>: The calculated remaining budget from the configured maximum</li>

<li><strong>Compliance</strong>: The configured compliance as Rolling or Calender and selected window
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td>D
   </td>
   <td><strong>Error Budget Burndown</strong>: Chart tracking amount of error budget and the events that consumed it within the compliance period. Hover over any timeline to receive more information.
   </td>
  </tr>
  <tr>
   <td>E
   </td>
   <td><strong>Event History</strong>: Tracked events that occurred during the compliance period as successful (good) and unsuccessful (bad) events. Hover over the chart to learn more about the total number of good or bad events, timeframe, and more.
<p>F. Compliance History. Displays SLI and SLO for up to 30 compliance periods</p>
   </td>
  </tr>
</table>


You can modify the time range (default 15min) and refresh as needed.

For charts with larger compliance periods or to zoom in for granular details, select and drag across dates to zoom in further.


To reset the chart view, click the reset button. Or use the movement button to drag and progress across the chart.



If the SLO needs revisions or review, click the **Go to list page **option to open the specific SLO.





### SLO Notifications
46
 slo-notifications}

When you receive a notification from SLO, the message includes an option to **View SLO Dashboard**. You can receive these notifications to email, Slack channel, and other options available when configuring the monitor.



47


To review data for this alert in Sumo, select the View SLO Dashboard option. The dashboard loads with that time period in view with vital information to begin investigating the service. For example, selecting the option for this error opens the following board. Here we can review the current SLI and target, the remaining error budget, compliance settings, and review trending issues caught by the SLO.


### SLO as Code

SLO entities including SLO folders and individual SLO folders use the Sumo Logic Terraform provider to automate[ SLO folder](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/slo_folder) and [SLO creation](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/slo). This is particularly useful for organizations that want to templatize SLOs, standardize SLO configuration, monitors and dashboards and automate SLO-related workflows.  Use the [Monitor Terraform provider](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/monitor) to create monitors associated with SLOs.

Slogen, Sumo Logic’s Open Source tool for creating and managing SLOs based on[ OpenSLO](https://openslo.com/) specifications also leverages these Terraform providers. OpenSLO samples with associated monitors are available here : [https://github.com/OpenSLO/slogen/tree/sumo-agaurav/samples/sumologic/v1](https://github.com/OpenSLO/slogen/tree/sumo-agaurav/samples/sumologic/v1).


### SLO Data as Log Messages

SLO data is also available as log messages to support customers that want to customize dashboards and workflows using SLO data. These log messages conform to the following schema:

* Time: timestamp
* sloId: Id of the SLO, as displayed in the SLO dashboard URL
* goodCount: count of good requests, for request-based, and good windows for windows-based SLOs, based on SLO query definition
* totalCount: count of eligible requests for request-based, and eligible windows for windows-based SLOs, based SLO query definition
* sloVersion: version of SLO definition

View the schema by executing the following query (replace with a valid SLO Id).
```
_view=sumologic_slo_output sloId = "000000000000008A"
```

These log messages will be delayed by 1 hour as the system ensures consistency to account for ingest delay of source telemetry.

**Use Case Recipes**

1. A developer responsible for a microservice, may want to create dashboard panels that depict the trend of SLI and error budget in a proprietary microservice dashboard.

[1]
The following query computes hourly SLI and error budget trend for a windows-based SLO

```sql
_view=sumologic_slo_output sloId=”<your SLO Id>”
| timeslice 1h  // data granularity for this panel
| sum(goodCount) as goodWindows, sum(totalCount) as totalWindows by _timeslice
| totalWindows - goodWindows as badWindows
| sort by _timeslice asc
| accum(totalWindows) as totalWindowsSoFar
| accum(badWindows) as badWindowsSoFar
| 7 * 24 * 60 as totalWindowsInCompliance // total number of windows in the SLO. Each window is 1m in size, and compliance period is 7d. Replace 7 by number of days in compliance period \
| 0.999 as slo // replace this by target/100 here
| 100 - 100 * badWindowsSoFar / totalWindowsInCompliance as sli
| 100* (sli - slo)/(100-slo) as error_budget_pct_remaining
| slo*100 as slo
| fields _timeslice, sli, error_budget_pct_remaining, slo
```
This query replicates the following panel ( - trend forecast):


49


It is recommended to “change axis” -> set “maximum value” as 100 and “minimum value” as whatever lowest value you want to track it up to, under visualization settings under line chart.

**[2] The following query computes hourly SLI and error budget trend for a request based SLO

```sql
_view=sumologic_slo_output sloId="<your SLO ID>"
| timeslice 1h  // data granularity for this panel
| sum(goodCount) as goodRequests, sum(totalCount) as totalRequests by _timeslice
| totalRequests - goodRequests as badRequests
| sort by _timeslice asc
| accum(totalRequests) as totalRequestsSoFar
| accum(badRequests) as badRequestsSoFar
| 0.99 as slo // replace this by target/100 here
| 100 - 100 * badRequestsSoFar / totalRequestsSoFar as sli
| 100* (sli - slo)/(100-slo) as error_budget_pct_remaining
| slo*100 as slo
| fields _timeslice, sli, error_budget_pct_remaining, slo
```

This query replicates the following panel ( - trend forecast):



It is recommended to “change axis” -> set “maximum value” as 100 and “minimum value” as whatever lowest value you want to track it up to, under visualization settings under line chart.

**[3]
The following query computes SLI, Error Budget Remaining and Error Budget remaining (percentage/request count) for an SLO ([Sample query](https://us1data.long.sumologic.net/ui/#/search/create?id=qDxHREW0ZZNTao46pWD5hpm5SProwXtDTtowg5th))

```sql
_view=sumologic_slo_output sloId="<Your SLO ID>"
| sum(goodCount) as goodCount, sum(totalCount) as totalCount
| goodCount*100/totalCount as sli
| 99.9 as target // replace the target here
| (sli - target)*100/(100 - target) as errorBudgetRemainingPercent
| errorBudgetRemainingPercent*30*86400*(100 - target)/100/100/60 as errorBudgetRemainingMins  // replace 30 by day count in your compliance period. Note that this is applicable for window based SLIs only
| goodCount - (totalCount*target/100) as errorBudgetRemainingRequests // applicable for request based SLIs only
| if (errorBudgetRemainingPercent < 0, 0, errorBudgetRemainingPercent) as errorBudgetRemainingPercent
| fields -goodCount, totalCount
```
This query replicates the following panels:


51


**[4] The following query computes event history for an SLO:**

```sql
_view=sumologic_slo_output sloId="<your SLO ID>"
| timeslice 1h // granularity of data
| sum(goodCount) as goodCount, sum(totalCount) as totalCount by _timeslice
| goodCount*100/totalCount as successfulWindows // replace successfulWindows by successfulRequests and unsuccessfulWindows by unsuccessfulRequests (below) for request based SLO
| 100-successfulWindows as unsuccessfulWindows
| fields -goodCount, totalCount
```
This query replicates the following panel:


52


It is recommended to choose “change properties” -> Stacking -> Normal and “change axis” -> set “maximum value” as 100.

**[5] The following query computes SLI trend over multiple 7d calendar compliance periods**

```sql
// REQUEST-BASED, CALENDAR COMPLIANCE
// Coffee Prep Latency should not exceed 1 second for 95% of requests in calendar 7d
// This query works for both request based and window based SLOs
_view=sumologic_slo_output sloId=”<your SLO Id>”
| timeslice 7d // put compliance period here
| sum(goodCount) as goodRequests, sum(totalCount) as totalRequests by _timeslice
| totalRequests - goodRequests as badRequests
| sort by _timeslice asc
| accum(totalRequests) as cumTotalRequests
| accum(badRequests) as cumBadRequests
| 95 as slo // replace your target here
| 100 - 100 * cumBadRequests / cumTotalRequests as sli
| 100* (sli - slo)/(100-slo) as error_budget_pct_remaining
| fields _timeslice, sli, error_budget_pct_remaining, slo
```

This query replicates the following panel:


53


It is recommended to choose “change axis” -> set “maximum value” as 100.


To use this correctly, ensure the following:

* To render one compliance period, the time range of dashboard should match the compliance period
* To build a dashboard of compliance history over multiple compliance periods, change the timeslice to match the compliance period and set the dashboard time range to multiple compliance periods

Dashboards built using such queries will show slightly different numbers from the pre-built dashboards due to differences in the storage backend for these two approaches. Use the pre-build dashboard if SLO precision is important.
