---
id: about-signal-suppression
title: About Signal Suppression
sidebar_label: Signal Suppression
description: Learn about the ways that CSE Signals can be suppressed, and so excluded from the Insight generation process.
keywords:
    - CSE
    - entity
    - entities
---

In CSE, a *suppressed Signal* is a Signal that CSE’s Insight algorithm will exclude from the Insight generation process. In other words, a suppressed Signal does not contribute to or become a part of an Insight. Some suppression of Signals is automatic. CSE also has features that allow you to suppress Signals for a specific
[Entity](/docs/cse/records-signals-entities-insights/view-manage-entities/), indicator, or [Network Block](/docs/cse/administration/create-use-network-blocks/).

This topic describes the various ways that Signals can get suppressed.

## Suppress by Entity

You can suppress an Entity on its **Details** page in the CSE UI using the suppression slider. 

![suppression-slider.png](/img/cse/suppression-slider.png)

You can suppress multiple Entities at once on the **Entities** page in the CSE UI. Note that in the  screenshot below, the row for an Entity that is currently suppressed contains a **Suppressed** indicator.

![entity-page.png](/img/cse/entity-page.png)

When you checkmark one or more Entities, the **Update Suppression** button appears. When you click it you’re prompted to set the suppression state for the select Entities. You can also create a .csv file with your suppression changes, and use the **Import Metadata** button to upload it to CSE. For details, see the [View and Manage Entities](/docs/cse/records-signals-entities-insights/view-manage-entities) topic. You can see what Entities are currently suppressed on the **Entities** page,by filtering the list by **Suppressed**.

![suppressed-entities-page.png](/img/cse/suppressed-entities-page.png)

## Suppress by indicator

Signals can be suppressed based on the presence of a suppressed indicator in any of the Records associated with a Signal. You create lists of indicators, which are things like IPs, hostnames, URLs, domains, and so. You can set a TTL (time to live) after which an indicator will be unsuppressed. You can create these lists on the **Suppressed Lists** page, available from the content menu. 

![suppressed-lists.png](/img/cse/suppressed-lists.png)

## Suppress by Network Block

You can suppress Signals on all of the IP addresses in a Network Block. You can see on the Network Blocks page whether or not Signals are suppressed for IPs in the block.

![network-block-page.png](/img/cse/network-block-page.png)

For more information, see [Create and Use Network Blocks](/docs/cse/administration/create-use-network-blocks/).

## Automatic suppression of redundant Signals

CSE suppresses redundant Signals to prevent the generation of multiple, virtually identical Insights. For information about how this works, see [Redundant Signal suppression](/docs/cse/get-started-with-cloud-siem/insight-generation-process/) in the *Insight Generation Process* topic.  
 
