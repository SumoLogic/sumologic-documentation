---
id: pagerduty-v3
title: PagerDuty V3
sidebar_label: PagerDuty V3
description: The Sumo Logic App for PagerDuty V3 collects incident messages from your PagerDuty account via a webhook, and displays incident data in pre-configured Dashboards that allow you to monitor and analyze the activity of your PagerDuty account and Services.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/pagerduty.png')} alt="Thumbnail icon" width="75"/>

The Sumo Logic App for PagerDuty V3 collects incident messages from your PagerDuty account via a webhook, and displays incident data in pre-configured Dashboards that allow you to monitor and analyze the activity of your PagerDuty account and Services. The Sumo Logic App for PagerDuty V3 uses Webhooks V3, to provide enhanced context for alert object models.


## Collect Logs for PagerDuty V3

This section provides instructions for configuring a Sumo Logic Hosted Collector and HTTP Source to create a PagerDuty Webhook V3, to collect PagerDuty events. Click a link to jump to a topic:

* [Event types](#Event-Types)
* [Log example](#Log-Examples)
* [Sample Query](#Query-example)
* [Configure a Sumo Logic Collector and Source](#Configure-a-Sumo-Logic-Collector-and-Source)
* [Create a PagerDuty V3 Webhook](#Create-a-PagerDuty-V3-Webhook)


### Event Types

The Sumo Logic App for PagerDuty V3 ingests PagerDuty incident Webhooks V3 messages, that are triggered by events that occur in your PagerDuty account and Services.

For more information on the incident messages supported in Webhooks V3, see the [PagerDuty documentation](https://developer.pagerduty.com/docs/ZG9jOjQ1MTg4ODQ0-overview).


### Log example

For examples of incident.triggered, incident.acknowledged and incident.resolved log messages, see the [PagerDuty Webhooks V3 Examples](https://developer.pagerduty.com/docs/ZG9jOjQ1MTg4ODQ0-overview#webhook-payload) page.


### Sample Query

The following Top Altering Services query is shown on the PagerDuty V3 - Overview dashboard.


```
_sourceCategory = Labs/pagerduty_v3 "incident.triggered"
| json "event.event_type","event.data","event.data.created_at" as event,incident,created_on nodrop
| json field=incident "id", "number", "escalation_policy.summary", "service.summary", "status", "title", "urgency", "teams[*].summary", "assignees[*]"  as incident_id, incident_number, escalation_policy_name, alertedBy_service, incident_status, incident_title, incident_urgency,  incident_team_involved, assignee nodrop
| parse regex field=assignee "summary\":\"(?<assigned_user>.+?)\"" multi nodrop
| alertedBy_service as impacted_service
| where event = "incident.triggered" and impacted_service matches "*" and incident_number matches "*" and incident_status matches "*" and incident_title matches "*" and incident_urgency matches "*"
| count by alertedBy_service
| order by _count
```

### Configure a Sumo Logic Collector and Source

A** Hosted Collector **is not installed on a local system in your deployment. Instead, Sumo Logic hosts the Collector and its Sources in AWS. With a Hosted Collector, you can create Sources to collect data from various services. A single Hosted Collector can be configured with any number of  Sources.

An **HTTP Source** is an endpoint for receiving log and metric data uploaded to a unique URL generated for the Source. The URL securely encodes the Collector and Source information. You can add as many HTTP Logs and Metrics Sources as you'd like to a single Hosted Collector.

To configure Hosted Collector and HTTP Source, do the following:

1. Log in to Sumo Logic.
2. Follow the instructions for configuring a [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
3. Follow the instructions for configuring an [HTTP Source](/docs/send-data/hosted-collectors/http-source/logs-metrics).


:::important
Make sure to save the **HTTP Source Address URL**. You will be asked for this **Endpoint URL** when you configure the PagerDuty Webhook in the following procedure.
:::

### Create a PagerDuty V3 Webhook

Using PagerDuty with Webhooks V3, you receive HTTP callbacks when incident events occur in your PagerDuty account. Details about the events are then sent via HTTP to a URL that you specify.

To create a PagerDuty V3 Webhook, do the following:

1. Log in to your PagerDuty account.
2. Navigate to **Integrations Generic Webhooks (v3)**.
3. Click **New Webhook**.
4. Configure your webhook:
    1. Enter the **HTTP Source Address URL** as the Webhook URL.
    2. For** Scope Type**, select Service, Team or Account based on your preferences.
    3. For **Scope**, select the desired service or team.
    4. Enter a **Description**.
    5. For **Event Subscription**, select which events you want to send a webhook.
5. Click **Add Webhook**.


For more information, see [https://support.pagerduty.com/docs/webhooks](https://support.pagerduty.com/docs/webhooks).

In the next section, install the Sumo Logic App for PagerDuty V3.


## Installing the PagerDuty V3 App

This section provides instructions for installing the Sumo App for PagerDuty V3, as well as the descriptions of each of the app dashboards.

Now that you have set up a log and metric collection, you can install the Sumo Logic App for PagerDuty V3, and use its pre-configured searches and dashboards.

{@import ../../reuse/apps/app-install.md}

## Viewing PagerDuty V3 Dashboards

:::tip Filter with template variables    
Template variables provide dynamic dashboards that can rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you view dynamic changes to the data for a quicker resolution to the root cause. You can use template variables to drill down and examine the data on a granular level. For more information, see [Filter with template variables](/docs/dashboards-new/filter-template-variables.md).
:::

### Overview

**PagerDuty V3 - Overview Dashboard **provides a high-level view of top alerts, triggered incidents summary, as well as a breakdown of per-user incident assignments and comparisons over a specified time interval.

Use this dashboard to:

* Review the services, incidents and policies that are causing the most alerts.
* Analyze detailed information on incidents using the Incident Summary panel.
* Drill down to examine data on a granular level with filters.

<img src={useBaseUrl('img/integrations/saas-cloud/PagerDuty-V3-Overview.png')} alt="PagerDuty V3 dashboards" />

### Incidents Overview

**PagerDuty V3 - Incidents Overview Dashboard** provides an at-a-glance analysis of triggered, acknowledged, escalated, assigned, and resolved incidents. This dashboard also provides a high-level view of incident trends and comparisons over specified time intervals.

Use this dashboard to:
* Review a high-level view of incident summaries.
* Compare the state of incidents with that of a previous time

<img src={useBaseUrl('img/integrations/saas-cloud/PagerDuty-V3-Incidents-Overview.png')} alt="PagerDuty V3 dashboards" />


### Incidents by Urgency and Escalation Policy

**PagerDuty V3 - Incidents by  Urgency and Escalation Policy Dashboard** provides an overview analysis of urgency events, from low to high, as well as a breakdown of the services impacted by high urgency events.

Use this dashboard to:
* Review see weekly incident summaries.
* Analyze incidents by severity and escalation policy.

<img src={useBaseUrl('img/integrations/saas-cloud/PagerDuty-V3-Incidents-by-Urgency-and-Escalation-Policy.png')} alt="PagerDuty V3 dashboards" />
