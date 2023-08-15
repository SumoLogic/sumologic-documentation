---
id: monitor-faq
title: Monitors FAQ
description: Frequently asked questions about Sumo Logic Monitors.
---

## Can I convert my existing Scheduled Search to a Monitor?

Yes, however, it's a manual process. You have to create a new Monitor with the appropriate query and alerting condition based on your existing Scheduled Search. See the [differences between Monitors and Scheduled Searches](/docs/alerts/difference-from-scheduled-searches) before you consider converting.

## I am getting an error message about cardinality when creating a metrics monitor - what does it mean?

Metrics monitors can evaluate up to 15K time series. If your Monitor query returns more than 15K time-series, you'll get this error. To resolve, we recommend breaking up the monitor into several smaller ones with more restrictive queries. See [OpenTSDB documentation](http://opentsdb.net/docs/build/html/user_guide/definitions.html) for details on cardinality.

For example, instead of creating one monitor to alert on CPU utilization, you could break it up into one monitor per deployment or service. This will also give you more flexibility in setting more customized thresholds and help reduce alert noise.

## Why does my monitor get automatically disabled? 

Sumo Logic will automatically disable a Monitor if it violates specific limitations. You can check the reason it was disabled with the [Audit Event Index](/docs/manage/security/audit-event-index.md). The following query will search the Audit Event Index for the reason:  

```sql
_index=sumologic_system_events MonitorSystemDisabled <monitorId>
```

You need to replace `<monitorId>` with the ID of the Monitor.

A common reason a metric Monitor is disabled is the Cardinality Limit was exceeded. An aggregate Metric Monitor can evaluate up to 15,000 time series. A non-aggregate Metric Monitor can evaluate up to 3,000 time series. For example, if you use Kubernetes and have 20,000 pods in your deployment, a query that spans all pods, like the following, will result in the cardinality error.

```sql
deployment=acme metric=container_cpu_usage_seconds_total | rate | sum by pod
```

**How to fix it**

Break your Monitor into several monitors. Based on the above Kubernetes example, if you are collecting Kubernetes data from different AWS regions, instead of creating a single alert on all pods across all AWS regions, create one alert per AWS region, as shown below.

Monitor 1 query:

```sql
deployment=acme region=us-west2 metric=container_cpu_usage_seconds_total | rate | sum by pod
```

Monitor 2 query:

```sql
deployment=acme region=us-east1 metric=container_cpu_usage_seconds_total | rate | sum by pod
```

And so on.

## Is there a limit to the number of monitors?

You can have up to 5,000 monitors (active and inactive) simultaneously.

For the best experience, we recommend being mindful of the number of monitors you create. Having a manageable volume of alerts will allow your team to better respond to critical issues.

## Can I reference my monitor configuration in the notification?

Yes, you can use [Alert Variables](/docs/alerts/monitors/alert-variables) to reference various monitor configurations in your custom payload.

## Does Sumo Logic let me get alerts from a specific static IP address that I can allowlist?

Yes, Sumo Logic provides webhook notifications through static IP addresses. You can allowlist those IP addresses to receive notifications directly from Sumo Logic. For a list of our allowlist addresses, contact [Support](https://support.sumologic.com/hc/en-us).

:::note
The [Test Connection feature for webhooks](/docs/alerts/webhook-connections/set-up-webhook-connections) does not use the same static IP addresses that send notifications. It uses different temporary IP addresses.
:::

## One of our monitors suddenly stopped sending notifications, even though I see it on the Monitors page

One reason could be that the user who created the monitor was deleted. You can check the **Created By** value on the Monitors page. If it has `<User Unknown>`, you will need to re-create the monitor.  <br/>![user unknown monitors.png](/img/monitors/user-unknown-monitors.png)

You can quickly **Duplicate** the monitor by hovering over it on the Monitors page and clicking the three-dot icon:<br/>![more actions menu for monitors.png](/img/monitors/more-actions-menu-for-monitors.png)  

then selecting **Duplicate**. If your monitor still doesn't work, we recommend contacting [Sumo Logic support](https://support.sumologic.com/). 

## Can I disable a Monitor during scheduled maintenance or upgrade window?

The Monitors page allows you to disable a Monitor so you're not alerted during specific times like scheduled maintenance or upgrade windows. Follow the below steps to disable a monitor. 

1. Find and select the Monitor in the Monitors table. A three-dot icon appears on the right of the row.<br/> ![menu-option.png](/img/monitors/menu-option.png)
1. Click the three-dot icon to view the menu options. You can select to Enable or Disable the monitor.

Currently, you can only manually disable or enable a Monitor. You can't disable and enable based on a schedule.
