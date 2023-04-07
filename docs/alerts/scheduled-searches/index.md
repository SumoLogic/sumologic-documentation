---
slug: /alerts/scheduled-searches
title: Scheduled Searches
sidebar_label: Scheduled Searches
description: You can schedule log searches to send alerts.
---

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/general/calendar.png')} alt="icon" width="75"/>

Scheduled searches are standard saved searches that are executed on a schedule you set. Once configured, scheduled searches run continuously, making them a great tool for continuously monitoring your stack. For instructions, see [Schedule a Search](schedule-search.md).

## Scheduled Search Alert Types

When you create a scheduled search, you can configure several different alert types including email, Script Action, ServiceNow Connection, Webhook, Save to Index, Real Time Alerts, and Cloud SIEM Enterprise (CSE) Signals.

### Email

You can create a scheduled search to alert you with an email when a set of conditions are satisfied. A maximum of 120 emails are sent per day per scheduled search. For instructions, see [Create an Email Alert](create-email-alert.md).

### Script Action

A Script Action is a Source type that receives data uploads triggered by a scheduled search. The script you create defines how data is consumed; for example, you could fire SNMP traps based on the result of the search. After setting up a Script Action, create a scheduled search. Each time the search query executes, the Collector runs the script configured in the Script Action. For instructions, see [Script Action](/docs/send-data/installed-collectors/sources/script-action).

:::note
You need the [View Collectors role capability](/docs/manage/users-roles/roles/role-capabilities.md) to alert with a Script Action.
:::

### ServiceNow Connection

Existing customers of both ServiceNow and Sumo Logic can now take advantage of the integration between the services. With this integration, search results from Sumo Logic are uploaded to your organization's ServiceNow account, allowing your organization to investigate issues across your deployment.

The main way data is uploaded to ServiceNow is through the use of scheduled searches. After saving a search, results are available in ServiceNow. Additionally, you can launch ad-hoc ServiceNow investigations using search results in Sumo Logic. For instructions, see [ServiceNow](/docs/alerts/webhook-connections/servicenow/).

### Webhook

Webhook connections allow you to send Sumo Logic alerts to third-party applications that accept incoming webhooks. For example, once you set up a Webhook connection in Sumo Logic, and create a scheduled search, then you can send an alert from that scheduled search as a post to a Slack channel, or integrate with third-party systems. For instructions, see [Scheduled Searches for Webhook Connections](/docs/alerts/webhook-connections/schedule-searches-webhook-connections).

### Save to Index

When you create a Scheduled Search, you can save the results to an Index. This way, your data can be searched at a later time using `_index=index_name` with increased search performance. For instructions, see [Save to Index](save-to-index.md).

### Save to Lookup

When you create a Scheduled Search, you can save the results to a [Lookup Table](../../search/lookup-tables/create-lookup-table.md). This way, you can view the results of the scheduled search from the Library by viewing the Lookup Table the search results were saved to. You can use the [lookup](/docs/search/search-query-language/search-operators/lookup) operator to enrich other log data with the information from the Lookup Table. For instructions, see [Save to Lookup](save-to-lookup.md).

### Real Time Alerts

Real Time Alerts are scheduled searches that run nearly continuously. That means that you're informed in real time when error conditions exist.

When an alert condition is satisfied, Sumo Logic sends an email (or triggers a script action). Sumo Logic examines ingested data in a rolling window using the Time Range you define. Any time a new result is found, another email is sent. For instructions, see [Create a Alert](create-real-time-alert.md).

### CSE Signal

You can trigger the creation of a CSE Signal with a scheduled search. Signals are otherwise generated when the conditions of a CSE rule are satisfied by a Record. Signals are correlated with other Signals to create a [CSE Insight](../../cse/records-signals-entities-insights/insight-generation-process.md). For instructions, see [Generate CSE Signals With a Scheduled Search](generate-cse-signals.md).

## Guides

Important considerations:
* [How to Prevent your Scheduled Search from Timing Out](faq.md#how-to-prevent-your-scheduled-search-from-timing-out). Scheduled searches cannot run indefinitely. At some point, the query will be timed out to protect the reliability of the service.
* [Service Alert: Scheduled Search Email Quota Reached for Search](/docs/alerts/scheduled-searches/faq#service-alert-scheduled-search-email-quota-reached-for-search). Sumo Logic implements an email quota allowing 120 emails to be sent per day per scheduled search.
* [What Happens When a Scheduled Search Is Suspended?](faq.md#what-happens-when-a-scheduled-search-is-suspended) Learn what happens when a Scheduled Search is suspended.
* [Why Would a Scheduled Search Fail?](faq.md#why-would-a-scheduled-search-fail) Learn how to troubleshoot a failed Scheduled Search.

:::note
Fields are returned in lowercase in scheduled search results.
:::

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/alerts/scheduled-searches/schedule-search"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Schedule a Search</h4></a>
  <p>Learn how to add alerts and schedule search to run it at a regular scheduled time.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/alerts/scheduled-searches/create-email-alert"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Create an Email Alert</h4></a>
  <p>Learn how to create a scheduled search email alert.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/alerts/scheduled-searches/create-real-time-alert"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Create a Real-Time Alert</h4></a>
  <p>Learn how to create an alert to get notified in real-time when error conditions exist.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/alerts/scheduled-searches/edit-cancel"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Edit or Cancel a Scheduled Search</h4></a>
  <p>Learn how to edit or cancel a scheduled search at any time.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/alerts/scheduled-searches/receive-email-alerts"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Receive Email Alerts from Scheduled sources</h4></a>
  <p>Learn how to set up and receive email alerts about scheduled searches.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/alerts/scheduled-searches/generate-cse-signals"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Generate CSE Signals With a Scheduled Search</h4></a>
  <p>Learn how to create a scheduled search that will trigger a Cloud SIEM Enterprise (CSE) Signal.</p>
  </div>
</div>
<div className="box smallbox7 card">
  <div className="container">
  <a href="/docs/alerts/scheduled-searches/run-search-from-alert-email"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Run a Search from an Alert Email</h4></a>
  <p>Learn how to receive an email created by an email alert in a scheduled search.</p>
  </div>
</div>
<div className="box smallbox8 card">
  <div className="container">
  <a href="/docs/alerts/scheduled-searches/save-to-index"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Save to Index</h4></a>
  <p>Learn how to save the results to an Index after creating a scheduled search email alert.</p>
  </div>
</div>
<div className="box smallbox9 card">
  <div className="container">
  <a href="/docs/alerts/scheduled-searches/save-to-lookup"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Save to Lookup</h4></a>
  <p>Learn how to save the results of a scheduled search to a Lookup Table.</p>
  </div>
</div>
<div className="box smallbox10 card">
  <div className="container">
  <a href="/docs/alerts/scheduled-searches/faq"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>FAQ</h4></a>
  <p>Go through frequently asked questions about scheduled searches and troubleshooting tips.</p>
  </div>
</div>
</div>
