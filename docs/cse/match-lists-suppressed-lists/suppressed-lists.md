---
id: suppressed-lists
title: Suppressed Lists
description: Suppressed Lists allow you to suppress Signals that contain a particular indicator value in any of the Signals’ Records.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has information about Suppressed Lists and how to create them.

## About Suppressed Lists

CSE supports several types of [Signal suppression](/docs/cse/records-signals-entities-insights/about-signal-suppression): suppression of redundant Signals, suppression of Signals on particular Entities, suppression of Signals on blocks of IP addresses, and finally the Suppressed Lists feature, which enables you to suppress Signals that contain a particular indicator value in any of the Signals’ Records.  

You can create Suppressed Lists from the CSE UI or using the CSE API. A Suppressed List can contain a set of indicators—IPs, hostnames, or any other type that you can use in a Match List—and then any Signal that has a Record containing a listed indicator will be suppressed. 

Here is an example of a Suppressed List.

<img src={useBaseUrl('img/cse/suppressed-list.png')} alt="Suppressed list" width="800"/>

Note that the list has a Target Column, which you define when you create the list. The Target Column indicates what type of Record fields should be compared to the Suppressed List, for example, hostnames, URLs, domains, IP addresses, usernames, and so on. For more information, see [How are Suppressed Lists used](#how-are-suppressed-lists-used).

When you create a Suppressed List, you can choose one of the following as its Target Column.

* Hostname
* File Hash
* URL
* Domain
* Username
* IP Address
* IP ASN
* IP ISP
* IP Organization
* Source IP Address
* Source IP ASN
* Source IP ISP
* Source IP Organization
* Destination IP Address
* Destination IP ASN
* Destination IP ISP
* Destination IP Organization

## Suppressed List or Match List?

When deciding whether to put an indicator on a Suppressed List or a Match List, consider the following.

Suppressed Lists are intended for situations in which you want to suppress *any* Signal with a Record that contains a suppressed indicator. You don’t need to reference a suppressed list in a rule expression for suppression to occur. 

Match Lists are for when you want to use the existence or absence of an indicator to determine whether a specific rule or set of rules should fire a Signal. So, a Match List only has an effect when referenced by a rule expression.

## How are Suppressed Lists used? 

CSE uses Suppressed Lists the same way it uses [Match Lists](#suppressed-list-or-match-list). When CSE processes an incoming Record, it compares the entries in each Suppressed List to Record fields of the same type as the Target Column of the Suppressed List. For example, given a Suppressed List whose Target Column is **Domain**, CSE will compare items on that list only to Record fields that contain domains.

When a Record contains a value that matches one or more Suppressed Lists, two fields in the Record get populated:

* `listMatches`. CSE adds the names of the Suppressed Lists that the Record matched, and the column values of those lists. For example, if an IP address in a Record matches the SourceIP address in the “vuln_scanners” Suppressed List, the `listMatches` field would look like this: `listMatches: ['vuln_scanners', 'column:SourceIp']`    
* `matchedItems`. CSE adds the actual key-value pairs that were matched. For example, continuing the example above, if “vuln_scanners” Match List contained an entry “5.6.7.8”, and the Record’s SourceIp is also “5.6.7.8”, the assuming the SourceIP address in the “vuln_scanners” Suppressed List, the `matchedItems` field would look like this: `matchedItems: [ { value: '5.6.7.8', …other metadata about list item } ]`

Because the information about list matches gets persisted within Records, you can reference it downstream in both rules and search. 

In a rule, you look for matches by extending  a rule expression with an `array_contains` function, for example:

`... AND NOT array_contains(listMatches, "vuln_scanners")`

If the name of the list you are referencing with `array_contains` contains any spaces, replace the spaces with underscores. For example, if the list name is *my list*, refer to it as *my_list*.

If any of the IP addresses within the Record match one of the “vuln_scanner” IPs, the `listMatches` field will have a value of \['vuln_scanners'\]. Thus, the check above will effectively prevent Signals from firing for those rules on the scanner IP addresses.

For more information about referring to Suppressed List data in rules, see [Match Lists](/docs/cse/match-lists-suppressed-lists) in the *About CSE Rules* topic.


## Suppressed List limitations 

A Suppressed List can contain up to 50,000 items.

## Create a Suppressed List from the UI

Perform the steps below to create a Suppressed List and add an indicator to it using the CSE UI.

1. Choose **Suppressed Lists** from the Content menu and click **Create**. <br/><img src={useBaseUrl('img/cse/suppressed-lists.png')} alt="Create a suppressed list" width="800"/>
1. On the **New Suppressed List** popup, enter the following:
   1. **Name**. Name of the Suppressed List.
   1. **Description**. Enter a description for the list. 
   1. **Time to Live (hours)**. (Optional) Enter the number of hours after which the entries on the list should expire.
   1. **Target Column**. The type of Record field to which items on the list should be compared.
    :::note
    If you want to create a custom Target Column, click **Manage Custom Columns**. For more information, see [Custom Match List Columns](/docs/cse/match-lists-suppressed-lists/custom-match-list-columns).
    :::
   1. Click **Create**.
1. The Suppressed List now appears on the **Suppressed Lists** page.  <br/><img src={useBaseUrl('img/cse/suppressed-list-page-2.png')} alt="Suppressed lists page" width="800"/>
1. Click the name of the Suppressed List to open it.
1. On the **Suppressed List > Details** page, click **ADD LIST ITEM**. <br/><img src={useBaseUrl('img/cse/add-list-item.png')} alt="Add list item" width="800"/>
1. On the **New Suppressed List Item** popup, enter:
   1. **Value**. The value of the entity. Make sure the value you enter is of the same type as the type you selected as the Target Column for the list. For example, if the Target Column is Domain, enter a domain.
   1. **Description**. (Optional) Enter a description of the list item.
   1. **Expiration**. (Optional) The date and time at which the list item should be removed from the list.
   1. Click **Add** to add the item to the list. <br/><img src={useBaseUrl('img/cse/new-item.png')} alt="New item" width="400"/>
1. The item now appears on the list.

## Import a list of indicators 

You can import list items by uploading a .csv file. This is convenient when you want to add many items to a list. 

### Create a CSV file 

Create a .csv file. You can import up to three fields for an item.

* **value** (Required). The value of the list item. The item you supply should be of the same type as the Target Column defined for the Suppressed List. For example, if the Target Column is IP Address, supply an IP address.
* **description** (Optional). A description of the list item.
* **expires** (Optional). Expiration date and time for the list item, in ISO 8601 format, for example: *2020-08-17 01:18:00 *

### CSV file guidelines

Follow these guidelines when you create the .csv file:

* Use the first line of the file to identify the fields, and then add a line for each list item with the fields in the same order as the field names in the header. (Fields can be in any order, but the fields for each item must be in the same order as the field in the header.)
* If a field contains a comma, enclose it in double quotes (“).  
* Save the file with a .csv extension.

Here is an example of a file in which all fields are supplied:

`value,description,expires 10.99.19.9,test-desc,2020-08-17 01:18:00`

Here is an example of a file in which only the required field, value, is
specified:

`value 10.99.19.9`

### Upload file 

1. On the **Suppressed Lists** page, click the name of the list.
1. Click **Import Indicators**.
1. On the import popup:
   1. Drag your file onto the import popup, or click to navigate to the file, and then click Import.
   1. Optionally, you can enter an expiration for the indicators on the list. If you do, it will override any expirations that are defined in the file. Enter the expiration in any ISO date format. For example: `2022-12-31`

## Manage Suppressed Lists with the CSE API

You can use CSE APIs to create and manage Suppressed Lists. For information about CSE APIs and how to access the API documentation, see [CSE APIs](/docs/cse/administration/cse-apis).

## Best Practices for using Suppressed Lists

When creating a custom Suppressed List, consider directionality selecting the Target Column. In most cases, Suppressed Lists work fine with a directionless column type, like IP Address. However, in some cases, a Suppressed List is best configured with a directional column type, such as Source IP Address or Destination IP Address. In some cases it works best to create multiple Suppressed Lists with the same items in each, but different Target Columns. For example, you can have the same IP addresses in three Suppressed List: one whose target column is IP Address, one with Source IP Address, and one with Destination IP Address.   
