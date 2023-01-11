---
id: about-cse-insight-ui
title: About the CSE Insight UI
sidebar_label: CSE Insight UI
description: Learn about the contents of the Insights UI in CSE.
---

This topic describes the CSE UI for working with Insights. 

## Insights list page

To open the **Insights** page, click the icon to the right of the search bar at the top of the CSE UI.

By default, the **Insights** page presents all Insights whose **Status** is not “Closed”, in descending order by Event Time in a list view. If you’d like to see Insights organized by their status, click the **Show Board** icon near the top right corner of the page. For information about the Board view, see [Board view](#board-view).

:::note
CSE displays Insights and the Signals attached to them in the CSE UI through the end of the data retention period defined in your account agreement. 
:::

### List view

This screenshot shows the **Insights** page in List view. 

![insights-page.png](/img/cse/insights-page.png)

Here’s one row from the List view. The numbered definitions below correspond to the labels in the screenshot.

![insight-summary.png](/img/cse/insight-summary.png)

1. **Creation date and time**. When the Insight was created.
1. **Dwell time**. The period of time between when the first and last Records in the Insight were observed.  
1. **Age**. The elapsed time since the Insight was created in minutes, hours, and so on.
1. **Insight name**. The Insight name, made up of the Insight ID, and the MITRE stage or stages associated with the Signals in the Insight. 
2. **Global Confidence**. If sufficient data is available, a [Global Confidence score](global-intelligence-security-insights.md) for the Insight is shown. 
3. **Assignee**. The analyst assigned to the Incident.
4. **Severity**. The severity of the Insight. The value is a function of the configured Entity Activity Score threshold for Insight generation. For more information, see [Insight Severity](insight-generation-process.md).
5. **Entity**. The Entity associated with the Insight.
6. **Signal data**. This area has three bits of information:
   * The count of Signals that caused the Insight to be created.
   * The total count of Signals on the Insight Entity during the detection window.
   * How long it's been since the last Signal fired associated with the Insight fired.
7. The visualization plots the Insight's Signals over time (x-axis) by severity (y-axis).

### Board view

This screenshot shows the Insights page with the Signals organized as a Board. Each of the columns corresponds to an Insight Status value. (One of the Status values shown is a [custom Insight Status](../administration/manage-custom-insight-statuses.md)).

The information displayed in the Board view is similar to the information in the [List view](#list-view). 

You can switch back the List view by clicking the Show List icon, near the top right corner of the CSE UI.

![board.png](/img/cse/board.png)

### Filtering Insights 

You can use the **Filters** area near the top of the page to narrow down the Insights that appear on the Insights page. You can filter by:

* Status
* Assignee
* Severity
* Created
* Event Time
* Severity
* Resolution
* [Custom Resolution](../administration/manage-custom-insight-resolutions.md)
* Name
* Tags
* Rule ID
* Entity

## Insight Details page

This section describes the **Insight \> Details** page.

### Insight details pane

The left pane of the **Insight \> Details** page displays detailed information about the selected Insight. Some of the information that appears is the same as what’s in the row for an Insight on the **Insights** page, and is described in [List view,](#list-view) above. The additional information that appears in the **Details** pane is defined below.

![insight](/img/cse/insight-details.png)

1. **Actions.** The dropdown lists Insight Actions defined in your environment.
1. **Close Insight.** Use this option to close an Insight. When you click this option, you’re prompted to select an Insight resolution.
1. **Delete Icon.** Use this option to delete an Insight. You’ll be prompted to confirm your choice.
1. **Status.** Current status of the Insight.
1. **Assignee and Assign to me.** Shows the current assignee, and allows you to assign yourself the Insight.
1. **Entity.** The Entity the Insight fired on.
1. **Severity.** Severity of the Insight. Mouse over it to see an icon you can click to change the Insight severity.
1. **Global Confidence.** The Global Confidence score for the Insight, if available.
1. **Signal Data.** The number of Signals in the Insight.
1. **Event Time.** The event time for the of the last Signal in the Insight.
1. **Dwell Time.** The period of time between when the first and last Records in an Insight were observed.
1. **Insight Created.** When the Insight was created.
1. **Tags and Create a Tag.** Displays any Tags that have already been assigned to the Insight, and a field for adding a tag.
1. **Comments.** Displays any comments that have been made on the Insight, and a field for adding a comment.
1. **Show Comments/History.** The controls allow you to switch between viewing comments, and viewing the Insight history, for example, when a tag was assigned to the Insight.

### Signal visualization area

At the top of the **Insight \> Details** page, you’ll see a Signal timeline that visualizes the Insight’s attached Signals, which are the Signals that caused the Insight to be created, and any Signals that have been manually added to the Insight.

![top-bit.png](/img/cse/top-bit.png)

1. **Signals**.The Signals link allows you to switch back to the Signals view from the Enrichments view, described below. 
2. **Enrichments**. Click this tab to view any any enrichments that have been added to the Insight, includin the output of  [Insight Enrichment Server](../integrations/insight-enrichment-server.md).
3. **Signal timeline**. The timeline shows how spread apart each Signal in the Insight is. You can use the timeline to visualize how long these events are spread over and how frequently the Signals fire. 
4. **Timeline controls**. The arrows on the far left and right sides allow you to toggle between each Signal to show the details on each. You can also click a specific Signal on the timeline to jump to those details. 
5. **Legend**. Key to the symbols used to represent the Signals:
   * Anomalies—Signals that were triggered by User and Entity Behavior Analytics (UEBA) rules.
   * Threat intelligence—Signals that were fired by Threat Intel rules.
   * File Analysis—Signals that were triggered by [Yara file analysis rules](/docs/cse/rules/import-yara-rules).
   * Rules—Signals that were triggered by other rules.
6. **Show Related Signals**. Click this link to show Related Signals in addition to Attached Signals. 
7. **Sort options**. You can sort the Signals list by Content Type, Event Time, Created Time, Name, or Severity. Note that you can further sort by ascending or descending value.
8. **Add Signals**. Click this option if you want to add a Signal to the Insight. You’ll be prompted with a list of Signals that have the same Entity as the current Insight (if there are any), and are not already attached to another Insight. A Signal that you add to an Insight manually is considered an Attached Signal.

### Entities tab

The **Entities** tab displays a list of one or more _Related Entities_, which help a security analyst more quickly investigate the Insight and to better understand the scope of a security issue that the Insight reveals.

Related Entities extend the information available to the analyst beyond the data captured in an Insight. An Insight focuses on a primary Entity: the username, hostname, IP address, or MAC address that’s found in each of the Insight’s Signals. Related Entities expand the analyst’s view to include other Entities listed in the Records that belong to Signals in an Insight as well as Entities that aren’t in those Records but have a relationship to Entities that are.

The screenshot below shows the **Entities** tab for an Insight.

![related-entities.png](/img/cse/related-entities.png)

#### About the Entities tab

The **Entities** tab for an Insight lists all Entities involved in an Insight, and other Entities that CSE has determined are related to them.

Note that in the list of Entities, some are not indented, and others are indented below another Entity. The first unindented Entity listed is the primary Entity for the Insight–the Entity which is common to all of the Signals in the Insight. The other unindented Entities in the list are Entities contained in one or more Records that belong to Signals in the Insight.

The indented Entities in the list are referred to as related Entities. How does that work? For each Entity in the Insight—including the primary Entity and other Entities in the Insights’s Signals—CSE searches for Entities that, although not found within the Insight’s Signals, seem to be related to an Entity in the Insight. This search is run across a time range that corresponds to the span of time during which there was activity on the Insight. For example, if the first Record in an Insight was created at 8 am on Wednesday and the last Record at 10pm on Friday, CSE searches for related Entities during that time range. A related Entity that CSE finds is shown below the Entity to which it’s related with a dotted line, and labeled **May also be.**  


:::note
If an Entity is in the Record and is _also_ a related Entity (is labeled **May also be**) it could be either indented or not indented, based on the number of Signals that mention the Entity (the higher the number, the more likely it is to be unindented.
:::

How does CSE look for related Entities? Within the time range of the Insight, described above, CSE searches for related Entities in the following normalized Record fields:

* `*_ip`
* `*_hostname`
* `*_username`
* `*_mac`
* `*_process`
* `*_command`
* `*_hash`
* `*_domain`
* `*_useragent`
* `*_email`
* `*_url`
* `*_file`

:::note
[Custom Entities](/docs/cse/records-signals-entities-insights/create-custom-entity-type.md) that match will also be included in the results.
:::

#### What’s in an Entity card

The card for an Entity displays any [tags](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules.md) that have been assigned the Entity, along with the following information:

* The number of times that Entity was referenced in the Signals in the Insight.
* The number of Insights, created during the Insight generation [detection window](/docs/cse/records-signals-entities-insights/set-insight-generation-window-threshold.md), in which the current Entity is the primary Entity.
:::note
The detection window is 14 days by default, but can be configured to be a different duration.
:::
* The number of Signals that fired during the Insight generation detection window, in which the current Entity is the primary Entity, and the sum of the severities for those Signals.
:::note
The cumulative severity value is color coded: cyan for less than 12, orange for 12-23, and red for 24 and above, assuming your Insight generation threshold is 12. If the Insight threshold is set to a value other than the default of 12, the color coding will be adjusted to match
:::

#### Entity details in the right pane

When you select an Entity in the center pane, the right pane displays details about that Entity. The information displayed depends on what type of Entity is selected (username, hostname, IP address, MAC address, or custom) and can include:

* A link to the Entity’s details page.
* [Entity Criticality](/docs/cse/records-signals-entities-insights/entity-criticality.md), if it is set to something other than the default.
* Metadata such as geographic location, Inventory information, the [Network Blocks](/docs/cse/administration/create-use-network-blocks.md) it falls within, as applicable, and so on.
* A Signal graph that shows when the Signals were created on the horizontal axis (which is at most 14 days—the detection window), the severity of each Signal on the vertical axis, and the Signal type based on the icon/color of each point.
* Lists of the recent Signals and Insights the Entity has been associated with, and links to each object’s details page.

#### Accessing related Entities using the API

You can access related Entity information using the CSE API. For more information, see [CSE APIs](/docs/cse/administration/cse-apis.md).


### Signal list area 

Below the Signal timeline, you’ll see a list of Signals. By default, only attached Signals are displayed.  

![signal-list-area.png](/img/cse/signal-list-area.png)

If you click the **Show Related** checkbox, the page updates and also displays any Related Signals or Related Insights

* A *Related Signal* is a Signal that isn’t part of the current Insight (it’s not attached),  but fired on the same Entity as the current Insight’s attached Signals within 7 days of the current Insight’s attached Signals. 
* A *Related Insight* is an Insight that a Related Signal is attached to.

Here is an example of what a Related Signal and Related Insight look like in the Signal list. Note that, to distinguish between Signals that are attached as opposed to related, an Attached Signal has a blue vertical “ornament” on the left side of the row. A Related Signal does not.

![related-signal.png](/img/cse/related-signal.png)  
 
