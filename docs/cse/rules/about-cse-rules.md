---
id: about-cse-rules
title: About Cloud SIEM Rules
sidebar_label: About Cloud SIEM Rules
description: Learn about Cloud SIEM rules, rules syntax, and how to write rules.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe'; 

A Cloud SIEM rule is logic that fires based on information in incoming records. When a rule fires, it creates a signal.

[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). To view rules, in the top menu select **Content > Rules**. 

[**New UI**](/docs/get-started/sumo-logic-ui). To view rules, in the main Sumo Logic menu select **Cloud SIEM > Rules**. You can also click the **Go To...** menu at the top of the screen and select **Rules**. 
 
:::tip
For a complete list of out-of-the-box rules, see [Rules](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/README.md) in the [Cloud SIEM Content Catalog](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/README.md).
:::

:::sumo Micro Lesson

Watch this micro lesson to learn more about rules.

<Iframe url="https://fast.wistia.net/embed/iframe/p9g2m0c62a?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: Understanding Cloud SIEM Rules Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

<!-- old
<Iframe url="https://www.youtube.com/embed/RVGk2dDeHmk?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />
-->

:::

## About rule expressions

The key element of a Cloud SIEM rule is a *rule expression*. A rule expression defines what conditions the rule will look for. A rule expression includes one or more equality statements, each of which evaluates a field value in incoming records, typically comparing it to a constant value, for example `description = 'CMS Domain Match'`. A simple rule expression might be a single equality expression, or multiple expressions combined with logical operators. A rule expression evaluates to a boolean value. When a rule’s conditions are met, it creates a signal. 

The following rule expression, which looks for any event that stops AWS CloudTrail logging, is an example of a rule expression that contains only equality statements.

`metadata_vendor = 'AWS' and metadata_product = 'CloudTrail' and fields.eventName = "DeleteTrail" or fields.eventName = "StopLogging" or fields.eventName = "UpdateTrail"`

Rule expressions can also use regular expressions and Cloud SIEM rules language functions, which include SQL-like and domain-specific functions. For more information, see [Cloud SIEM Rules Syntax](/docs/cse/rules/cse-rules-syntax).

:::note
The [Before You Write a Custom Rule](/docs/cse/rules/before-writing-custom-rule) topic has useful information about how to prototype a rule expression in Sumo Logic core platform.
:::

## About tuning expressions

Like a rule expression, a tuning expression is matched against incoming records. As an example, consider the following rule expression, which detects that an attempt was made to clear the Windows Security Event Log.

```sql
metadata_vendor = 'Microsoft' and metadata_product = 'Windows' and metadata_deviceEventId = 'Security-1102' and fields['Provider.Name'] = 'Microsoft-Windows-Eventlog'
```

If you don’t want the rule to generate a signal if the person performing the action is “jdoe”, you can add a tuning expression like this to the rule:

```sql
user_userId = !jdoe
```

The tuning expression is AND’d with the rule expression—the rule will only generate a signal if a record matches both expressions. 

Rule tuning expressions allow you to tailor the logic of a built-in rule without replicating and modifying the rule. The benefit of using a tuning expression, over the copy and edit method, is that when Cloud SIEM updates built-in rules, your tuning expressions are preserved. This division of logic means that you don’t need to create as many custom rules. If you use tuning expressions in combination with multi-entity rules you’ll further reduce the need for custom rules.   

You create tuning expressions on the **Rule Tuning** page, which is available from the **Content** menu. When you create a tuning expression, you have the option of applying to all of your rules, or to selected rules. Or, you can apply tuning expressions when you create a rule. You can apply multiple tuning expressions to a rule. You can assign a tuning expression to selected rules, or to all of your rules. You can also create a tuning expression without immediately assigning it to any rules. For more information, see [Rule Tuning Expressions](/docs/cse/rules/rule-tuning-expressions).

## "On Entity" configuration

In Cloud SIEM, the term *entity* refers to an IP address, hostname, username, or MAC address. When you create a Cloud SIEM rule, you select one or more *On Entity attributes* in the **Then Create a Signal** part of the UI. An On Entity attribute is a Cloud SIEM schema attribute that hold an IP address, hostname, username, or MAC address.

The screenshot below shows a rule whose "On Entity" attributes are `srcDevice_ip` and `dstDevice_ip`.

<img src={useBaseUrl('img/cse/on-entity.png')} alt="On Entity configuration" width="300"/>

When an incoming record meets a rule's conditions, a signal is generated for each of the rule's On Entity attributes found in the record. When the example rule above fires, it generates two signals: one on the IP address held in the `srcDevice_ip` attribute, and  another on the IP address held in the `dstDevice_ip` attribute.

## Rule types

There are several kinds of rules. Each supports a different sort of firing behavior. (For a complete list of out-of-the-box rules, see [Rules](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/rules/README.md) in the [Cloud SIEM Content Catalog](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/README.md).)

* **Match rule**. Fires when an incoming record matches the rule expression. A match rule is stateless: it looks at a single record, and it either fires or it doesn’t. The expression in the previous section is an example of a match rule expression. If a record matches the expression, the rule fires. For more information about match rules, see [Write a Match Rule](/docs/cse/rules/write-match-rule).
* **Chain rule**. You can use a chain rule to look for two or more types of events, and to fire, based on the frequency of each over a time window. For example, when a user has more than 10 failed login attempts and one successful login attempt in a one hour window. Like a threshold rule, a chain rule is stateful and counts multiple records. The difference is that a chain rule applies multiple expressions to a record. For more information about chain rules, see [Write a Chain Rule](/docs/cse/rules/write-chain-rule).
* **Aggregation rule**. Fires when up to three aggregation conditions are met within a specified period of time. For example, when a large variety of different AWS CloudTrail event IDs from the same `device_ip` are observed within a 30 minute period. For more information about aggregation rules, see [Write an Aggregation Rule](/docs/cse/rules/write-aggregation-rule).
* **Threshold rule**. Fires when the rule expression is matched at least a certain number times during a specified length of time. For example, if there are five or more failed login attempts for the same IP address within one hour. A threshold rule is stateful, a condition must be satisfied by multiple records over a period of time. For more information about threshold rules, see [Write a Threshold Rule](/docs/cse/rules/write-threshold-rule).
* **First seen rule**. Fires when behavior by an entity is encountered that hasn't been seen before. For example, the first time when a user logs in from a new location, or when a new admin account is created. For more information about first seen rules, see [Write a First Seen Rule](/docs/cse/rules/write-first-seen-rule).
* **Outlier rule**. Fires when behavior by an entity is encountered that deviates from its baseline activity. For each outlier rule, Cloud SIEM automatically creates a baseline model of normal behavior. After the baseline learning period is completed, activity that deviates from the mean (normal baseline behavior) creates a signal. For more information about outlier rules, see [Write an Outlier Rule](/docs/cse/rules/write-outlier-rule).

## Product identification metadata fields

During the record parsing process, Cloud SIEM adds metadata that identifies the product or service that generated the record. You use this metadata in a rule to specify what records the rule should be applied to. For example, the rule fragment below will match records generated by Trend Micro Deep Security devices with IDs in a specified range: 

```sql
metadata_vendor = 'Trend Micro' and metadata_product = 'Deep Security'  and metadata_deviceEventId between '2000000' and '2999999'
```

Some of the key metadata fields are defined below.

| Metadata field  | Type | Description |
|:--|:--|
| `metadata_vendor` | string | The name of the company responsible for the data source. Note the name of the product is in the "product" field. |
| `metadata_product` | string | The specific product name of the data source. Note the name of the company who created the product is the "vendor" field. |
| `metadata_deviceEventId` | string | Event type given by the vendor for the log. |

## Rules and other content

This section describes two key Cloud SIEM features that enable you to write richer rules that can look up information about the entities that are actors in a record. For example, you could compare a domain in a record to a list of allowed listed domains. Or you could compare an IP address to a list of IP addresses known to be indicators of compromise.  

### Match lists

The subsections below explain how match lists work, and how to leverage them in Cloud SIEM rules. For more information about match lists, see [Match Lists and Suppressed Lists](/docs/cse/match-lists-suppressed-lists/).

#### Match lists are used to enrich record data

This section describes what [match lists](/docs/cse/match-lists-suppressed-lists) are, and how Cloud SIEM uses them to enrich record data. The short story is that when a record is ingested, Cloud SIEM uses match lists to add information to the record. So, your rule doesn’t directly refer to a match list, it checks the record for data that Cloud SIEM may have added to the record at the time of ingestion. 

Match lists are lists of important indicators and identifiers, typically configured by a Cloud SIEM analyst. Match lists are often used to define allowlists of entities, like IP addresses, URLs, and hostnames, and so on, that you want to exempt from ordinary rule processing. For example, you might want to prevent a rule from firing for records that contain one of a certain set of IP addresses. 

Here are some match lists in Cloud SIEM.   

<img src={useBaseUrl('img/cse/example-match-lists.png')} alt="Example match list" width="800"/>

You can take advantage of match lists in rules, but match lists actually come into play when records are ingested. Here’s how it works:  When a record is ingested, Cloud SIEM compares the entries in all match lists to fields in the record. Of course, Cloud SIEM doesn’t compare the entries in a given match list to all fields in a record; it wouldn’t make sense to compare a domain name to an IP address. You could say that Cloud SIEM understands the difference between apples and oranges: Cloud SIEM distinguishes which record fields contain IP addresses, which contain domain name and so on. So, Cloud SIEM compares a match list of IP addresses to record fields that contain IP addresses. Similarly, Cloud SIEMs compares a match list of usernames to record fields that contain usernames. For more information about how that works, see [Match Fields Reference](/docs/cse/match-lists-suppressed-lists/match-fields-reference). 

When a record contains a value that *exactly* matches one or more match lists (partial matches are not supported), two fields in the record get populated:

* `listMatches.` Cloud SIEM adds the names of the match lists that the record matched, and the column values of those lists. For example, if an IP address in a record matches the `SourceIP` address in the “vuln_scanners” match list, the `listMatches` field would look like this: `listMatches: ['vuln_scanners', 'column:SourceIp']`    
* `matchedItems`. Cloud SIEM adds the actual key-value pairs that were matched. For example, continuing the example above, if “vuln_scanners” match list contained an entry “5.6.7.8”, and the record’s `SourceIp `is also “5.6.7.8”, the assuming the `SourceIP` address in the “vuln_scanners” match list, the `matchedItems` field would like like this: `matchedItems: [ { value: '5.6.7.8', …other metadata about list item } ]`

Because the information about list matches gets persisted within records, you can reference it downstream in both rules and search. 

#### Rules look for match data in records

When you’re writing a rule that needs to take advantage of the results of the list matching process described above, you extend your rule expression with the `array_contains` function. 

The syntax is:

```sql
array_contains(listMatches, "match-list-name")
```

where 

* `match-list-name` is the name of the match list.
  
:::note
If the name of the list you are referencing with `array_contains` contains any spaces, replace the spaces with underscores. For example, if the list name is *my list*, refer to it as *my_list*.
:::

Depending on your goal, you precede the `array_contains` function with either AND or AND NOT. 

For example, the fragment below looks at a record for a field named `listMatches` that contains the value “vuln_scanners”. If not encountered, that indicates that the IP address is not a vulnerable scanner, so, given that the rest of the rule expression is matched, a signal will be fired for that record. 

```sql
... AND NOT array_contains(listMatches, "vuln_scanners")
```

This example below checks a record for a field named `listMatches` that contains either “vul_scanners” or  “business_ips”. Notice that the two `array_contains` statements  are combined with an OR and enclosed in parentheses:  
   
```sql
...AND NOT (array_contains(listMatches, 'vuln_scanners') OR array_contains(listMatches, 'business_ips'))
```

### Threat Intelligence

Threat Intelligence sources contain values that, when encountered in a record, are clear indicators of compromise. To create a new source of Threat Intelligence, see [Manage Threat Intelligence Indicators](/docs/security/threat-intelligence/threat-intelligence-indicators/).

Threat Intelligence sources are used at the time of record ingestion. When a record is ingested, Cloud SIEM determines whether any of the fields in the record exist in any of your Threat Intelligence sources. When a record contains a value that matches an entry in one or more Threat Intelligence sources, the `hasThreatMatch` Cloud SIEM rules function searches incoming records in Cloud SIEM for matches to threat intelligence indicators. For more information, see [Threat Intelligence Indicators in Cloud SIEM](/docs/security/threat-intelligence/threat-indicators-in-cloud-siem/).

