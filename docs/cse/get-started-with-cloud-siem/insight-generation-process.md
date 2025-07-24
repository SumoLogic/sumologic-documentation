---
id: insight-generation-process
title: Insight Generation Process
sidebar_label: Insight Generation
description: Learn how Cloud SIEM correlates signals by entity to create insights.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe'; 

This page explains Cloud SIEM's insight generation process. 

The concept of an *entity* is central to the process Cloud SIEM uses to correlate signals and create insights. So, what is an entity? In Cloud SIEM, an entity is a actor, for example, a  hostname, username, or MAC address encountered in an incoming message. For more information about entities and entity types, see [View and Manage Entities](/docs/cse/records-signals-entities-insights/view-manage-entities).

:::sumo Micro Lesson
Watch this micro lesson to learn how insights are created.

<Iframe url="https://fast.wistia.net/embed/iframe/5un1z2hwoe?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: How are Insights Created? Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

:::

## Entities in messages are mapped to entity-type schema attributes

During the next step of the [record processing flow](/docs/cse/schema/record-processing-pipeline)—log mapping—message fields are mapped to Cloud SIEM schema attributes. During this process, each entity field from a message is mapped to one of the following Cloud SIEM schema entity attributes:

| Entity type | Schema attributes |
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

<img src={useBaseUrl('img/cse/on-entity-example.png')} alt="On Entity example" style={{border: '1px solid gray'}} width="300"/>

## Entities are created when rules fire

Cloud SIEM creates an entity when a rule generates a signal, unless the entity already exists in Cloud SIEM. When a record matches the conditions of a rule, Cloud SIEM generates a separate signal for each On Entity attribute from the record.   

The **Signals** page shows the entity associated with each signal.

<img src={useBaseUrl('img/cse/signal-list.png')} alt="Signals" style={{border: '1px solid gray'}} width="800"/>

## Viewing entities in Cloud SIEM UI

You can view the entities that have been extracted from messages on the **Entities** page in the Cloud SIEM UI.

<img src={useBaseUrl('img/cse/entity-list-page.png')} alt="Entities page" style={{border: '1px solid gray'}} width="800"/>

Note that the screenshot above shows an *activity score* for each entity. The following section explains what an activity score is and how it relates to the insight creation process.

## Understanding entity activity scores

An entity’s activity score is the sum of the severities of the unique signals associated with that entity during the previous two weeks, unless a [different detection period is configured](/docs/cse/records-signals-entities-insights/set-insight-generation-window-threshold). What makes a signal unique? A signal takes its name from the rule that fired it, so unless a rule's name has a unique templated value in it, the signals that the rule generates are not unique. 

Here are a couple practical examples:

* If the `RDP Brute Force Attempt` rule fires 10 times, the signals all have the same name, and are not unique. So, the severity of just one of the 10 signals would be included in the entity’s activity score.
* If the `RDP Brute Force Attempt {{threat_name}}` rule fires three times, where threat name is “bad”, “bad” and “worse”, two of the three signals are unique:
  * `RDP Brute Force Attempt bad`
  * `RDP Brute Force Attempt bad`
  * `RDP Brute Force Attempt worse`

The severities of the `RDP Brute Force Attempt bad` and the `RDP Brute Force Attempt worse` signals would be included in the entity’s activity score.

By default, when an entity’s activity score exceeds the threshold of 12, Cloud SIEM generates an insight on the entity. Like the detection period, you can [configure a different activity score threshold value](/docs/cse/records-signals-entities-insights/set-insight-generation-window-threshold) for insight generation. When Cloud SIEM creates an insight on an entity, it resets the entity’s activity score to 0.

After Cloud SIEM fires a particular signal on a particular entity, it suppresses signals for that signal-entity combination for a time to prevent redundant signals. For more information, see [Redundant signal suppression](#redundant-signal-suppression), below.

### Example of an entity that has exceeded activity score threshold

In the screenshot below, the **Details** pane on the left shows that the insight was created for the entity “217.xxx.x.x”, an IP address. The right side of the page shows the signals that contributed to the insight. You can see each of the signals relate to the IP address for which the insight was created; in the record underlying each of the signals, is mapped to the `srcDevice_ip` schema attribute. 

The severity of each signal is also shown. Cloud SIEM generated an insight for entity “217.xxx.x.x” because the cumulative severity of signals fired for that entity within a two week period exceeds the threshold activity score.

<img src={useBaseUrl('img/cse/insight.png')} alt="Insight" style={{border: '1px solid gray'}} width="800"/>

### Redundant signal suppression

Under certain circumstances, Cloud SIEM suppresses signals to prevent generation of multiple, virtually identical insights. A few unique signals firing numerous times for the same entity in a short period of time could cause the entity’s activity score to climb, resulting in an insight. At that point, the entity’s Activity score is reset, and the cycle could repeat, leading to several insights in succession on the same entity that contain a very similar or identical set of unique signals. 

This makes insight triage less than ideal for the analyst since they're getting multiple insights for the same sets of signals. Cloud SIEM prevents this by suppressing signals that have the same name and are on the same entity during a 12 hour time window, or up to 72 hours if signals for the signal-entity combination are firing continuously.   

**Example 1**

If signal A fires on entity X at hour 0 and continues to fire once every 30 minutes for 24 hours, the signals that fired after the first one are suppressed. This prevents those subsequent signals from being analyzed by the insight engine.  

**Example 2**

Signal B fires on entity Y fires at hour 0, and doesn’t fire again until hour 13. The signal that fired at hour 13 will not be suppressed, and will be analyzed by the insight engine.  

:::note
Prototype signals, which are are not included in insights, are not suppressed.
:::

## About insight severity

The severity of an insight is indicated as Low, Medium, High, or Critical. Note that there are only two situations in which an insight can have the Critical severity level:

* You can assign a severity of Critical to a [custom insight](/docs/cse/records-signals-entities-insights/configure-custom-insight) configuration.
* You can change the severity of an insight from the severity it was assigned by Cloud SIEM at generation time. In the [insight details](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/) pane, click the icon that appears next to **Severity** to display the severity levels, and select a new level. 

Insights that are generated by the Cloud SIEM insight generation algorithm will only have severity levels of Low, Medium, or High. Severity is a function of the entity activity score of the insight’s entity.

By default the threshold entity activity score for insight generation is 12.The table below shows how severity values map to activity scores, if you haven’t changed the threshold value.   

| Insight severity value | Activity score |
|:------------------------|:----------------|
| Low                    | 13          |
| Medium                 | 14 or 15          |
| High                   | 16 or higher   |

If your entity activity score threshold value is set to a value other than 12, you can work out the mapping yourself. If `t` is your configured threshold:

```
Low = (t + 1)
Medium = (t + 2) to (t + 3)
High = (t + 4) or higher
```
