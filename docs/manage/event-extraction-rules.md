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

Event Extraction Rules enables you to automatically extract, correlate, and enrich events directly from log data, making them available for event querying and analysis. By reducing noise and highlighting meaningful events, this capability accelerates troubleshooting and root cause analysis with minimal manual effort. You can precisely control how events are classified by configuring event type and priority, ensuring that the most impactful events are surfaced and clearly represented within log searches for faster, more informed insights.

## Create an Event Extraction Rule

You can create an event extraction rule of your own from scratch by following the instructions below.

:::note
You need the `Manage Event Extraction Rules` [role capability](/docs/manage/users-roles/roles/role-capabilities/) to create an event extraction rule.
:::

1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the Event Extraction Rules page, in the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Event Extraction Rules**. You can also click the **Go To...** menu at the top of the screen and select **Event Extraction Rules**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Event Extraction Rules**. 
1. Click the **+ Add Event Extraction Rule** button on the top right of the table.<br/><img src={useBaseUrl('img/manage/event-extraction-rule/event-extraction-rule.png')} alt="event-extraction-rule" style={{border: '1px solid gray'}} width="800"/>
1. Enter the following options in the **Create New Event Extraction Rule** page:<br/><img src={useBaseUrl('img/manage/event-extraction-rule/create-event-extraction-rule.png')} alt="create-event-extraction-rule" style={{border: '1px solid gray'}} width="500"/>
    1. **Log Query**. Enter the log search query for the event to filter the logs. 
        :::note
          - To optimize query performance, limit log volume, parse and extract only the necessary fields, and use the `fields` operator in [denylist mode](/docs/search/search-query-language/search-operators/fields/#denylist) to exclude unnecessary fields and return only what’s required for event correlation and visualization.".
          - This log query applies the same validation rules as those used for [Scheduled Views](/docs/manage/scheduled-views).
          - By default, this log query runs using the **Message Time** timestamp with a 15-minute time range in **Manual** parse mode.
        :::
    1. **Preview**. Click the **Preview Log Messages** button to preview the log messages for the query entered,
    1. **Event Configuration**:
        1. **Event Name**. A unique name for the event.
        1. **Event Description (optional)**. An optional text field to provide additional context about the event—such as its purpose, expected behavior, or when it should occur. Helps to understand the significance of the event.
        1. **Event Source**. Specify where the event originates from. This helps you to categorize and track events across different data sources.
        1. **Event Priority**. You can select Low, Medium, or High depending on the importance of the event.
        1. **Event Type**. Defines the category of the event - Deployment, Feature Flag Change, Infrastructure Change, or Configuration Change. This helps you in filtering, grouping, and analyzing events based on their nature.
    1. **Timeline Preview**. This previews how event markers will display in the histogram timeline on the logs page when this rule is active. This marker also displays the event type, source, and priority details. 
    1. **Advanced Settings (optional)**. Use this section if you want to compare values from parsed event fields with fields in incoming log messages. When the selected values match, the system displays a visual marker to highlight the match.
        :::note
          Use **Advanced Settings** if you need precise or strict match requirements. If not configured, Sumo Logic system makes best-effort to identify related events.
        :::
        1. **Event Record Field**. Choose the field from the event record that you want to compare against incoming log data. Only extracted fields in query can be used for `eventFieldName` in correlation expression.
        1. **Match Type**. **Exact Match** is selected by default. This option creates a marker when the value in the incoming log exactly matches the value specified in the event record field.
        1. **Log Message Field**. Select the field from the incoming log message that should be compared with the chosen event record field.
    1. **Rule Details**. Enter the rule name and rule description (optional) of your choice that makes it easy to identify the rule.

:::info
When an Event Extraction Rule is created, events only from previous seven days are automatically backfilled into the event index.
:::

## Search for user data events

Searching the user data events is the same as running a normal search against your ingested data. You specify the `_index` metadata field with `sumologic_userdata_events`.

For example, to search for system events:

1. In the Search page, enter the following: `_index=sumologic_userdata_events`.
     :::info
     Make sure to enter the query exactly as shown. Changing any part of the query renders it ineffective.
     :::
1. Choose the time range for the events that you'd like to review.
1. Click **Start** to run the search.

:::note
You can identify the source of event using `eventExtractionRuleID` field in the **sumologic_userdata_events** index.
:::

## Edit a rule

To edit the existing event extraction rule, follow the below steps:

1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the Event Extraction Rules page, in the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Event Extraction Rules**. You can also click the **Go To...** menu at the top of the screen and select **Event Extraction Rules**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Event Extraction Rules**.
1. Navigate to the respective event rule which you wish to edit.
1. On the left pane, click **Edit** button.<br/><img src={useBaseUrl('img/manage/event-extraction-rule/edit-event-extraction-rules.png')} alt="edit-event-extraction-rule" style={{border: '1px solid gray'}} width="400"/>
1. In the event extraction rule editing pane, perform the required editing and click **Submit** to save the changes.

## Duplicate a rule

To duplicate the existing event extraction rule, follow the below steps:

1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the Event Extraction Rules page, in the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Event Extraction Rules**. You can also click the **Go To...** menu at the top of the screen and select **Event Extraction Rules**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Event Extraction Rules**.
1. Navigate to the respective event rule which you wish to duplicate.
1. On the left pane, click **Duplicate** button.<br/><img src={useBaseUrl('img/manage/event-extraction-rule/duplicate-event-extraction-rules.png')} alt="duplicate-event-extraction-rule" style={{border: '1px solid gray'}} width="400"/>
1. In the event extraction rule editing pane, perform the required editing and click **Submit** to duplicate the changes.

## Delete a rule

To delete the existing event extraction rule, follow the below steps:

1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the Event Extraction Rules page, in the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Event Extraction Rules**. You can also click the **Go To...** menu at the top of the screen and select **Event Extraction Rules**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Event Extraction Rules**.
1. Navigate to the respective event rule which you wish to edit.
1. On the left pane, click **Delete** button.<br/><img src={useBaseUrl('img/manage/event-extraction-rule/delete-event-extraction-rules.png')} alt="delete-event-extraction-rule" style={{border: '1px solid gray'}} width="400"/>
1. In the **Delete [rule name] item** pop-up, click on **Delete**.<br/><img src={useBaseUrl('img/manage/event-extraction-rule/delete-confirm-event-extraction-rule.png')} alt="delete-confirm-event-extraction-rule" style={{border: '1px solid gray'}} width="400"/>

## Limitations

- You can create a maximum of 50 event extraction rules.
- For any query, a maximum of five event markers will be displayed in the histogram, regardless of the selected time range.

## Operational considerations

- To restrict user access to extracted events, you can deny access to the `sumologic_userdata_events` index for specific roles. Ensure that you have the **[Usage Management](/docs/manage/users-roles/roles/role-capabilities/#user-management)** capability enabled, as it is required to configure index-level access restrictions.
- An Event Extraction Rule can generate a maximum of 1,000 events per hour. If this limit is exceeded, the rule may be automatically disabled and a system event will be generated. You can view those by querying the `_index=sumologic_system_events` and `_sourcecategory=eventExtractionRule`. To re-enable the rule, review and refine the rule query to reduce the event volume.
- Audit logs for all create, read, update, and delete (CRUD) actions performed on Event Extraction Rules are available in the `_index=sumologic_audit_events ` and `_sourcecategory=eventExtractionRule`.

