---
id: custom-match-list-columns
title: Custom Match List Columns
description: Learn how to define custom columns for use in Match Lists.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page has information about custom match list columns.

## About match lists and target columns

Match lists are lists of important indicators and identifiers that a Cloud SIEM analyst creates. Match lists are typically used to define “allow lists” of items, like IP addresses, URLs, or hostnames that you want to exempt from ordinary rule processing. Many of Cloud SIEM’s built-in rules reference [standard match lists](/docs/cse/match-lists-suppressed-lists/standard-match-lists). Examples of standard match lists include a list of trusted domains, and a list of IP addresses that shouldn’t trigger SSL detection rules.  

You can define your own custom match lists, and reference them in rules that you write yourself. When you create a match list, whether it’s a standard or a custom list, you select a target column, which indicates the record attribute or attributes that should be compared to the match list. The options that appear in the **Target Column** selector list include “Hostname”, “Domain”, “Username”, and so on. Note that these options usually map to multiple record attributes. For example, if you select “Username” as a list’s target column, any occurrences of  username, `fromUser_username`, or `user_username` in incoming records will be compared to the match list. For information about how **Target Column** options in the UI map to Cloud SIEM schema attributes, see [Match Fields Reference](/docs/cse/match-lists-suppressed-lists/match-fields-reference).

If you create a match list for which none of the existing target column options is appropriate, you can create a custom column. 

## View custom columns in the Cloud SIEM UI

To see the custom columns that have been defined in your environment:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Content > Match Lists**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Match List**. You can also click the **Go To...** menu at the top of the screen and select **Match List**.  
1. On the **Match Lists** page, click **Custom Columns**.<br/><img src={useBaseUrl('img/cse/match-lists.png')} alt="Match lists" width="800"/>
1. The **Custom Columns** page lists the custom columns that have been defined in your environment. 

## Create a Custom Column

1. On the **Custom Columns** page, click **Add Custom Column**.
1. The **Add Custom Column** popup appears. <br/><img src={useBaseUrl('img/cse/create-column.png')} alt="Create column" style={{border: '1px solid gray'}} width="400"/>
1. **Name**. Enter a name for the custom column.
1. **Fields**. Click to display a selector list of Cloud SIEM attributes. You can select multiple attributes. If multiple attributes are selected, the match list will match if the list item value matches a record value for any of the custom column attributes. Click **Show Field Guide** to view more information about attributes, such as data type. 
1. Click **Save** to add the new column.

## Edit a custom column

1. On the **Custom Columns** page, click the custom column name or the edit icon in the row for the column.
1. Click **Edit**. 
1. Make your changes on the edit popup.
1. Click **Save** to save the changes.

## Delete a custom column

1. On the **Custom Columns** page, hover your mouse over a custom column in the list.
1. Click the three-dot kebab button on the far right of the item. 
1. Select **Delete**.
1. On the delete confirmation popup, click **Delete**

## Create a match list with a custom column

1. Follow the instructions in [Create a Match List](/docs/cse/match-lists-suppressed-lists/create-match-list/#create-a-match-list).
1. In the **Add Match List** dialog, click **Target Column**. A list of available target column values appears.
1. Select the desired column in the **Custom** section of the selector list.<br/><img src={useBaseUrl('img/cse/target-column-selector.png')} alt="Target column selector" style={{border: '1px solid gray'}} width="400"/>
