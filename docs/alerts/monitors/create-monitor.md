---
id: create-monitor
title: Create a Monitor
description: Learn how to create a Sumo Logic monitor.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import AlertsTimeslice from '../../reuse/alerts-timeslice.md';

This topic shows you how to create a monitor.

<details>
<summary>Use the <strong>New Monitor</strong> dialog to create a monitor (expand to view)</summary>

<img src={useBaseUrl('img/monitors/new-monitor-dialog.png')} alt="New Monitor dialog" style={{border: '1px solid gray'}} width="800"/>

</details>


## Open the New Monitor window

#### From your Monitors page

1. Go to the Monitors page by clicking **Manage Data** > **Monitoring** > **Monitors**.
1. Click on the **Add** button > **New Monitor** to add a new Monitor. The **New Monitor** dialog box will appear.

#### From your Dashboard

1. From a Dashboard, hover your mouse over a panel, click the kebab icon, then **Open in Log Search**.
1. From your log search view, click the kebab icon in the upper right corner, then **Create a Monitor**.

#### From your Log Search

Click the kebab icon in the upper right corner, then **Create a Monitor**.

<AlertsTimeslice/>

#### From your Metrics Explorer

Creating a monitor based on the threshold values defined in the Metrics page can save time and effort. By using the pre-filled monitor editor, you can quickly create a monitor with the same threshold values as defined in the Metrics page. This will ensure that the monitor is using the same criteria as the Metrics page, providing consistency in monitoring.

To create a monitor from the [Metrics Explorer](/docs/metrics/metrics-queries/metrics-explorer/), follow the steps below:

1. Open the Metrics Explorer page and enter the metrics query to create a monitor from it.
1. In the **Threshold** section, define the critical and warning thresholds for your metrics query.<br/> <img src={useBaseUrl('img/monitors/metrics-explorer-view.png')} alt="metrics-explorer-view" width="800"/>
1. Click the kebab button at the end of the query field and select **Create a Monitor**.<br/> <img src={useBaseUrl('img/monitors/create-monitor.png')} alt="create-monitor" width="400"/>
1. The Monitor Editor will open with prefilled data based on the threshold values set on the Metrics page.<br/> <img src={useBaseUrl('img/monitors/new-monitor-window.png')} alt="create-monitor" width="600"/>
1. In the **Trigger Type** section of the monitor editor, enable the checkbox that corresponds to the threshold value that you want to use (either "Critical", "Warning", or both).
1. The threshold values will be the same as defined in the Metrics page for both Critical and Warning thresholds.
1. All other parameters should be set to default, including the window (15 minutes) and the "at all times" box.
1. Ensure that the Recover value is set to the default, which is the opposite of the Alert value. The Edit Recovery button should be off.
1. Once all values have been set, click on **Save** to create the monitor.
1. The same threshold will also be applied to the histogram chart.

:::note
Note that the same threshold translating functionality supports to [Opening Alerts Response Page in the Metrics Explorer](/docs/alerts/monitors/alert-response/#translating-thresholds) and [Opening Monitor in the Metrics Explorer](/docs/alerts/monitors/settings/#view-in-metrics-explorer).
:::

## Step 1: Set trigger conditions

The first step when you create a new monitor is to set the trigger conditions.

<img src={useBaseUrl('img/monitors/new-monitor-set-trigger-conditions.png')} alt="Set trigger conditions" style={{border: '1px solid gray'}} width="800"/>

### Select monitor type and detection method

1. Select a **Monitor Type**: <br/><img src={useBaseUrl('img/monitors/trigger-conditions-monitor.png')} alt="Monitor types" width="250"/>
   * **Logs**. Creates alerts based on a [log search](/docs/search/). 
   * **Metrics**. Creates alerts based on [metrics queries](/docs/metrics/metrics-queries/).
   * **SLO**. Creates alerts based on a [Service Level Objectives (SLO)](/docs/observability/reliability-management-slo/).
1. Select a **Detection Method**. The methods available depend on whether you choose **Logs** or **Metrics** as the monitor type (there is no detection type for **SLO**): <br/><img src={useBaseUrl('img/monitors/monitor-detection-methods-for-logs.png')} alt="Logs detection methods" width="425"/> <br/><img src={useBaseUrl('img/monitors/monitor-detection-methods-for-metrics.png')} alt="Logs detection methods" width="425"/> 
   * **Static** allows you to set specific threshold conditions. Use this detection method when you are alerting on KPIs that have well defined and constant thresholds for what's good and bad. For example, infrastructure metrics like CPU utilization, and memory.
   * **Anomaly** lets you uncover unusual behavior identified by anomaly detection. Sumo Logic applies machine learning techniques to detect anomalies and identify suspicious patterns of activity. It establishes baselines for normal behavior so you can receive alerts when deviations or unusual activities are detected. To automatically respond when an anomaly alert is triggered, see [Create an anomaly monitor that runs an automated playbook](/docs/alerts/monitors/use-playbooks-with-monitors/#create-an-anomaly-monitor-that-runs-an-automated-playbook).
   * **Outlier** lets you detect an unusual change or a spike in a time series of a key indicator. Use this detection method when you are alerting on KPIs that don't have well-defined constant thresholds for what's good and bad. You want the Monitor to automatically detect and alert on unusual changes or spikes on the alerting query. For example, application KPIs like page request, throughput, and latency. 
1. If you chose the **Anomaly** detection method, choose **Use Outlier** if you want to trigger alerts on outlier direction rather than anomaly direction: <br/><img src={useBaseUrl('img/monitors/monitor-detector-types-for-anamoly.png')} alt="Use Outlier" width="600"/>

### Provide a query (logs and metrics only)

1. Provide a query if you are creating a log or metrics monitor type.
   * Logs Monitors can have one query up to 4,000 characters long.
   * Metrics Monitors can have up to six queries. When providing multiple metrics queries, use the letter labels to reference a query row. The Monitor will automatically detect the query that triggers your alert, and will mark that row with a notification bell icon. See [joined metrics queries](../../metrics/metrics-queries/metrics-explorer.md) for details.<br/> ![metrics-monitor-query-row](/img/monitors/metrics-monitor-query-row.png)
1. If you're using the **Outlier** or **Anomaly** detection method, you'll need to select the **Direction** you want to track (Up, Down, or Both). <br/><img src={useBaseUrl('img/monitors/outlier-detection-input.png')} alt="Outlier detection direction" width="300"/> <br/><img src={useBaseUrl('img/monitors/anomaly-detection-input.png')} alt="Anomaly detection direction" width="300"/>
    * **Up.** Only get alerted if there is an abnormal *increase* in the tracked key indicator. 
    * **Down.** Only get alerted if there is an abnormal *decrease* in the tracked key indicator.
    * **Both.** Get alerted if there is *any* abnormality in the data whether an increase or a decrease.

    If you chose the **Static** detection method, you won't see this option.

### Trigger Type

Specify the **Trigger Type**. A Monitor can have one critical, warning, and missing data trigger condition, each with one or more notification destinations. Triggers have different options depending on the query and alert type. Click the **Expand** button next to the query type you're using for configuration details.

<details>
<summary><strong>Logs Trigger Types</strong> (expand to view)</summary>

#### Logs Trigger Types

<img src={useBaseUrl('img/monitors/logs-monitors.png')} alt="icon" style={{border: '1px solid gray'}}  width="600"/> 

Trigger alerts on:<br/>![trigger alerts on field.png](/img/monitors/trigger-alerts-field.png)

You can set the trigger based on the following:
* **returned row count** (default): the number of rows returned from the log search.
* A numeric field returned from the search. You can pick any numeric field from your query, and alert on the value of that field. The field is `_count` in the above screenshot. To convert a string to a number use the [num operator](/docs/search/search-query-language/search-operators/num). For example, if you have a field named **duration** you would use the num operator as follows to convert it to a number value.

```sh
| num(duration)
```

##### Static detection method

**Log Trigger Type: Critical and Warning**  

![logs trigger type 2021.png](/img/monitors/logs-trigger-type.png)

`Alert when returned row count is <threshold type> <threshold> within <time range>`

| Parameter | Description |
|:--|:--|
| Threshold type | How you want the value compared. Select either **greater than**, **greater than or equal**, **less than or equal**, or **less than**. |
| Threshold | The value against which the trigger will be evaluated. You can specify any valid numeric value up to **1,000**. |
| Time range | The duration of time to evaluate. Select either **5 minutes**, **10 minutes**, **15 minutes**, **30 minutes**, **1 hour**, **3 hours**, **6 hours**, **12 hours**, or **24 hours**. |

**Recover**

Recovery condition is set by default to the opposite of the alert condition. If you need to change these settings, first switch the **Edit Recovery Settings** toggle and then adjust values for the recovery settings accordingly.

![logs trigger recovery toggle.png](/img/monitors/edit-recovery-settings1.png)  

For example, when the alert is set to `> 10` the recovery would be set to `<= 10` when inferred. Sumo Logic automatically resolves the incident when the resolution condition is satisfied. `Recover automatically when result is <threshold type> <threshold> for the selected time period`.

##### Configurable Resolution Window

When configuring monitor trigger conditions, you can set a resolution window to quickly resolve alerts when the underlying issues are fixed. This controls how long a monitor will wait prior to resolving the alert, when the underlying issues was corrected. For example, if your monitor is evaluating the last 60 minutes, you can specify a resolution window of 15 minutes. Once 15 minutes has elapsed with your monitor resolution window continuously satisfied, the alert will resolve. <br/>![config-resolution-window-2](/img/monitors/config-resolution-window-2.png)  

| Parameter | Description |
|:--|:--|
| Threshold type | How you want the value compared. Select either **greater than**, **greater than or equal**, **less than or equal**, or **less than**. |
| Threshold | The value against which the resolution will be evaluated. You can specify any valid numeric value. |
| Occurrence Type	| The time condition you want for recovering the alert. Select either at any time within or at all times. Choose at all times if you want all the data points for the given metric to meet threshold conditions in a given time range, before recovering an alert. Alternatively, choose at any time within if you want to recover an alert when only a single data point meets the threshold condition for the given time range. |

For Metrics monitors, you can choose to recover based on a single data point below the threshold, or all data points below the threshold.

![monitors.png](/img/monitors/metricsmonitor.png)

##### Anomaly detection method

**Logs Trigger Type: Critical** 

 <img src={useBaseUrl('img/monitors/monitor-anomaly-logs.png')} alt="Monitor anomaly logs" style={{border: '1px solid gray'}} width="800" />

| Parameter | Description |
|:--|:--|
|  Alert when anomaly count is at least ___ (max. ##) at any time within ___ | Enter the minimum number of anomalies to detect during the detection window before triggering an alert, and the duration of time to watch for anomalies (from 5 minutes to 24 hours). Ensure that the time period window is 5-10 times longer than the timeslice used in the log query. This setting helps you add context to anomaly detection. For example, if you know a particular signal is noisy, you may want to wait for a number of anomalous data points in the detection window before triggering an alert. If the time period is set to 5 minutes, and the minimum anomaly count is set to 1, then an alert is triggered if 1 anomaly appears within a 5-minute time period.   |
| Show me fewer alerts --- more alerts | Tune the number of anomalous data points detected per day compared to the predicted baseline for the detection window. Select more alerts if you do not want to miss out on most anomalies. | 

##### Use Outlier with Anomaly detection

**Logs Trigger Type: Critical and Warning**

![monitor outlier logs.png](/img/monitors/monitor-outlier-logs.png)

`Alert when result is greater than or equal to <threshold> standard deviations from baseline for <consecutive> consecutive out of <window> data points`

| Parameter | Description |
|:--|:--|
| Threshold | The number of standard deviations for calculating violations. The default is 3.0. |
| Consecutive | The required number of consecutive indicator data points (outliers) to trigger a violation. |
| Window | The number of data points used to calculate the baseline for outlier detection. |

**Recover**

The recovery condition will always be the opposite of the alerting condition. For example, if there is no outlier identified for the duration of the detection window from the time the alert was first fired, then the Monitor will be brought back to the normal state. You cannot customize the resolution condition for the Monitor.

**Logs Trigger Type: Missing Data**  
          
![logs missing data Jan 2021.png](/img/monitors/logs-missing-data.png)

`Alert when missing data within <time range>`

| Parameter | Description |
|:--|:--|
| Time range | The time span of data to evaluate. Select either 5 minutes, 10 minutes, 15 minutes, 30 minutes, 1 hour, 3 hours, 6 hours, 12 hours, or 24 hours. |

**Recover**

* Automatically: Sumo Logic automatically resolves the incident when the resolution condition is satisfied.

    `Recover automatically when data becomes available for the affected time span.`


</details>

<details>
<summary><strong>Metrics Trigger Types</strong> (expand to view)</summary>

#### Metrics Trigger Types

![metrics query.png](/img/monitors/metrics-query.png)


##### Static detection method

**Metrics Trigger Type: Critical and Warning**

![metrics trigger types.png](/img/monitors/metrics-trigger-types.png)

`Alert when result is <threshold type> <threshold> <occurrence type> <time range>`

| Parameter | Description |
|:--|:--|
| Threshold type | How you want the value compared. Select either **greater than**, **greater than or equal**, **less than or equal**, or **less than**. |
| Threshold | The value against which the trigger will be evaluated. You can specify any valid numeric value. |
| Occurrence type | The time condition you want for the trigger. Select either **at any time within** or **at all times within**. <br/><br/>Choose **at all times within** if you want all the data points for the given metric to meet threshold conditions in a given time range, before triggering an alert. Alternatively, choose **at any time within** if you want to generate an alert when at least one single data point meets the threshold condition for the given time range. |
| Time range | The duration of time to evaluate. Select either **5 minutes**, **10 minutes**, **15 minutes**, **30 minutes**, **1 hour**, **3 hours**, **6 hours**, **12 hours**, or **24 hours**. |

**Recover**

Recovery condition is set by default to the opposite of the alert condition. If you need to change these settings, first switch the **Edit Recovery Settings** toggle and then adjust values for the recovery settings accordingly.

![metrics trigger recovery toggle.png](/img/monitors/edit-recover-settings.png)  

For example, when the alert is set to `> 10` the recovery would be set to `<= 10` when inferred.

Sumo Logic automatically resolves the incident when the resolution condition is satisfied.

`Recover automatically when result is <threshold type> <threshold> for the selected time period`

| Parameter | Description |
|:--|:--|
| Threshold type | How you want the value compared. Select either greater than, greater than or equal, less than or equal, or less than. |
| Threshold | The value against which the resolution will be evaluated. You can specify any valid numeric value. |

##### Alert and recovery window

This setting affects both the alert generation logic and the alert recovery logic.

![metrics alert datapoints.png](/img/monitors/minimum-datapoints.png)

`Alert and recovery require a minimum of <Count> data points for "at all times" evaluation windows`

| Parameter | Description |
|:--|:--|
| Count | The minimum number of data points required within the configured window to trigger an alert or recover from an alert. This means that if Sumo Logic receives fewer data points in a given window, no alert will be triggered (even if all those data points exceed the threshold).

For example, you want to be alerted when the CPU usage is over 60% `at all times` within a 5-minute window. If you set the count to 3, this means that you will only get an alert if you have at least 3 data points showing CPU usage above 60% within that 5-minute window. If you only have 2 data points, even if both of them show CPU usage above 60%, you won't get an alert.
:::note
This setting only works when you choose `at all times within` as the type of occurrence for the alert.  
:::

##### Outlier detection method

**Metrics Trigger Type: Critical and Warning**

![monitor metrics outlier triggers.png](/img/monitors/monitor-metrics-outlier-triggers.png)

`Alert when result is greater than or equal to <threshold> standard deviations from baseline for <time range>`

| Parameter | Description |
|:--|:--|
| Threshold  | The number of standard deviations for calculating violations. The default is 3.0. |
| Time range | The duration of time to evaluate. Select either **5 minutes**, **10 minutes**, **15 minutes**, **30 minutes**, **1 hour**, **3 hours**, **6 hours**, **12 hours**, or **24 hours**. |

**Recover**

The recovery condition will always be the opposite of the alerting condition. For example, if there is no outlier identified for the duration of the detection window from the time the alert was first fired, then the Monitor will be brought back to the normal state. You cannot customize the resolution condition for the Monitor.


**Metrics Trigger Type: Missing Data**  

![missing.png](/img/monitors/missing.png)

`Alert when missing data <occurrence type> for <time range>`

| Parameter | Description |
|:--|:--|
| Occurrence type  | The time condition you want for the trigger. Choose either **for all** or **for any**.<br/><br/>If you choose all you will get notified when all of the metrics meeting the query condition are not sending data in the given time range.<br/><br/>Alternatively, you can choose any if you want to get notified when one of the metrics does not receive any data in the given time range. *This option requires at least one initial data point and expires after 24 hours once triggered.* |
| Time range | The duration of time to evaluate. Select either **5 minutes**, **10 minutes**, **15 minutes**, **30 minutes**, **1 hour**, **3 hours**, **6 hours**, **12 hours**, or **24 hours**. |

**Recover**

* Automatically: Sumo Logic automatically resolves the incident when the resolution condition is satisfied. 

    `Recover automatically when data becomes available for the affected time span.`

</details>

## Step 2: Advanced settings (optional)

The second step when you create a new monitor is to configure advanced settings.

<img src={useBaseUrl('img/monitors/new-monitor-advanced-settings.png')} alt="
Advanced settings" style={{border: '1px solid gray'}} width="800"/>

### Alert Name
Alert Name allows you to customize the name that appears on the Alert Page. By default, the Alert name is the monitor name, but you may want to create a custom name based on your use case. You can include any of the available alert variables, except `{{AlertName}}`, `Playbook`, `{{AlertResponseURL}}`, and `{{ResultsJson}}`, in the name such as the type of monitor or trigger condition. You can check the alert variables list for details.
   * Example: `{{Resultsjson.Env}}` - High CPU. This alert will produce an Alert with the name like PROD - High CPU. Here we are assuming that there is a field name Env in underlying data that has a value of "PROD".

### Evaluation Delay
Collection delays may occur due to your environment and it takes a couple of minutes for data to be processed into Sumo Logic. Since Monitors run on data from the most current time period, it's possible for Monitors to evaluate against incomplete data. As a result, Monitors can generate false positives or negatives that can cause confusion. Set an evaluation delay in seconds to delay the evaluation of a Monitor, so it doesn't look at the most current time (where data can be incomplete) and instead looks at an older period of time, where you have more complete data.<br/> ![additional settings evaluation delay.png](/img/monitors/additional-settings-evaluation-delay.png)<br/>If your data is coming from the [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics.md) we recommend a setting of 900 seconds.

## Step 3: Notifications (optional)

The third step when you create a new monitor is to configure notifications.

<img src={useBaseUrl('img/monitors/new-monitor-notifications.png')} alt="
Notifications" style={{border: '1px solid gray'}} width="800"/>

When a trigger condition is met, you can send notifications to other people and services. Metrics monitors have an option to send notifications either as a group or separately. **Group Notifications** define whether you want single notifications per time series that match the Monitor query or you want group notifications where you receive a single notification for the entire Monitor. Log monitors always group notifications.

To add notifications, click the **Add Notification** button. You can add more than one notification channel for a Monitor.

1. Set your **Preferred Notification Time Zone** for your monitor's alert notifications. If you do not select anything, it will default to the time zone specified in your user preferences.
1. The **Connection Type** specifies the notification channel where you want to get notified, such as an email or webhook. See [Connections](/docs/alerts/webhook-connections) for details. Monitor notifications support variables to reference its configuration settings or your raw data. See [alert variables](/docs/alerts/monitors/alert-variables) for a table of the available variables.
   * **Email**: Provide 1-100 recipient email addresses. You can customize the email subject and body.
   * **Webhook**: By default, the payload defined on the Connection is used. You can customize your payload for each notification if needed.
1. Select the **Alert** and **Recovery** checkboxes for each trigger type based on when you want to send a notification.  You can have different Trigger Conditions send a notification to different channels. For example, you can get notified on PagerDuty for critical Incidents and get an email or Slack notification for warning incidents.
   * If your connection type is Lambda, Microsoft Teams, OpsGenie, PagerDuty, Slack, or a generic webhook, the **Recovery** checkbox enables an automatic resolution process that updates the connection when an alert has recovered within Sumo Logic. Support for other connection types is coming soon.
   * **Add Notifications** to add additional notification channels as needed. You can configure different notifications for each trigger type, critical, warning, and missing data.

## Step 4: Playbook (optional)

The fourth step when you create a new monitor is to add playbooks.

<img src={useBaseUrl('img/monitors/new-monitor-playbook.png')} alt="Playbook" style={{border: '1px solid gray'}} width="800"/>

In this step, you can add a **Playbook** to run in response to an alert. 

1. **Text Playbook**. Enter instructions for how to handle the alerts resulting from the monitor. This allows admins to codify tribal knowledge for an on-call so that they know what to do upon receiving an alert. Markdown is supported. For an example, see [Alert details](/docs/alerts/monitors/alert-response/#alert-details).
1. **Automated Playbooks**. Select an existing playbook from the Automation Service to run when an alert is fired. For more information, see [Automated Playbooks in Monitors](/docs/alerts/monitors/use-playbooks-with-monitors/).
1. **Add Playbook**. If desired, you can add more automated playbooks to run sequentially.
1. Click **Manage Playbooks** to manage the automated playbooks in the Automation Service. 

## Step 5: Monitor details

The fifth step when you create a new monitor is to configure monitor details.

<img src={useBaseUrl('img/monitors/new-monitor-details.png')} alt="
Monitor details" style={{border: '1px solid gray'}} width="800"/>

1. Enter a **Monitor Name** and the **Location** where you want to save it.
1. (Optional) Add one or more **Tags**. [Learn more here](/docs/alerts/monitors/settings#tags).
1. (Optional) Add a **Description**.
1. When you're done creating the monitor, click **Save**. 

## Other Configurations

### Using Terraform

You can configure Sumo Logic Monitors using [Terraform modules](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor).
