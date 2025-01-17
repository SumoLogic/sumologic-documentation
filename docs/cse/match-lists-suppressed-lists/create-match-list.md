---
id: create-match-list
title: Create a Match List
description: Learn about match lists and how to create a match list.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has information about match lists, their purpose and usage, and how to create them. 

## About match lists

Match lists are lists of important indicators and identifiers configured by a Cloud SIEM analyst. Match lists are typically used to define “allow lists” of items, like IP addresses, URLs, and hostnames, and so on, that you want to exempt from ordinary rule processing. For example, you might want to prevent a rule from firing for records that contain one of a certain set of IP addresses. 

Here’s a use case for using a match list to define an allow list:  Vulnerability scanners often set off false alarms in security data, as they intentionally mimic the behavior of an attacker. Given that this behavior is safe and expected, you don’t want scanner activities to fire a rule. That’s what a match list is for. You can create a match list called “vuln_scanners” that contains the IP addresses of your scanners.

:::tip
There’s no reason you can’t use a match list to define “deny lists” of items. However, Cloud SIEM’s threat intel feature is designed for exactly that purpose. Most of the time, but not always, you should use threat intel lists for negative indicators. For more information, see [Match lists or threat intel: which to use?](#match-listor-threat-intel-which-to-use).
:::

Here are some match lists in the Cloud SIEM UI.  

<img src={useBaseUrl('img/cse/example-match-list.png')} alt="Example match list" style={{border: '1px solid gray'}} width="800"/>

Note that each match list has a **Target Column**, which you define when you create the list. The Target Column indicates what type of record fields should be compared to the match list, for example, hostnames, URLs, domains, IP addresses, usernames, and so on. For more information, see [How are match lists Used?](#how-are-match-lists-used)

## Built-in rules refer to standard match list names

Many of Cloud SIEM’s built-in rules assume the existence of one or more standard match lists. A standard match list is a list that you need to create and populate so that Cloud SIEM can leverage it. Cloud SIEM rules take advantage of about 20 standard match lists. One example of a standard Match list is the “vuln_scanners” list mentioned in the previous section. There are analogous match lists for other entity types, such as “business_ips”, “verified_domains”, and so on.

When you create the standard match lists, it’s important to create them correctly: you need to use the exact name Cloud SIEM has defined for the list, and you must specify the correct Target Column. You can find that information in the [Standard Match Lists](/docs/cse/match-lists-suppressed-lists/standard-match-lists/#standard-match-lists) topic, which also lists the built-in rules that refer to match list data.

If you don’t define one or more standard match lists, the rules that refer to the match list data will still function, but you’ll miss out on the benefit that match lists provide—a rule will have no way of knowing that a particular IP address, domain, or other entity in a message should not cause it to fire.

As necessary, you can also create custom match lists.

## How are match lists used?

When Cloud SIEM processes an incoming message, it compares the entries in each match list that you’ve created to message fields that are of the same type as the Target Column of the match list. For example, given a match list whose Target Column is `Domain`,  Cloud SIEM will compare items on that list only to message fields that contain domains.

When a record contains a value that exactly matches one or more match lists (partial matches are not supported), two fields in the record get populated:

* `listMatches`. Cloud SIEM adds the names of the match lists that the record matched, and the column values of those lists. For example, if an IP address in a record matches the `SourceIP` address in the “vuln_scanners” match list, the `listMatches` field would look like this: `listMatches: ['vuln_scanners', 'column:SourceIp']`

* `matchedItems`. Cloud SIEM adds the actual key-value pairs that were matched. For example, continuing the example above, if “vuln_scanners” match list contained an entry “5.6.7.8”, and the record’s `SourceIp` is also “5.6.7.8”, and assuming the SourceIP address in the “vuln_scanners” match list, the `matchedItems `field would like like this: `matchedItems: [ { value: '5.6.7.8', …other metadata about list item } ]`

Because the information about list matches gets persisted within records, you can reference it downstream in both rules and search.   

In a rule, you look for matches by extending  a rule expression with an `array_contains` function, for example:

`... AND NOT array_contains(listMatches, "vuln_scanners")`  
 
If any of the IP addresses within the record match one of the “vuln_scanner” IPs, the `listMatches` field will have a value of `['vuln_scanners']`. Thus, the check above will effectively prevent signals from firing for those rules on the scanner IP addresses.

For more information about referring to match list data in rules, see [Match lists](/docs/cse/rules/about-cse-rules#match-lists) in the *About Cloud SIEM Rules* topic.

## Match list or threat intel: which to use?

Cloud SIEM has another feature that is similar to match lists: threat intel. Like match lists, threat intel lists are lists of indicators and identifiers configured by a Cloud SIEM analyst. When deciding whether to put an indicator on a match list or a threat intel list, consider the following.

Threat intel lists are intended specifically for negative identifiers that should definitely fire a signal. So, whenever a rule detects a record field that matches an item on a threat intel list, it *always* results in a signal. If that’s what you want to occur when a particular identifier is encountered in a record, you should put that identifier on an threat intel list. But, if you *don’t* want a match to invariably result in a signal, the item should be on a match list. For example, you might use a match list for negative indicators that should fire a signal only if a secondary condition is also met.

Another difference between match lists and threat intel lists is the **Target Column** types they support. For instance, you can’t create a threat intel list that contains email addresses. So, although typically a threat intel list is what you’d use for suspicious indicators, in some cases, a match list is the answer.

## Match list limitations

A match list can contain up to 100,000 items.

## Matching behavior

When comparing a field value to items on a match list, Cloud SIEM generally requires an exact match (case insensitive). There are two exceptions to that rule.

*  Match lists that contain IP addresses can list either explicit IP addresses, CIDR blocks of IP addresses, (for example `1.2.3.4/24`), or both.
* Match lists that contain domains can list, either complete internet domains or partial domain. Partial domains will match all the matching subdomains. For example, `google.com` in a list will match `mail.google.com` in a record. Note that the converse is not the case: `mail.google.com` in a list won’t match `google.com`.

## Create a match list

Perform the steps below to create a match list in Cloud SIEM.

:::tip
You can also create and manage match lists with Cloud SIEM's REST [API](/docs/cse/administration/cse-apis).
:::

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Content > Match Lists**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Match List**. You can also click the **Go To...** menu at the top of the screen and select **Match List**. 
1. Click **Add Match List**.
1. On the **Add Match List** popup, enter the following:
    1. **Name**. Name of the Match list. If you are creating a standard match list, make sure the name matches the standard match list name. For more information, see [Standard match lists](/docs/cse/match-lists-suppressed-lists/standard-match-lists#standard-match-lists).   We recommend no embedded spaces in list names. For example, instead of *my list*, use *my_list*.
    1. **Description**. Enter a description for the list. Descriptions for standard match lists can be found in [Standard match lists](/docs/cse/match-lists-suppressed-lists/standard-match-lists#standard-match-lists).
    1. **Target Column**. The type of message field to which items on the list should be compared. The **Target Column** for standard match lists can be found in [Standard match lists](/docs/cse/match-lists-suppressed-lists/standard-match-lists#standard-match-lists). <br/>
        :::note
        Once you create a match list, it's not possible to change its **Target Column**.
        :::
    1. **Time to Live (hours)**. (Optional) Enter the number of hours after which the entries on the list should expire.
    1. Click **Save**.<br/><img src={useBaseUrl('img/cse/new-match-list.png')} alt="New match list" style={{border: '1px solid gray'}} width="400"/>
1. The match list now appears on the **Match Lists** page.
1. Click the name of the match list to open it.
1. On the **Match Lists > Details** page, click **Add Match List Item**.
1. On the **Add Match List Item** popup, enter:
   * **Value**. The value of the entity. Make sure the value you enter is of the same type as the type you selected as the Target Column for the list. For example, if the Target Column is `Domain`, enter a domain.
   * **Description**. (Optional) Enter a description of the entity instance you entered.
   * **Expiration**. (Optional) The date and time at which the list item should be removed from the list.
   * Click **Save** to add the item to the list.
1. The item now appears in the match list.

## Import a match list

You can import list items by uploading a .csv file. This is convenient when you want to add many items to a list. 

### Create a .csv file

Create a .csv file. You can import up to three fields for an item.

* **value** (Required). The value of the list item. The item you supply should be of the same type as the **Target Column** defined for the match list. For example, if the **Target Column** is `IP Address`, supply an IP address. The maximum length for the value field is 2000 characters.
* **description** (Optional). A description of the list item.
* **expires** (Optional). Expiration date and time for the list item, in ISO 8601 format, for example: 2020-08-17 01:18:00 

Follow these guidelines when you create the .csv file:

* Use the first line of the file to identify the fields, and then add a line for each list item with the fields in the same order as the field names in the header. (Fields can be in any order, but the fields for each item must be in the same order as the field in the header.)
* If a field contains a comma, enclose it in double quotes (“).  
* Save the file with a .csv extension.

Here is an example of a file in which all fields are supplied:

```
value,description,expires
10.99.19.9,test-desc,2020-08-17 01:18:00
```

Here is an example of a file in which only the required field, value, is
specified:

```
value
10.99.19.9
```

## Best practices for using match lists

Sumo Logic recommends the following conventions and best practices for using match lists.

### Use match lists

Use the match list feature early on to get the most value from Cloud SIEM. This feature allows you to prevent rules from firing as a result of devices and activity in your environment that you know are benign. This optimizes the detection process by reducing noise in results, and helps reduce alert overload and analysis fatigue.

Match lists are not your only option for creating allowlists or denylists. For entities, use [schema key tags](/docs/cse/match-lists-suppressed-lists/standard-match-lists) rather than match lists. And to suppress signals altogether, use [suppressed lists](/docs/cse/match-lists-suppressed-lists/suppressed-lists).

### Choose appropriate Target Column

When creating a custom match list, consider directionality when you select the Target Column. In most cases, match lists work fine with a directionless column type, like IP Address. However, in some cases, a match list is best configured with a directional column type, such as Source IP Address or Destination IP Address. In some cases it works best to create multiple match lists with the same items in each, but different Target Columns. For example, you can have the same IP addresses in three match list: one whose target column is IP Address, one with Source IP Address, and one with Destination IP Address.   

### Get the TTL right

Select a default TTL for match lists that make sense. For example, a match list of resources like authentication servers or vulnerability scanners should be fairly static and typically never have items expire. On the other hand, match list of Tor node addresses is dynamic—a TTL is definitely appropriate.

### General purpose match lists are good

When creating custom match lists, we recommend a general purpose approach to naming and populating them so that they’re broadly applicable across your infrastructure.

It’s better to have one generic match list for similar resource types than multiple vendor-specific lists. For example, creating the “vuln_scanners” list is better than having one for each type you have, like “Qualys Scanners”, “Tenable Vulnerability Scanners”, and so on.   
