---
id: custom-match-list-columns
title: Custom Match List Columns
description: Learn how to define custom columns for use in Match Lists.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page has information about custom Match List columns 

## About Match Lists and Target Columns

Match Lists are lists of important indicators and identifiers that a CSE analyst creates. Match Lists are typically used to define “allow lists” of items, like IP addresses, URLs, or hostnames that you want to exempt from ordinary rule processing. Many of CSE’s built-in rules reference [standard Match Lists](/docs/cse/match-lists-suppressed-lists/standard-match-lists). Examples of standard Match Lists include a list of trusted domains, and a list of IP addresses that shouldn’t trigger SSL detection rules.  

You can define your own custom Match Lists, and reference them in rules that you write yourself. When you create a Match List, whether it’s a standard or a custom list, you select a Target Column, which indicates the Record attribute or attributes that should be compared to the Match List. The options that appear in the **Target Column** selector list include “Hostname”, “Domain”, “Username”, and so on. Note that these options usually map to multiple Record attributes. For example, if you select “Username” as a list’s Target Column, any occurrences of  username, `fromUser_username`, or `user_username` in incoming Records will be compared to the Match List. For information about how **Target Column** options in the UI map to CSE schema attributes, see [Match Fields Reference](/docs/cse/match-lists-suppressed-lists/match-fields-reference).

If you create a Match List for which none of the existing Target Column options is appropriate, you can create a custom column. 

## View custom columns in the CSE UI

To see the custom columns that have been defined in your environment:

1. Select **Match Lists** from the **Content** menu. <br/><img src={useBaseUrl('img/cse/select-match-lists-page.png')} alt="Select match lists" width="800"/>
1. On the **Match Lists** page, click **Custom Columns**.<br/><img src={useBaseUrl('img/cse/match-lists.png')} alt="Match lists" width="800"/>
1. The **Custom Columns** page lists the custom columns that have been defined in your environment. <br/><img src={useBaseUrl('img/cse/custom-columns.png')} alt="Custom columns" width="800"/>

## Create a Custom Column

1. On the **Custom Columns** page, click **Create**.
1. The **Create Match List Column** popup appears. <br/><img src={useBaseUrl('img/cse/create-column.png')} alt="Create column" width="400"/>
1. **Name**. Enter a name for the custom column.
1. **Fields**. Click the chevron icon to display a selector list of CSE attributes. You can select multiple attributes. If multiple attributes are selected, the match list will match if the list item value matches a Record value for any of the custom column attributes. Click the icon next to Show field guide to view more information, such as data type, about attributes. 
1. Click **Create** to add the new column.

## Edit a custom column

1. On the **Custom Columns** page, click the custom column name or the edit icon in the row for the column.
1. Make your changes on the **Edit Match List Column** popup.
1. Click **Update** to save the changes.

## Delete a custom column

1. On the **Custom Columns** page, click the trash can icon in the row for the column you want to delete.
1. On the **Delete column** popup, click confirmation popup **Yes, Delete Column**.

## Create a Match List with a custom column

Follow the instructions in the [Create a Match List](/docs/cse/match-lists-suppressed-lists/create-match-list), and select the desired column in the **Custom** section of the **Target Column** selector list.

<img src={useBaseUrl('img/cse//target-column-selector.png')} alt="Target column selector" width="400"/>
