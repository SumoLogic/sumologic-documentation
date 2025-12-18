---
id: event-extraction-rules
title: Event Extraction Rules
description: Learn how to use Sumi Logic event extraction rules.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

Event Extraction Rules enables you to automatically detect and track key events directly from your log data. With built-in support for common sources and customizable extraction rules, you gain unified visibility into critical changes across your systems.

By extracting, correlating, and enriching events from logs, Event Extraction Rules help reduce noise and accelerate troubleshooting and root cause analysis with minimal manual effort. You can precisely control how events are classified by configuring event type and priority, ensuring that the most impactful events are surfaced and clearly represented within log searches for faster, more informed analysis.

## Create an Event Extraction Rule

You can create an event extraction rule of your own from scratch by following the instructions below.

:::note
You need the `Manage Event Extraction Rules` [role capability](/docs/manage/users-roles/roles/role-capabilities/) to create an event extraction rule.
:::

1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the Event Extraction Rules page, in the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Field Extraction Rules**. You can also click the **Go To...** menu at the top of the screen and select **Event Extraction Rules**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Event Extraction Rules**. 
1. Click the **+ Add Event Extraction Rule** button on the top right of the table.<br/><img src={useBaseUrl('img/manage/event-extraction-rule/event-extraction-rule.png')} alt="event-extraction-rule" style={{border: '1px solid gray'}} width="800"/>
1. Enter the following options in the **Create New Event Extraction Rule** page:<br/><img src={useBaseUrl('img/manage/event-extraction-rule/create-event-extraction-rule.png')} alt="create-event-extraction-rule" style={{border: '1px solid gray'}} width="500"/>
    1. **Log Query**. Enter the log search query to filter the logs.
    1. **Preview**. Click **Preview Log Messages** button to preview the log messages for the query entered,
    1. **Event Configuration**:
        1. **Event Name**. An unique name for the event.
        1. **Event Description (optional)**. An optional text field to provide additional context about the event—such as its purpose, expected behavior, or when it should occur. Helps to understand the significance of the event.
        1. **Event Source**. Specify from where the event originates from. This helps you to categorize and track events across different data sources.
        1. **Event Priority**. You can select Low, Medium, or High depending on the importance of event.
        1. **Event Type**. Defines the category of the event - Deployment, Feature Flag Change, Infrastructure Change, or Configuration Change. This helps you in filtering, grouping, and analyzing events based on their nature.
    1. **Timeline Preview**. This previews how event markers will display in the histogram timeline on the logs page when this rule is active. This marker also displays the event type, source, and priority details. 
    1. **Advanced Settings (optional)**. Use this section if you want to compare values from parsed event fields with fields in incoming log messages. When the selected values match, the system displays a visual marker to highlight the match.
        1. **Event Record Field**. Choose the field from the event record that you want to compare against incoming log data.
        1. **Match Type**. **Exact Match** is selected by default. This option creates a marker when the value in the incoming log exactly matches the value specified in the event record field.
        1. **Log Message Field**. Select the field from the incoming log message that should be compared with the chosen event record field.
    1. **Rule Details**. Enter the rule name and rule description (optional) of your choice that makes you easy to identify the rule.

## Search for User Data Events

Searching the User Data Events is the same as running a normal search against your ingested data. You specify the `_index` metadata field with `sumologic_userdata_events`.

For example, to search for system events:

1. In the Search page, enter the following: `_index=sumologic_userdata_events`.
  :::info
  Make sure to enter the query exactly as shown. Changing any part of the query renders it ineffective.
  :::
1. Choose the time range for the events that you'd like to review.
1. Click **Start** to run the search.

## Edit a rule

To edit the existing event extraction rule, follow the below steps:

1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the Event Extraction Rules page, in the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Field Extraction Rules**. You can also click the **Go To...** menu at the top of the screen and select **Event Extraction Rules**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Event Extraction Rules**.
1. Navigate to the respective event rule which you wish to edit.
1. On the left pane, click **Edit** button.<br/><img src={useBaseUrl('img/manage/event-extraction-rule/edit-event-extraction-rules.png')} alt="edit-event-extraction-rule" style={{border: '1px solid gray'}} width="400"/>
1. In the event extraction rule editing pane, perform the required editing and click **Submit** to save the changes.

## Duplicate a rule

To duplicate the existing event extraction rule, follow the below steps:

1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the Event Extraction Rules page, in the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Field Extraction Rules**. You can also click the **Go To...** menu at the top of the screen and select **Event Extraction Rules**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Event Extraction Rules**.
1. Navigate to the respective event rule which you wish to duplicate.
1. On the left pane, click **Duplicate** button.<br/><img src={useBaseUrl('img/manage/event-extraction-rule/duplicate-event-extraction-rules.png')} alt="duplicate-event-extraction-rule" style={{border: '1px solid gray'}} width="400"/>
1. In the event extraction rule editing pane, perform the required editing and click **Submit** to duplicate the changes.

## Delete a rule

To delete the existing event extraction rule, follow the below steps:

1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the Event Extraction Rules page, in the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Field Extraction Rules**. You can also click the **Go To...** menu at the top of the screen and select **Event Extraction Rules**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Event Extraction Rules**.
1. Navigate to the respective event rule which you wish to edit.
1. On the left pane, click **Delete** button.<br/><img src={useBaseUrl('img/manage/event-extraction-rule/delete-event-extraction-rules.png')} alt="delete-event-extraction-rule" style={{border: '1px solid gray'}} width="400"/>
1. In the **Delete [rule name] item** pop-up, click on **Delete**.<br/><img src={useBaseUrl('img/manage/event-extraction-rule/delete-confirm-event-extraction-rule.png')} alt="delete-confirm-event-extraction-rule" style={{border: '1px solid gray'}} width="400"/>

## Limitations

- You can create a maximum of 50 event extraction rules.
- Make sure your event is not producing more than 1000 results.