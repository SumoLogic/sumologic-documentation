---
id: insight-generation-process
title: Insight Generation Process
sidebar_label: Insight Generation
description: Learn how CSE correlates Signals by entity to create Insights.
---


This page explains CSE's Insight generation process. 

The concept of an *entity* is central to the process CSE uses to correlate Signals and create Insights. So, what is an entity? In CSE, an entity is a actor, for example, a  hostname, username, or MAC address encountered in an incoming message. For more information about Entities and Entity types, see [View and Manage Entities](/docs/cse/records-signals-entities-insights/view-manage-entities).

## Entities in messages are mapped to entity-type schema attributes

During the next step of the [Record processing flow](/docs/cse/schema/record-processing-pipeline)—log mapping—message fields are mapped to CSE schema attributes. During this process, each entity field from a message is mapped to one of the following CSE schema entity attributes:

| Entity Type | Schema Attributes |
|:----- |:----- |
| Command | `commandLine` |
| Domain | `http_referer_fqdn`, `http_url_fqdn` |
| Email | `targetUser_email`, `user_email` |
| File | `file_path`, `file_basename` |
| Hash | `file_hash_imphash`, `file_hash_md5`, `file_hash_pehash`, `file_hash_sha1`, `file_hash_sha256`, `file_hash_ssdeep` |
| Hostname | `device_hostname`, `device_hostname_raw`, `dstDevice_hostname`, `dstDevice_hostname_raw`, `srcDevice_hostname`, `srcDevice_hostname_raw` |
| IP Address | `device_ip`, `device_natIp`, `dns_replyIp`, `dstDevice_ip`, `dstDevice_natIp`, `srcDevice_ip`, `srcDevice_natIp` |
| MAC Address | `device_mac`, `dstDevice_mac`, `srcDevice_mac` |
| Process | `baseImage`, `parentBaseImage` |
| URL | `http_url` |
| User Agent | `http_userAgent` |
| Username | `fromUser_username`, `fromUser_username_raw`, `user_username`, `user_username_raw` |

Which particular attribute an entity gets mapped to depends on the [field mappings](/docs/cse/schema/create-structured-log-mapping) in the log mapper for the message source. Given the example message above, “thedude” might be mapped to `user_username` and "185.35.135.245"
to `srcDevice_ip`. 

## Rules have one or more On Entity attributes

When you write a rule, you select one or more *On Entity* attributes in the **Then Create a Signal** area of the **Rules Editor**. Here is an example of an existing rule that has two On Entity attributes: `srcDevice_ip` and `dstDevice_ip`.

![on-entity-example.png](/img/cse/on-entity-example.png)

## Entities are created when rules fire

CSE creates an Entity when a Rule generates a Signal, unless the Entity already exists in CSE. When a Record matches the conditions of a rule, CSE generates a separate Signal for each On Entity attribute from the Record.   

The **Signals** page shows the Entity associated with each Signal.

![signal-llist.png](/img/cse/signal-llist.png)

## Viewing entities in CSE UI

You can view the entities that have been extracted from messages on the **Entities** page in the CSE UI.

![entities-page.png](/img/cse/entity-list-page.png)

Note that the screenshot above shows an *Activity Score* for each entity. The following section explains what an Activity Score is and how it relates to the Insight creation process.

## Understanding Entity Activity Scores

An entity’s Activity Score is the sum of the severities of the unique Signals associated with that entity during the previous two weeks, unless a [different detection period is configured](/docs/cse/records-signals-entities-insights/set-insight-generation-window-threshold). What makes a Signal unique? A Signal takes its name from the rule that fired it, so unless a rule's name has a unique templated value in it, the Signals that the rule generates are not unique. 

Here are a couple practical examples:

* If the `RDP Brute Force Attempt` rule fires 10 times, the Signals all have the same name, and are not unique. So, the severity of just one of the 10 Signals would be included in the entity’s Activity Score.
* If the `RDP Brute Force Attempt {{threat_name}}` rule fires three times, where threat name is “bad”, “bad” and “worse”, two of the three Signals are unique:
  * `RDP Brute Force Attempt bad`
  * `RDP Brute Force Attempt bad`
  * `RDP Brute Force Attempt worse`

The severities of the `RDP Brute Force Attempt bad` and the `RDP Brute Force Attempt worse` Signals would be included in the entity’s Activity Score.

By default, when an entity’s Activity Score exceeds the threshold of 12, CSE generates an Insight on the entity. Like the detection period, you can [configure a different Activity Score threshold value](/docs/cse/records-signals-entities-insights/set-insight-generation-window-threshold) for Insight generation. When CSE creates an Insight on an Entity, it resets the Entity’s Activity Score to 0.

After CSE fires a particular Signal on a particular Entity, it suppresses Signals for that Signal-Entity combination for 12 to 24 hours. For more information, see [Redundant Signal suppression](#redundant-signal-suppression), below. 

### Example of an Entity that has reached Activity Score threshold

In the screenshot below, the **Details** pane on the left shows that the Insight was created for the entity “192.168.1.1”, an IP address. The right side of the page shows the three Signals that contributed to the Insight. You can see each of the Signals relate to the IP address for which the Insight was created; in the Record underlying each of the Signals, is mapped to the `srcDevice_ip` schema attribute. 

The severity of each Signal is also shown. CSE generated an Insight for entity “192.168.1.1” because the cumulative severity of Signals fired for that entity within a two week period exceeds the threshold Activity Score.

![insight.png](/img/cse/insight.png)

### Redundant Signal suppression

Under certain circumstances, CSE suppresses Signals to preventgeneration of multiple, virtually identical Insights. A few unique Signals firing numerous times for the same entity in a short period of time could cause the entity’s Activity Score to climb, resulting in an Insight. At that point, the Entity’s Activity score is reset, and the cycle could repeat, leading to several Insights in succession on the same entity that contain a very similar or identical set of unique Signals. 

This makes Insight triage less than ideal for the analyst since they're getting multiple Insights for the same sets of Signals. CSE prevents this by suppressing Signals that have the same name and are on the same Entity during a 12 hour time window, or up to 72 hours if Signals for the Signal-Entity combination are firing continuously.   

**Example 1**

If Signal A fires on Entity X at hour 0 and continues to fire once every 30 minutes for 24 hours, the Signals that fired after the first one are suppressed. This prevents those subsequent Signals from being analyzed by the Insight engine.  

**Example 2**

Signal B fires on Entity Y fires at hour 0, and doesn’t fire again until hour 13. The Signal that fired at hour 13 will not be suppressed, and will be analyzed by the Insight engine.  

Signals that are suppressed appear in the CSE UI as “suppressed”. Suppressed Signals are displayed in the CSE UI for 90 days.

:::note
Prototype Signals, which are are not included in Insights, are not suppressed.
:::

## About Insight Severity

The severity of an Insight is indicated as Low, Medium, High, or Critical. Note that there are only two situations in which an Insight can have the Critical severity level:

* You can assign a severity of Critical to a [Custom Insight](/docs/cse/records-signals-entities-insights/configure-custom-insight) configuration.
* You can change the severity of an Insight from the severity it was assigned by CSE at generation time. In the [Insight details](/docs/cse/records-signals-entities-insights/about-cse-insight-ui/) pane, click the icon that appears next to **Severity** to display the severity levels, and select a new level. 

Insights that are generated by the CSE Insight generation algorithm will only have severity levels of Low, Medium, or High. Severity is a function of the Entity Activity Score of the Insight’s Entity.

By default the threshold Entity Activity Score for Insight generation is 12.The table below shows how severity values map to Activity Scores, if you haven’t changed the threshold value.   

| Insight Severity value | Activity Score |
|:------------------------|:----------------|
| Low                    | 13          |
| Medium                 | 14 or 15          |
| High                   | 16 or higher   |

If your Entity Activity Score threshold value is set to a value other than 12, you can work out the mapping yourself. If `t` is your configured threshold:

```
Low = (t + 1)
Medium = (t + 2) to (t + 3)
High = (t + 4) or higher
```
