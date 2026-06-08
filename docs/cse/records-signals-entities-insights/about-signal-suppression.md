---
id: about-signal-suppression
title: About Signal Suppression
sidebar_label: Signal Suppression
description: Learn about the ways that Cloud SIEM signals can be suppressed, and so excluded from the insight generation process.
keywords:
    - Cloud SIEM
    - entity
    - entities
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic describes the various ways that signals can get suppressed.

In Cloud SIEM, a *suppressed signal* is a signal that Cloud SIEM's insight algorithm will exclude from the insight generation process. In other words, a suppressed signal does not contribute to or become a part of an insight. By default, signals are automatically suppressed for 72 hours. 

Signal suppression can occur for a variety of reasons, including [entity suppression](#suppress-by-entity), [network blocks](#suppress-by-network-block), [suppression lists](#suppress-by-indicator), and identifying [redundant signals](#automatic-suppression-of-redundant-signals) by our rules correlation engine. In all cases, signals will still be generated in the suppressed state. Depending on the reason, the field `suppressedReasons` will be populated in the `sec_signal` index. For example, this may include the signal ID of an identical signal that caused subsequent redundant signals to be suppressed, or it may contain the name of the network block with suppression enabled.

## Set the global signal suppression value

By default, signals are automatically suppressed for 72 hours. You can change this value to anywhere from 24 hours to 72 hours with the **Global Signal Suppression** setting on the **Insight Detection** page. See [Set Insight Generation Window and Threshold](/docs/cse/records-signals-entities-insights/set-insight-generation-window-threshold/).

<img src={useBaseUrl('img/cse/detection-threshold-global-signal-suppression.png')} alt="Detection threshold settings" style={{border: '1px solid gray'}} width="600"/>

### Override global signal suppression

You can override the [global signal suppression](/docs/cse/records-signals-entities-insights/set-insight-generation-window-threshold/) in any rule. This allows the rule to generate signals in a shorter time frame than the 72-hour default. This can be helpful, for example, when you want the rule to generate signals for time-sensitive issues that cannot wait for 72 hours before generating a signal.<br/><img src={useBaseUrl('img/cse/override-global-signal-suppression.png')} alt="Override Global Signal Suppression" style={{border: '1px solid gray'}} width="500"/>

To override global signal suppression in a rule:
1. Create or edit a [rule](/docs/cse/rules/).
1. Click **Show Advanced** on the **Then Create a Signal** tab.
1. Select the **Override Global Signal Suppression** check box.
1. Enter the hours and/or minutes to suppress signal generation.

For certain rule types (Threshold, Chain, or Aggregation), the minimum valid value you can enter is determined by the time value in the **If Triggered** tab. <br/><img src={useBaseUrl('img/cse/override-global-signal-suppression-grouped-by.png')} alt="Minimum valid value" style={{border: '1px solid gray'}} width="600"/>

## Suppress by entity

You can suppress an entity on its [details page](/docs/cse/records-signals-entities-insights/view-manage-entities#about-the-entities-details-page) in the Cloud SIEM UI using the suppression slider. 

<img src={useBaseUrl('img/cse/suppression-slider.png')} alt="Entity suppression slider" style={{border: '1px solid gray'}} width="300"/>

You can suppress multiple entities at once on the [entities list page](/docs/cse/records-signals-entities-insights/view-manage-entities#about-the-entities-list-page) in the Cloud SIEM UI. Note that in the screenshot below, the row for an Entity that is currently suppressed contains a **Suppressed** indicator.

<img src={useBaseUrl('img/cse/entity-page.png')} alt="Suppression on the entities page" style={{border: '1px solid gray'}} width="800"/>

When you checkmark one or more entities, the **Update Suppression** button appears. When you click it you’re prompted to set the suppression state for the select entities. You can also create a .csv file with your suppression changes, and use the **Import Metadata** button to upload it to Cloud SIEM. For details, see the [View and Manage Entities](/docs/cse/records-signals-entities-insights/view-manage-entities) topic. 

You can see what entities are currently suppressed on the **Entities** page by filtering the list by **Suppressed**. <br/><img src={useBaseUrl('img/cse/suppressed-entities-page.png')} alt="Suppressed entities" style={{border: '1px solid gray'}} width="300"/>

## Suppress by indicator

Signals can be suppressed based on the presence of a suppressed indicator in any of the records associated with a signal. You create lists of indicators, which are things like IPs, hostnames, URLs, domains, and so. You can set a TTL (time to live) after which an indicator will be unsuppressed. You can create these lists on the [**Suppressed Lists**](/docs/cse/match-lists-suppressed-lists/suppressed-lists/) page, available from the content menu. 

<img src={useBaseUrl('img/cse/suppressed-lists.png')} alt="Suppress entities by indicator" style={{border: '1px solid gray'}} width="800"/>

## Suppress by network block

You can suppress signals on all of the IP addresses in a network block. You can see on the network blocks page whether or not signals are suppressed for IPs in the block. For more information, see [Create and Use Network Blocks](/docs/cse/administration/create-use-network-blocks/).

<img src={useBaseUrl('img/cse/network-block-page.png')} alt="Suppress by network block" style={{border: '1px solid gray'}} width="800"/>

## Automatic suppression of redundant signals

Cloud SIEM suppresses redundant signals to prevent the generation of multiple, virtually identical insights. For information about how this works, see [Redundant signal suppression](/docs/cse/get-started-with-cloud-siem/insight-generation-process#redundant-signal-suppression).  
 
