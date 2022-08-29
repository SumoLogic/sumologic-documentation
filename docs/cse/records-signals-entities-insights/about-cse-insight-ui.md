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
1. **MITRE stage**. 
1. **Global Confidence**. If sufficient data is available, a [Global Confidence score](global-intelligence-security-insights.md) for the Insight is shown. 
1. **Assignee**. The analyst assigned to the Incident.
1. **Severity**. The severity of the Insight. The value is a function of the configured Entity Activity Score threshold for Insight generation. For more information, see [Insight Severity](insight-generation-process.md).
1. **Entity**. The Entity associated with the Insight.
1. **Signal data**. This area has three bits of information:

   * The count of Signals that caused the Insight to be created.
   * The total count of Signals on the Insight Entity during the detection window.
   * How long it's been since the last Signal fired associated with the Insight fired.

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
1. **Enrichments**. Click this list to view the output of any [Insight Enrichment Server](../integrations/insight-enrichment-server.md) scripts that have enriched the Insight.
1. **Signal timeline**. The timeline shows how spread apart each Signal in the Insight is. You can use the timeline to visualize how long these events are spread over and how frequently the Signals fire. 
1. **Timeline controls**. The arrows on the far left and right sides allow you to toggle between each Signal to show the details on each. You can also click a specific Signal on the timeline to jump to those details. 
1. **Legend**. Key to the symbols used to represent the Signals:

   * Rules—Signals that were triggered by Match or Chain rules.
   * Anomalies—Signals that were triggered by Threshold or Aggregation rules.
   * Threat intelligence—Signals that were fired by Threat Intel rules. (These are Match rules that leverage threat intel matches.)
   * File Analysis—Signals that were triggered by [Yara file analysis rules](../cse-rules/import-yara-rules.md).
1. **Show Related Signals**. Click this link to show Related Signals in addition to Attached Signals. 
1. **Sort options**. You can sort the Signals list by Content Type, Event Time, Created Time, Name, or Severity. Note that you can further sort by ascending or descending value.
1. **Add Signals**. Click this option if you want to add a Signal to the Insight. You’ll be prompted with a list of Signals that have the same Entity as the current Insight (if there are any), and are not already attached to another Insight. A Signal that you add to an Insight manually is considered an Attached Signal.

### Signal list area 

Below the Signal timeline, you’ll see a list of Signals. By default, only attached Signals are displayed.  

![signal-list-area.png](/img/cse/signal-list-area.png)

If you click the **Show Related** checkbox, the page updates and also displays any Related Signals or Related Insights

* A *Related Signal* is a Signal that isn’t part of the current Insight (it’s not attached),  but fired on the same Entity as the current Insight’s attached Signals within 7 days of the current Insight’s attached Signals. 
* A *Related Insight* is an Insight that a Related Signal is attached to.

Here is an example of what a Related Signal and Related Insight look like in the Signal list. Note that, to distinguish between Signals that are attached as opposed to related, an Attached Signal has a blue vertical “ornament” on the left side of the row. A Related Signal does not.

![related-signal.png](/img/cse/related-signal.png)  
 
