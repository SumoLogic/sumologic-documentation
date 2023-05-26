---
slug: /alerts/scheduled-searches
title: Scheduled Searches
sidebar_label: Scheduled Searches
description: You can schedule log searches to send alerts.
---

Scheduled searches are standard saved searches that are executed on a schedule you set. Once configured, scheduled searches run continuously, making them a great tool for continuously monitoring your stack. For instructions, see [Schedule a Search](schedule-search.md).

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

In this section, we'll introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>

Important considerations:

* [How to Prevent your Scheduled Search from Timing Out](faqs/prevent-scheduled-search-timing-out.md).
    Scheduled searches cannot run indefinitely. At some point, the query will be timed out to protect the reliability of the service.

* [Service Alert: Scheduled Search Email Quota Reached for Search](/docs/alerts/scheduled-searches/faq#service-alert-scheduled-search-email-quota-reached-for-search).
    Sumo Logic implements an email quota allowing 120 emails to be sent per day per scheduled search.

* [What Happens When a Scheduled Search Is Suspended?](faqs/suspended-scheduled-search.md)
    Learn what happens when a Scheduled Search is suspended.

* [Why Would a Scheduled Search Fail?](/docs/alerts/scheduled-searches/faq#why-would-a-scheduled-search-fail)
    Learn how to troubleshoot a failed Scheduled Search.

:::note
Fields are returned in lowercase in scheduled search results.
:::

## Scheduled Search Alert Types

When you create a scheduled search, you can configure several different alert types including email, Script Action, ServiceNow Connection, Webhook, Save to Index, Real Time Alerts, and CLoud SIEM Enterprise (CSE) Signals.

### Email

You can create a scheduled search to alert you with an email when a set of conditions are satisfied. A maximum of 120 emails are sent per day per scheduled search.

For instructions, see [Create an Email Alert](create-email-alert.md).

### Script Action

A Script Action is a Source type that receives data uploads triggered by a scheduled search. The script you create defines how data is consumed; for example, you could fire SNMP traps based on the result of the search.

After setting up a Script Action, create a scheduled search. Each time the search query executes, the Collector runs the script configured in the Script Action.

:::note
You need the [View Collectors role capability](/docs/manage/users-roles/roles/role-capabilities.md) to alert with a Script Action.
:::

For instructions, see [Script Action](/docs/send-data/installed-collectors/sources/script-action).

### ServiceNow Connection

Existing customers of both ServiceNow and Sumo Logic can now take advantage of the integration between the services. With this integration, search results from Sumo Logic are uploaded to your organization's ServiceNow account, allowing your organization to investigate issues across your deployment.

The main way data is uploaded to ServiceNow is through the use of scheduled searches. After saving a search, results are available in ServiceNow. Additionally, you can launch ad-hoc ServiceNow investigations using search results in Sumo Logic.

For instructions, see [ServiceNow](/docs/alerts/webhook-connections/servicenow/).

### Webhook

Webhooks connections allow you to send Sumo Logic alerts to third-party applications that accept incoming webhooks. For example, once you set up a Webhook connection in Sumo Logic, and create a scheduled search, then you can send an alert from that scheduled search as a post to a Slack channel, or integrate with third-party systems.

For instructions, see [Scheduled Searches for Webhook Connections](/docs/alerts/webhook-connections/schedule-searches-webhook-connections).

### Save to Index

When you create a Scheduled Search, you can save the results to an Index. This way, your data can be searched at a later time using `_index=index_name` with increased search performance.

For instructions, see [Save to Index](save-to-index.md).

### Save to Lookup

When you create a Scheduled Search, you can save the results to a [Lookup Table](../../search/lookup-tables/create-lookup-table.md). This way, you can view the results of the scheduled search from the Library by viewing the Lookup Table the search results were saved to. You can use the [lookup](../../search/search-query-language/search-operators/lookup) operator to enrich other log data with the information from the Lookup Table.

For instructions, see [Save to Lookup](save-to-lookup.md).

### Real Time Alerts

Real Time Alerts are scheduled searches that run nearly continuously. That means that you're informed in real time when error conditions exist.

When an alert condition is satisfied, Sumo Logic sends an email (or triggers a script action). Sumo Logic examines ingested data in a rolling window using the Time Range you define. Any time a new result is found, another email is sent. 

For instructions, see [Create a Alert](create-real-time-alert.md).

### CSE Signal

You can trigger the creation of a CSE Signal with a scheduled search. Signals are otherwise generated when the conditions of a CSE rule are satisfied by a Record. Signals are correlated with other Signals to create a [CSE Insight](../../cse/get-started-with-cloud-siem/insight-generation-process.md).
 

For instructions, see [Generate CSE Signals With a Scheduled Search](generate-cse-signals.md).
