---
id: add-monitor
title: Add a Monitor
description: This document provides instructions for creating a monitor.
---

This document shows you how to create a monitor.


## Add a Monitor

1. Go to the Monitors page by clicking **Manage Data** > **Monitoring** > **Monitors**.
1. Click on the **Add** button > **New Monitor** to add a new Monitor. The creation dialog box will appear.
   * You can configure Sumo Logic Monitors using [Terraform modules](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor).
1. Select a **Monitor Type**, either Logs or Metrics. <br/>  ![trigger conditions for monitor.png](/img/monitors/trigger-conditions-monitor.png)
1. Select a **Detection Method**, either Static or Outlier. <br/> ![outlier detection method.png](/img/monitors/outlier-detection-method.png)
   * **Static** allows you to set specific threshold conditions. Use this detection method when you are alerting on KPIs that have well defined and constant thresholds for what's good and bad. For example, infrastructure metrics like CPU utilization, and memory.  
   * An **outlier** is an unusual change or a spike in a time series of a key indicator. Use this detection method when you are alerting on KPIs that don't have well-defined constant thresholds for what's good and bad. You want the Monitor to automatically detect and alert on unusual changes or spikes on the alerting query. For example, application KPIs like page request, throughput, and latency.  
1. Provide a **Query**. Provide a Query. Logs Monitors can have one query up to 4,000 characters long. For Metrics Monitors, you can specify up to six queries. When providing multiple metrics queries, use the letter labels to reference a query row. The Monitor will automatically detect the query that triggers your alert, and will mark that row with a notification bell icon. See [joined metrics queries](../../metrics/metric-queries-alerts/metrics-explorer.md) for details.<br/> ![metrics-monitor-query-row](/img/monitors/metrics-monitor-query-row.png)
1. **Outlier** detection methods require you to select the **Direction** you want to track. If you chose **Static**, you won't see this option.<br/>  ![outlier detection input on Monitor.png](/img/monitors/outlier-detection-input.png)
    * **Up.** Only get alerted if there is an abnormal *increase* in the tracked key indicator. 
    * **Down.** Only get alerted if there is an abnormal *decrease* in the tracked key indicator.
    * **Both.** Get alerted if there is *any* abnormality in the data whether an increase or a decrease.
5. Specify the **Trigger Type**. A Monitor can have one critical, warning, and missing data trigger condition, each with one or more notification destinations. Triggers have different options depending on the query and alert type. Click the **Expand** button next to the query type you're using for configuration details.

<details><summary><strong>Expand:</strong> Logs Trigger Types</summary>

### Logs Trigger Types

![Logs monitors.png](/img/monitors/logs-monitors.png)

Trigger alerts on:

![trigger alerts on field.png](/img/monitors/trigger-alerts-field.png)

You can set the trigger based on the following:

* **returned row count** (default): the number of rows returned from the log search.
* A numeric field returned from the search. You can pick any numeric field from your query, and alert on the value of that field. The field is `_count` in the above screenshot. To convert a string to a number use the [num operator](/docs/search/search-query-language/search-operators/num). For example, if you have a field named **duration** you would use the num operator as follows to convert it to a number value.

`| num(duration)`


#### Static detection method

**Log Trigger Type: Critical and Warning**  

![logs trigger type 2021.png](/img/monitors/logs-trigger-type.png)

`Alert when returned row count is <threshold type> <threshold> within <time range>`

| Parameter | Description |
|--|--|
| Threshold type | How you want the value compared. Select either **greater than**, **greater than or equal**, **less than or equal**, or **less than**. |
| Threshold | The value against which the trigger will be evaluated. You can specify any valid numeric value up to **1,000**. |
| Time range | The duration of time to evaluate. Select either **5 minutes**, **10 minutes**, **15 minutes**, **30 minutes**, **1 hour**, **6 hours**, **12 hours**, or **24 hours**. |

**Recover**

Use the **Edit Recovery Settings** option to set the recovery to the opposite of the alert setting. The **Alert** must be checked for the option to be available.  

![logs trigger recovery toggle.png](/img/monitors/edit-recovery-settings1.png)  

For example, when the alert is set to `> 10` the recovery would be set to `<= 10` when inferred. Sumo Logic automatically resolves the incident when the resolution condition is satisfied. `Recover automatically when result is <threshold type> <threshold> for the selected time period`.

#### Configurable Resolution Window

When configuring monitor trigger conditions, you can set a resolution window to quickly resolve alerts when the underlying issues are fixed. This controls how long a monitor will wait prior to resolving the alert, when the underlying issues was corrected. For example, if your monitor is evaluating the last 60 minutes, you can specify a resolution window of 15 minutes. Once 15 minutes has elapsed with your monitor resolution window continuously satisfied, the alert will resolve. <br/>![config-resolution-window-2](/img/monitors/config-resolution-window-2.png)  

| Parameter | Description |
|--|--|
| Threshold type | How you want the value compared. Select either **greater than**, **greater than or equal**, **less than or equal**, or **less than**. |
| Threshold | The value against which the resolution will be evaluated. You can specify any valid numeric value. |
| Occurrence Type	| The time condition you want for recovering the alert. Select either at any time within or at all times. Choose at all times if you want all the data points for the given metric to meet threshold conditions in a given time range, before recovering an alert. Alternatively, choose at any time within if you want to recover an alert when only a single data point meets the threshold condition for the given time range. |

For Metrics monitors, you can choose to recover based on a single data point below the threshold, or all data points below the threshold.

![monitors.png](/img/monitors/metricsmonitor.png)


#### Outlier detection method

**Logs Trigger Type: Critical and Warning**

![monitor outlier logs.png](/img/monitors/monitor-outlier-logs.png)

`Alert when result is greater than or equal to <threshold> standard deviations from baseline for <consecutive> consecutive out of <window> data points`

| Parameter | Description |
|--|--|
| Threshold | The number of standard deviations for calculating violations. The default is 3.0. |
| Consecutive | The required number of consecutive indicator data points (outliers) to trigger a violation. |
| Window | The number of data points used to calculate the baseline for outlier detection. |

**Recover**

The recovery condition will always be the opposite of the alerting condition. For example, if there is no outlier identified for the duration of the detection window from the time the alert was first fired, then the Monitor will be brought back to the normal state. You cannot customize the resolution condition for the Monitor.

**Logs Trigger Type: Missing Data**  
          
![logs missing data Jan 2021.png](/img/monitors/logs-missing-data.png)

`Alert when missing data within <time range>`

| Parameter | Description |
|--|--|
| Time range | The time span of data to evaluate. Select either 5 minutes, 10 minutes, 15 minutes, 30 minutes, 1 hour, 6 hours, 12 hours, or 24 hours. |

Recover

* Automatically: Sumo Logic automatically resolves the incident when the resolution condition is satisfied.

    `Recover automatically when data becomes available for the affected time span.`

</details>

<details><summary><strong>Expand:</strong> Metrics Trigger Types</summary>

### Metrics Trigger Types

![metrics query.png](/img/monitors/metrics-query.png)


#### Static detection method

**Metrics Trigger Type: Critical and Warning**

![metrics trigger types.png](/img/monitors/metrics-trigger-types.png)

`Alert when result is <threshold type> <threshold> <occurrence type> <time range>`

| Parameter | Description |
|--|--|
| Threshold type | How you want the value compared. Select either **greater than**, **greater than or equal**, **less than or equal**, or **less than**. |
| Threshold | The value against which the trigger will be evaluated. You can specify any valid numeric value. |
| Occurrence type | The time condition you want for the trigger. Select either **at any time within** or **continuously for**. <br/><br/>Choose continuously for if you want all the data points for the given metric to meet threshold conditions in a given time range, before triggering an alert. Alternatively, choose **at any time within** if you want to generate an alert when only a single data point meets the threshold condition for the given time range. |
| Time range | The duration of time to evaluate. Select either **5 minutes**, **10 minutes**, **15 minutes**, **30 minutes**, or **1 hour**. |

**Recover**

Use the **Edit Recovery Settings** option to set the recovery to the opposite of the alert setting. The **Alert** must be checked for the option to be available.   

![metrics trigger recovery toggle.png](/img/monitors/metrics-trigger-recovery-toggle.png)  

For example, when the alert is set to `> 10` the recovery would be set to `<= 10` when inferred.

Sumo Logic automatically resolves the incident when the resolution condition is satisfied.

`Recover automatically when result is <threshold type> <threshold> for the selected time period`

| Parameter | Description |
|--|--|
| Threshold type | How you want the value compared. Select either greater than, greater than or equal, less than or equal, or less than. |
| Threshold | The value against which the resolution will be evaluated. You can specify any valid numeric value. |

#### Outlier detection method

**Metrics Trigger Type: Critical and Warning**

![monitor metrics outlier triggers.png](/img/monitors/monitor-metrics-outlier-triggers.png)

`Alert when result is greater than or equal to <threshold> standard deviations from baseline for <time range>`

| Parameter | Description |
|--|--|
| Threshold  | The number of standard deviations for calculating violations. The default is 3.0. |
| Time range | The duration of time to evaluate. Select either **5 minutes**, **10 minutes**, **15 minutes**, **30 minutes**, **1 hour**, or **24 hours**. |

**Recover**

The recovery condition will always be the opposite of the alerting condition. For example, if there is no outlier identified for the duration of the detection window from the time the alert was first fired, then the Monitor will be brought back to the normal state. You cannot customize the resolution condition for the Monitor.


**Metrics Trigger Type: Missing Data**  

![missing.png](/img/monitors/missing.png)

`Alert when missing data <occurrence type> for <time range>`

| Parameter | Description |
|--|--|
| Occurrence type  | The time condition you want for the trigger. Choose either **for all** or **for any**.<br/><br/>If you choose all you will get notified when all of the metrics meeting the query condition are not sending data in the given time range.<br/><br/>Alternatively, you can choose any if you want to get notified when one of the metrics does not receive any data in the given time range. *This option requires at least one initial data point and expires after 24 hours once triggered.* |
| Time range | The duration of time to evaluate. Select either **5 minutes**, **10 minutes**, **15 minutes**, **30 minutes**, or **1 hour**. |

**Recover**

* Automatically: Sumo Logic automatically resolves the incident when the resolution condition is satisfied. 

    `Recover automatically when data becomes available for the affected time span.`


</details>


6. (Optional) **Additional Settings** 
   * **Alert Name**: Alert Name allows you to customize the name that appears on the Alert Page. By default, the Alert name is the monitor name, but you may want to create a custom name based on your use case. You can include any of the available alert variables, except `{{AlertName}}`, `Playbook`, `{{AlertResponseURL}}`, and `{{ResultsJson}}`, in the name such as the type of monitor or trigger condition. You can check the alert variables list for details.
      * Example: `{{Resultsjson.Env}}` - High CPU. This alert will produce an Alert with the name like PROD - High CPU. Here we are assuming that there is a field name Env in underlying data that has a value of "PROD".
   * **Evaluation Delay**: Collection delays may occur due to your environment and it takes a couple of minutes for data to be processed into Sumo Logic. Since Monitors run on data from the most current time period, it's possible for Monitors to evaluate against incomplete data. As a result, Monitors can generate false positives or negatives that can cause confusion. Set an evaluation delay in seconds to delay the evaluation of a Monitor, so it doesn't look at the most current time (where data can be incomplete) and instead looks at an older period of time, where you have more complete data.<br/> ![additional settings evaluation delay.png](/img/monitors/additional-settings-evaluation-delay.png)

   If your data is coming from the [Amazon CloudWatch Source for Metrics](docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics.md) we recommend a setting of 900 seconds.

7. (Optional) Set **Notifications**: When a trigger condition is met you can send notifications to other people and services. To add notifications click on the **Add Notification** button. You can add more than one notification channel for a Monitor.<br/>  ![monitor notifications input.png](/img/monitors/monitor-notifications-input.png)

  Metrics Monitors have an option to send notifications either as a group or separately. **Group Notifications** define whether you want single notifications per time series that match the Monitor query or you want group notifications where you receive a single notification for the entire Monitor. Log Monitors always group notifications.
   * The **Connection Type** specifies the notification channel where you want to get notified, such as an email or webhook. See [Connections](/docs/manage/connections-integrations) for details. Monitor notifications support variables to reference its configuration settings or your raw data. See [alert variables](../alert-variables.md) for a table of the available variables.
      * **Email**: Provide 1-100 recipient email addresses. You can customize the email subject and body.
      * **Webhook**: By default, the payload defined on the Connection is used. You can customize your payload for each notification if needed.
    * Select the **Alert** and **Recovery** checkboxes for each trigger type based on when you want to send a notification.  You can have different Trigger Conditions send a notification to different channels. For example, you can get notified on PagerDuty for critical Incidents and get an email or Slack notification for warning incidents.

  :::tip
  See the [Notifications section](#notifications) for details on alert and recovery notifications.
  :::

    If your connection type is Lambda, Microsoft Teams, OpsGenie, PagerDuty, Slack, or a generic webhook the **Recovery** checkbox enables an automatic resolution process that updates the connection when an alert has recovered within Sumo Logic. Support for other connection types is coming soon.

   * **Add Notifications** to add additional notification channels as needed. You can configure different notifications for each trigger type, critical, warning, and missing data.

8. Enter a **Name** for the Monitor and the **Location** you want it saved to. A **Description** is optional.<br/>  ![monitor details during creation.png](/img/monitors/monitor-details-during-creation.png)
9. **Playbooks** allow admins to codify tribal knowledge for an on-call so they know what exactly to do when they receive an alert. You have the option to provide a playbook when creating a Monitor, as shown in the below image. Markdown is supported.<br/> ![Monitor playbook input.png](/img/monitors/Montor-playbook-input.png)
10. Click the **Save** button at the top right of the panel when you're finished configuring the Monitor.
