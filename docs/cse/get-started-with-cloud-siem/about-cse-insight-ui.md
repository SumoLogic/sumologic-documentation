---
id: about-cse-insight-ui
title: About the CSE Insight UI
sidebar_label: CSE Insight UI
description: Learn about the contents of the Insights UI in CSE.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic describes the CSE UI for working with Insights. 

## Insights list page

To open the **Insights** page, click the icon to the right of the search bar at the top of the CSE UI.

By default, the **Insights** page presents all Insights whose **Status** is not “Closed”, in descending order by Event Time in a list view. If you’d like to see Insights organized by their status, click the **Show Board** icon near the top right corner of the page. For information about the Board view, see [Board view](#board-view).

:::note
CSE displays Insights and the Signals attached to them in the CSE UI through the end of the data retention period defined in your account agreement. 
:::

### List view

This screenshot shows the **Insights** page in List view. 

<img src={useBaseUrl('img/cse/insights-page.png')} alt="Insights page" width="800"/>

Here’s one row from the List view. The numbered definitions below correspond to the labels in the screenshot.

<img src={useBaseUrl('img/cse/insight-summary.png')} alt="Insight summary" width="800"/>

1. **Creation date and time**. When the Insight was created.
1. **Dwell time**. The time between when the first event occurred (when the first Record in the Insight was generated) and when the Insight was generated. 
1. **Age**. The elapsed time since the Insight was created in minutes, hours, and so on.
1. **Insight name**. The Insight name, made up of the Insight ID, and the MITRE stage or stages associated with the Signals in the Insight. 
1. **Global Confidence**. If sufficient data is available, a [Global Confidence score](/docs/cse/records-signals-entities-insights/global-intelligence-security-insights/) for the Insight is shown. 
1. **Assignee**. The analyst assigned to the Incident.
1. **Severity**. The severity of the Insight. The value is a function of the configured Entity Activity Score threshold for Insight generation. For more information, see [Insight Severity](/docs/cse/get-started-with-cloud-siem/insight-generation-process/).
1. **Entity**. The Entity associated with the Insight.
1. **Signal data**. This area has three bits of information:
   * The count of Signals that caused the Insight to be created.
   * The total count of Signals on the Insight Entity during the detection window.
   * How long it's been since the last Signal fired associated with the Insight fired.
1. The visualization plots the Insight's Signals over time (x-axis) by severity (y-axis).

### Board view

This screenshot shows the Insights page with the Signals organized as a Board. Each of the columns corresponds to an Insight Status value. (One of the Status values shown is a [custom Insight Status](/docs/cse/administration/manage-custom-insight-statuses/)).

The information displayed in the Board view is similar to the information in the [List view](#list-view). 

You can switch back the List view by clicking the Show List icon, near the top right corner of the CSE UI.

<img src={useBaseUrl('img/cse/board.png')} alt="Board view" width="800"/>

### Filtering Insights 

You can use the **Filters** area near the top of the page to narrow down the Insights that appear on the Insights page. You can filter by:

* Status
* Assignee
* Severity
* Created
* Event Time
* Severity
* Resolution
* [Custom Resolution](/docs/cse/administration/manage-custom-insight-resolutions/)
* Name
* Tags
* Rule ID
* Entity

## Insight Details page

This section describes the **Insight > Details** page.

### Insight details pane

The left pane of the **Insight > Details** page displays detailed information about the selected Insight. Some of the information that appears is the same as what’s in the row for an Insight on the **Insights** page, and is described in [List view,](#list-view) above. The additional information that appears in the **Details** pane is defined below.

<img src={useBaseUrl('img/cse/insight-details.png')} alt="Insight details" width="300"/>

1. **Actions.** The dropdown lists Insight Actions defined in your environment.
2. **Close Insight.** Use this option to close an Insight. When you click this option, you’re prompted to select an Insight resolution.
3. **Delete Icon.** Use this option to delete an Insight. You’ll be prompted to confirm your choice.
4. **Status.** Current status of the Insight.
5. **Assignee and Assign to me.** Shows the current assignee and allows you to assign yourself the Insight.
6. **Entity.** The Entity the Insight fired on.
7. **Severity.** Severity of the Insight. Mouse over it to see an icon you can click to change the Insight severity.
8. **Global Confidence.** The Global Confidence score for the Insight, if available.
9. **Signal Data.** The number of Signals in the Insight.
10. **Event Time.** The event time for the of the last Signal in the Insight.
11. **Dwell Time.** The time between when the first event occurred (when the first Record in the Insight was generated) and when the Insight was generated.
12. **Insight Created.** When the Insight was created.
13. **Tags and Create a Tag.** Displays any Tags that have already been assigned to the Insight, and a field for adding a tag.
14. **Comments.** Displays any comments that have been made on the Insight, and a field for adding a comment.
15. **Show Comments/History.** The controls allow you to switch between viewing comments, and viewing the Insight history, for example, when a tag was assigned to the Insight.

### Signal visualization area

At the top of the **Insight** > **Details** page, you’ll see a Signal timeline that visualizes the Insight’s attached Signals, which are the Signals that caused the Insight to be created, and any Signals that have been manually added to the Insight.

<img src={useBaseUrl('img/cse/top-bit.png')} alt="Signal visualization" width="800"/>

1. **Signals**. The Signals link allows you to switch back to the Signals view from the Enrichments view, described below. 
2. **Enrichments**. Click this tab to view any enrichments that have been added to the Insight, including the output of the [Insight Enrichment Server](/docs/cse/integrations/insight-enrichment-server/).
3. **Signal timeline**. The timeline shows how spread apart each Signal in the Insight is. You can use the timeline to visualize how long these events are spread over and how often the Signals fire. 
4. **Timeline controls**. The arrows on the far left and right sides allow you to toggle between each Signal to show the details on each. You can also click a specific Signal on the timeline to jump to those details. 
5. **Legend**. Key to the symbols used to represent the Signals:
   * Anomalies—Signals that were triggered by User and Entity Behavior Analytics (UEBA) rules.
   * Threat intelligence—Signals that were fired by Threat Intel rules.
   * File Analysis—Signals that were triggered by [Yara file analysis rules](/docs/cse/rules/import-yara-rules).
   * Rules—Signals that were triggered by other rules.
6. **Show Related Signals**. Click this link to show Related Signals in addition to Attached Signals. 
7. **Sort options**. You can sort the Signals list by Content Type, Event Time, Created Time, Name, or Severity. Note that you can further sort by ascending or descending value.
8. **Add Signals**. Click this option if you want to add a Signal to the Insight. You’ll be prompted with a list of Signals that have the same Entity as the current Insight (if there are any), and are not already attached to another Insight. A Signal that you add to an Insight manually is considered an Attached Signal.

### Signal list area 

Below the Signal timeline, you’ll see a list of Signals. By default, only attached Signals are displayed.  

<img src={useBaseUrl('img/cse/signal-list-area.png')} alt="Signal list area" width="800"/>

If you click the **Show Related** checkbox, the page updates and also displays any Related Signals or Related Insights.

* A *Related Signal* is a Signal that isn’t part of the current Insight (it’s not attached), but fired on the same Entity as the current Insight’s attached Signals within 7 days of the current Insight’s attached Signals. 
* A *Related Insight* is an Insight that a Related Signal is attached to.

Here is an example of what a Related Signal and Related Insight look like in the Signal list. Note that, to distinguish between Signals that are attached as opposed to related, an Attached Signal has a blue vertical “ornament” on the left side of the row. A Related Signal does not.

<img src={useBaseUrl('img/cse/related-signal.png')} alt="Related signal" width="800"/>

### Entities tab

The **Entities** tab displays a list of one or more _Related Entities_. This view helps a security analyst more quickly investigate the Insight to better understand the scope of a security issue that the Insight reveals. Many times, the most interesting Entity (perhaps the malicious actor) in an Insight is one of these related Entities.

An Insight is focused on a primary Entity. For example, the username or IP address that's found in each of the Insight's Signals. Related Entities expand the analyst’s view to include additional Entities that could be relevant to the Insight because they are either listed in the Records that belong to Signals in that Insight or CSE has determined that they are the same Entity as one included in the Insight. For example, CSE has determined that an IP address may have been associated with a specific hostname at the time the relevant Signal was generated.

The **Entities** tab includes two views, the **list** view and the **graph** view. Both views start with the same list of Related Entities. However, the **graph** view can show additional Entity relationships extending "outside" of the Insight. 

#### About the Entities tab list view

The screenshot below shows the **Entities** tab **list** view for an Insight.

<img src={useBaseUrl('img/cse/related-entities.jpg')} alt="Related Entities" width="800"/>

In this view, the primary Entity is always displayed first. (This is the Entity common to each of the Signals in the Insight). Below the primary Entity all of the related Entities are listed.

The related Entities fall into two categories. The category, sometimes referred to as _Involved Entities_, are those Entities that aren't the primary Entity but are listed in one or more Records in the Signal(s) in the Insight. So, for example, while the primary Entity for an insight could be a username, a Record in one of the Signals in that Insight could also include an IP address. That address would be included in this list.

Other Entities could be included due to _Detected Entity Relationships_. For each Entity in the Insight — including the primary Entity and other involved Entities — CSE searches for other Entities that seem to be related (across all Records, not just that Insight's). This search is run across a time range that corresponds to the span of time during which there was activity on the Insight. So, for example, if the first Record in an Insight was created at 8 AM on Wednesday and the last Record at 10 PM on Friday, CSE might detect that the IP address listed in the Insight was associated with a specific hostname (in another record) at that point. 

Involved Entities are connected to the primary Entity with dashed lines. Entities whose relationships are detected are labeled "**May also be**", indented, and connected with solid lines.

:::note
It's possible for a related Entity to both be involved and detected. In that case, it typically be displayed as detected unless it is in a number of the Insight's Signals.
:::

How does CSE detect Entity relationships outside of the Insight? Within the time range of the Insight, described above, CSE searches for related Entities in the following normalized Record fields:

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
[Custom Entities](/docs/cse/records-signals-entities-insights/create-custom-entity-type) that match will also be included in the results.
:::

#### What’s in an Entity card

The card for an Entity displays any [tags](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules) that have been assigned the Entity, along with the following information:

* The number of times that Entity was referenced in the Signals in the Insight.
* The number of Insights, created during the Insight generation [detection window](/docs/cse/records-signals-entities-insights/set-insight-generation-window-threshold), in which the current Entity is the primary Entity.
:::note
The detection window is 14 days by default, but can be configured to be a different duration.
:::
* The number of Signals that fired during the Insight generation detection window, in which the current Entity is the primary Entity, and the sum of the severities for those Signals.
:::note
The cumulative severity value is color coded: cyan for less than 12, orange for 12-23, and red for 24 and above, assuming your Insight generation threshold is 12. If the Insight threshold is set to a value other than the default of 12, the color coding will be adjusted to match. 
:::

#### About the Entities tab graph view

The screenshot below shows the **Entities** tab **graph** view for an Insight.

<img src={useBaseUrl('img/cse/related-entity-graph.jpg')} alt="Related Entities graph" width="800"/>

By default, this view shows the same entities that are displayed on the list view. However, the system will look for additional relationships outside of the Insight during the detection window to aid in deeper investigation.

To switch between the list and graph view, click the chooser in the upper-right corner of the panel **(1)**.

The graph view has several controls **(2)**:

* A **key** that explains how to read the graph
* **Zoom** controls (you can also use your mouse wheel)
* A **screen size** control, which toggles between the center pane view and a full browser window view
* A **reset** control, which resets the view to the original default
* A link to **help**
* A **filter** control, which enables you to view only specific Entity types in the graph
* A **time frame** control, which controls what time frame to use when searching for and viewing relationships outside of the Insight

Each node in the graph represents a single Entity and will include an icon representing the Entity type and the value (name). The primary Entity for this Insight will be larger and centered by default **(3)**. Entities that are related to this Insight will have an Insight icon on their upper-left edge **(4)**. 

When you select an Entity, it will be highlighted in blue **(5)** and the Entity details pane will appear on the right.

As on the list view, the Involved Entities will be connected with dashed lines **(6)** and Entities with detected relationships will be connected with solid lines **(7)**. 

If you hover over an Entity, it and all connections to it will be highlighted in blue **(8)** and if its value is not fully visible by default, the full value will be displayed.

Any Entity with an Indicator will have an additional icon in the upper right **(9)** and if the Indicator is Malicious or Suspicious, the Entity will be highlighted in red or yellow accordingly.

Finally, if CSE has detected additional relationships *outside* of the Insight during the selected time frame, an expand/contract control **(10)** will appear on the Entity. Clicking on that control will reveal (or hide) those additional relationships. 

Watch this micro lesson to learn more about the Entity relationship graph.

<Iframe url="https://www.youtube.com/embed/GTTwjB8y_5k?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

import Iframe from 'react-iframe'; 

#### Entity details in the right pane

When you select an Entity on the page, the right pane displays details about that Entity. The information displayed depends on what type of Entity is selected and can include:

* A Threat indicator (if any)
* A link to the Entity’s details page
* Geographic location
* Suppression Status
* Tags
* [Entity Criticality](/docs/cse/records-signals-entities-insights/entity-criticality), if it is set to something other than the default
* Metadata such as geographic location, Inventory information, the [Network Blocks](/docs/cse/administration/create-use-network-blocks) it falls within, as applicable, and so on.
* A Signal graph if the Entity was the primary Entity in any Signals during the detection window (time/date is the horizontal axis and severity of each Signal is the vertical axis; the icon/color for each point depends on the Signal type)
* Lists of the recent Signals and Insights the Entity has been associated with, and links to each object’s details page.

#### Accessing related Entities using the API

You can access related Entity information using the CSE API. For more information, see [CSE APIs](/docs/cse/administration/cse-apis).

