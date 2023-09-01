---
id: before-writing-custom-rule
title: Before You Write a Custom Rule
sidebar_label: Before You Write a Custom Rule
description: Learn how to plan a custom rule and prototype rule expressions in the Sumo Logic platform.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has information about writing custom CSE rules.

:::tip
Before you create a custom rule, check to see if there is a [built-in rule](/docs/cse/rules/cse-built-in-rules) that meets or comes close to meeting your need. You can easily tailor built-in rules using [rule tuning expressions](/docs/cse/rules/rule-tuning-expressions).
:::

By tuning and using a built-in rule, you avoid the effort of writing a rule, and get the benefit of on-going improvements when we update core rule logic. Added bonus: Signals and Insights from built-in rules leverage crowd-sourced machine learning that custom rules can't.

## Related topics

The following topics provide information that’s relevant to the process of writing a custom rule:

* [Record Processing Pipeline](/docs/cse/schema/record-processing-pipeline). This topic describes how CSE creates Records for incoming messages. It provides facts about how message fields are mapped to CSE schema attributes; about the attributes CSE adds to Records to enrich and provide context about IP address, URLs, and domains; “list” features, like Match Lists and Suppress Lists that allow you to include or exclude Records based on indentiers found in Records; how to leverage threat intel data and more.
* [Schema Attributes](/docs/cse/schema/schema-attributes). This topic defines the Record attributes you can reference in rules.
* [CSE Rules Syntax](/docs/cse/rules/cse-rules-syntax). This topic describes rules language functions and syntax, which you’ll use in writing rule expressions.
* [Searching for CSE Records in Sumo Logic](/docs/cse/records-signals-entities-insights/search-cse-records-in-sumo). This topic explains how to search CSE Records in the Sumo Logic platform. Typically, you’ll build and refine your rule expressions in Sumo Logic. Once you’re happy with the results, you’ll copy the query into the rule expression field in the Rules Editor.

## Step 1: Perform use case analysis and select rule type

The first step is determining your use case. In part, this involves deciding what behavior you want the rule to detect, and which of your data sources will provide evidence of that behavior. 

In addition to what you're looking for, and where you can find it, you’ll decide on what sort of logic to apply when the rule encounters the target behavior. For example, is detecting one Record that matches your rule expression sufficient to fire a Signal, or should multiple matching Records be a condition for firing? Perhaps you need to look for multiple different types of events related by a common entity. The answers to these questions will determine what type of rule is appropriate for your use case. 

Review the standard [rule types](/docs/cse/rules/about-cse-rules#rule-types) to determine if any of them can address your use case. 

## Step 2: Review the log mapping for your source

Before you write a rule, you’ll want to verify what attributes are available in the Records created from the target data source. You can do this by reviewing the log mapping for the data source.  

Let’s say you’re going to write a rule that fires every time a successful Windows login occurs from a user account that doesn’t match your standard account naming convention. You know, maybe because you’ve checked Microsoft documentation, that the Windows event that records successful logins is Security Log Event ID 4624. So, you’ll take a look at the CSE log mapping for that event, assuming there is one.

To find and review a log mapping:

1. Click the gear icon and select **Log Mappings**.
1. You can use the filter area at the top of the **Log Mappings** page to search for a mapping by various options. The screenshot below shows the results when we enter the filter **Name matches wildcard pattern *46...**. Two mappings match. For each mapping, you can see how many times it’s been used in the last 24 hrs and also over the last 7 days. We’ll select the one that has been in use, rather than the one that hasn’t.
<br/><img src={useBaseUrl('img/cse/matching-mappings.png')} alt="Mapping mappings" width="800"/>
1. Once you’ve opened the mapping, you’ll see the top of the page shows the Vendor, Product, and Event ID that is written to the Records produced by the mapping. <br/><img src={useBaseUrl('img/cse/selected-mapping-top.png')} alt="Selected mapping" width="500"/>
1. The **Fields** section of the page shows how raw message fields are mapped to CSE schema attributes. In this mapping, `EventData.LogonProcessName` is mapped to `application`, `EventData.WorkstationName` is mapped to `device_hostname`, and so on. 
<br/><img src={useBaseUrl('img/cse/selected-mapping-bottom.png')} alt="Selected mapping bottom" width="500"/>

Now that we understand the mapping in CSE, we can see we will want to be looking for logs where the `metadata_vendor` is “Microsoft”, `metadata_product` is “Windows”, and `metadata_deviceEventId` is “Security-4624”, and we will also want to use the `user_username` field to find users that don’t match our naming convention.

## Step 3: Create the query in Sumo Logic

In this step, we’ll create the query that will serve as the rule expression when we create the rule.

Using the attributes we discovered from looking at the log mapping, we’ll run the following query, which returns the usernames that have successfully logged on over the last week, counted by `user_username`.

```sql
_index=sec_record_*
| where metadata_vendor = "Microsoft" and metadata_product = "Windows" and metadata_deviceEventId = "Security-4624"
| count by user_username
```

<img src={useBaseUrl('img/cse/count-by-user.png')} alt="Count by user" width="800"/>

The results show two of our standard username patterns: 

* The username for regular user accounts are a plain string, with no special characters, like specops and jask.
* Machine usernames are a string, followed by a dash character, followed by a string, followed by a dollar sign, like `win10-admin$` and `win10-client$`.

Now, we can refine our search to return usernames that do not comply with either of our standard patterns.

```sql
_index=sec_record_*
| where metadata_vendor = "Microsoft" and metadata_product = "Windows" and metadata_deviceEventId = "Security-4624" and !(user_username matches /^[a-zA-Z]*$/ or user_username matches "*-*$")
| count by user_username
```

<img src={useBaseUrl('img/cse/non-matching-patterns.png')} alt="Non-matching patterns" width="800"/>

Usernames returned include “anonymous logon”. A little [research](https://social.technet.microsoft.com/Forums/ie/en-US/dbcbb9f1-c6a7-43ea-94b8-ba72a89e2221/nt-authorityanonymous-logon?forum=winservergen) indicates that this is typically no cause for alarm, so we’ll refine our search again to exclude “anonymous logon”.

```sql
_index=sec_record_*
| where metadata_vendor = "Microsoft" and metadata_product = "Windows" and metadata_deviceEventId = "Security-4624" and !(user_username matches /^[a-zA-Z]*$/ or user_username matches "*-*$") and user_username != "anonymous logon"
```

Now that we’ve sorted out the usernames formats and values we want to exclude, we’ve removed \| count by `user_username` from the query.

Let’s say there is a field of interest in our raw messages—`EventData.ProcessName`—that isn’t mapped to a CSE schema attribute. We want to parse that field out of the message so we can use it in our logic as well. We only want our rule to fire if a user with an anomalous logon ran an .exe process after successfully logging in. You can see all of the fields in the raw message in the **Messages** tab of your search results.

<img src={useBaseUrl('img/cse/messages-tab.png')} alt="Messages tab" width="800"/>

We update the query to parse out `EventData.ProcessName`, naming it `process_name`, and filtering to only fire on `.exe` files. 

```sql
_index=sec_record_*
| json field=_raw "$['EventData.ProcessName']" as process_name
| where metadata_vendor = "Microsoft" and metadata_product = "Windows" and metadata_deviceEventId = "Security-4624" and !(user_username matches /^[a-zA-Z]*$/ or user_username matches "*-*$") and user_username != "anonymous logon" and process_name matches "*.exe"
```

Now we have a query we can use as the rule expression for our rule. Note that when you paste it into the Rules Editor you should remove the first portion of the query, which is only necessary when you are querying Records in Sumo Logic:

`_index=sec_record_*`  

You can use an expression like this example in any rule type. Here is an example Match rule with the expression, shown in the Rules Editor.

<img src={useBaseUrl('img/cse/example-in-editor.png')} alt="Example in editor" width="500"/>

## Degraded rules

A degraded rule is one that has had a portion of the rule shut off to prevent it from exceeding a processing limit. If you write a custom rule that becomes degraded, you must tune the rule to correct the problem.

For example, rules have a limit on the number of records per second they can evaluate.  If there is a value used in the "group by" field that causes the rule to exceed that threshold, the particular value will be ignored, but the rest of the rule is still be used. In this case, Cloud SIEM might display a message like this:

`The aggregation on the group key 'admin@company.com' has a record volume exceeding the supported limit, and has been disabled. Consider tuning the rule to exclude records producing this group key.`

To resolve a degraded rule issue, create a [rule tuning expression](/docs/cse/rules/rule-tuning-expressions/) to address the portion of the rule causing the rule degradation.
