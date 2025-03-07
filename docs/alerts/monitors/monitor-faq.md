---
id: monitor-faq
title: Monitors FAQ
description: Frequently asked questions about Sumo Logic monitors.
---

import AlertsTimeslice from '../../reuse/alerts-timeslice.md';

## How can I optimize scan costs for monitors when using Flex Pricing?

To optimize scan costs for monitors under [Flex Pricing](/docs/manage/partitions/flex), consider the following factors:

- **Data scanned by the query**. This is the primary driver of cost and is incurred every time the monitor is evaluated. To reduce costs, optimize your query using [default scope](/docs/manage/partitions/flex/faq/#how-can-i-optimize-my-query-using-default-scope) to include only necessary partitions and minimize the amount of data scanned.
- **Time range of the monitor query**. For static monitors, adjust the detection window under [Trigger Type](/docs/alerts/monitors/create-monitor/#step-1-set-trigger-conditions) (for example, `"Alert when result is _____ within <detection window> minutes"`) to use a shorter time range, which reduces the amount of data scanned. For outlier monitors, reduce the **datapoints** parameter under **Trigger Type** to lower the scanned bytes.

By carefully configuring these elements, you can balance scan costs with monitoring requirements.

## Can I convert my existing Scheduled Search to a monitor?

Yes, however, it's a manual process. You have to create a new monitor with the appropriate query and alerting condition based on your existing Scheduled Search. See the [differences between monitors and Scheduled Searches](/docs/alerts/difference-from-scheduled-searches) before you consider converting.

## I am getting an error message about cardinality when creating a metrics monitor - what does it mean?

Metrics monitors can evaluate up to 15K time series. If your monitor query returns more than 15K time-series, you'll get this error. To resolve, we recommend breaking up the monitor into several smaller ones with more restrictive queries. See [OpenTSDB documentation](http://opentsdb.net/docs/build/html/user_guide/definitions.html) for details on cardinality.

For example, instead of creating one monitor to alert on CPU utilization, you could break it up into one monitor per deployment or service. This will also give you more flexibility in setting more customized thresholds and help reduce alert noise.

## Why does my monitor get automatically disabled? 

Sumo Logic will automatically disable a monitor if it violates specific limitations. You can check the reason it was disabled with the [System Event Index](/docs/manage/security/audit-indexes/system-event-index.md). The following query will search the System Event Index for the reason:

```sql
_index=sumologic_system_events MonitorSystemDisabled <monitorId>
```

You need to replace `<monitorId>` with the ID of the monitor.

A common reason a metric monitor is disabled is the cardinality limit was exceeded.

The default cardinality limits for metrics monitors are -:
1. An aggregate metrics monitor can evaluate up to 15,000 time series.
2. A non-aggregate Metrics monitor can evaluate up to 3,000 time series.
3. For join queries, a cardinality limit of 3,000 rows is applied. These are query row output cardinality limit for join queries like (#A/#B) * 100 in #C row and similarly other queries.

 
For example, if you use Kubernetes and have 20,000 pods in your deployment, a query that spans all pods, like the following, will result in the cardinality error.

```sql
deployment=acme metric=container_cpu_usage_seconds_total | rate | sum by pod
```

**How to fix it**

Break your monitor into several monitors. Based on the above Kubernetes example, if you are collecting Kubernetes data from different AWS regions, instead of creating a single alert on all pods across all AWS regions, create one alert per AWS region, as shown below.

```sql title="Monitor 1 query"
deployment=acme region=us-west2 metric=container_cpu_usage_seconds_total | rate | sum by pod
```

```sql title="Monitor 2 query"
deployment=acme region=us-east1 metric=container_cpu_usage_seconds_total | rate | sum by pod
```

And so on.

## Is there a limit to the number of monitors I can have?

See [Sumo Logic Pricing](https://www.sumologic.com/pricing) to learn the number of monitors (active and inactive) you can run simultaneously. You can increase the monitor limit up to 5000 by reaching out to our support team.

For the best experience, we recommend being mindful of the number of monitors you create. Having a manageable volume of alerts will allow your team to better respond to critical issues.

## Can I reference my monitor configuration in the notification?

Yes, you can use [Alert Variables](/docs/alerts/monitors/alert-variables) to reference various monitor configurations in your custom payload.


## How does a timeslice affect a monitor?

<AlertsTimeslice/>

## Does Sumo Logic let me get alerts from a specific static IP address that I can allowlist?

Yes, Sumo Logic provides webhook notifications through static IP addresses. You can allowlist those IP addresses to receive notifications directly from Sumo Logic. For a list of our allowlist addresses, contact [Support](https://support.sumologic.com/support/s).

:::note
The [Test Connection feature for webhooks](/docs/alerts/webhook-connections/set-up-webhook-connections) does not use the same static IP addresses that send notifications. It uses different temporary IP addresses.
:::

## One of our monitors suddenly stopped sending notifications, even though I see it on the monitors page

One reason could be that the user who created the monitor was deleted. You can check the **Created By** value on the monitors page. If it has `<User Unknown>`, you will need to re-create the monitor.  <br/>![user unknown monitors.png](/img/alerts/monitors/user-unknown-monitors.png)

You can quickly **Duplicate** the monitor by hovering over it on the monitors page and clicking the three-dot kebab icon:<br/>![more actions menu for monitors.png](/img/alerts/monitors/more-actions-menu-for-monitors.png)  

then selecting **Duplicate**. If your monitor still doesn't work, we recommend contacting [Sumo Logic support](https://support.sumologic.com/). 

## Can I disable a monitor during scheduled maintenance or upgrade window?

Yes. See [Muting Schedules](/docs/alerts/monitors/muting-schedules) to learn how to pause alert notifications from monitors according to a schedule defined by you.
