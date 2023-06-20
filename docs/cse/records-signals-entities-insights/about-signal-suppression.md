---
id: about-signal-suppression
title: About Signal Suppression
sidebar_label: Signal Suppression
description: Learn about the ways that Cloud SIEM Signals can be suppressed, and so excluded from the Insight generation process.
keywords:
    - Cloud SIEM
    - entity
    - entities
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In Cloud SIEM, a *suppressed Signal* is a Signal that Cloud SIEM's Insight algorithm will exclude from the Insight generation process. In other words, a suppressed Signal does not contribute to or become a part of an Insight. By default, Signals are automatically suppressed for 72 hours. 

Cloud SIEM also has features that allow you to suppress Signals for a specific [Entity](/docs/cse/records-signals-entities-insights/view-manage-entities/), indicator, or [Network Block](/docs/cse/administration/create-use-network-blocks/).

This topic describes the various ways that Signals can get suppressed.

## Set the global Signal suppression value

By default, Signals are automatically suppressed for 72 hours. You can change this value to anywhere from 24 hours to 72 hours with the **Global Signal Suppression Window** setting on the **Detection Threshold** page. See [Set Insight Generation Window and Threshold](/docs/cse/records-signals-entities-insights/set-insight-generation-window-threshold/).

<img src={useBaseUrl('img/cse/detection-threshold-global-signal-suppression.png')} alt="Detection threshold settings" width="700"/>

## Suppress by Entity

You can suppress an Entity on its [details page](/docs/cse/records-signals-entities-insights/view-manage-entities#about-the-entities-details-page) in the Cloud SIEM UI using the suppression slider. 

<img src={useBaseUrl('img/cse/suppression-slider.png')} alt="Entity suppression slider" width="300"/>

You can suppress multiple Entities at once on the [Entities list page](/docs/cse/records-signals-entities-insights/view-manage-entities#about-the-entities-list-page) in the Cloud SIEM UI. Note that in the  screenshot below, the row for an Entity that is currently suppressed contains a **Suppressed** indicator.

<img src={useBaseUrl('img/cse/entity-page.png')} alt="Suppression on the Entities page" width="800"/>

When you checkmark one or more Entities, the **Update Suppression** button appears. When you click it you’re prompted to set the suppression state for the select Entities. You can also create a .csv file with your suppression changes, and use the **Import Metadata** button to upload it to Cloud SIEM. For details, see the [View and Manage Entities](/docs/cse/records-signals-entities-insights/view-manage-entities) topic. You can see what Entities are currently suppressed on the **Entities** page by filtering the list by **Suppressed**.

<img src={useBaseUrl('img/cse/suppressed-entities-page.png')} alt="Suppressed Entities" width="800"/>

## Suppress by indicator

Signals can be suppressed based on the presence of a suppressed indicator in any of the Records associated with a Signal. You create lists of indicators, which are things like IPs, hostnames, URLs, domains, and so. You can set a TTL (time to live) after which an indicator will be unsuppressed. You can create these lists on the [**Suppressed Lists**](/docs/cse/match-lists-suppressed-lists/suppressed-lists/) page, available from the content menu. 

<img src={useBaseUrl('img/cse/suppressed-lists.png')} alt="Suppress Entities by indicator" width="800"/>

## Suppress by Network Block

You can suppress Signals on all of the IP addresses in a Network Block. You can see on the Network Blocks page whether or not Signals are suppressed for IPs in the block. For more information, see [Create and Use Network Blocks](/docs/cse/administration/create-use-network-blocks/).

<img src={useBaseUrl('img/cse/network-block-page.png')} alt="Suppress by network block" width="800"/>

## Automatic suppression of redundant Signals

Cloud SIEM suppresses redundant Signals to prevent the generation of multiple, virtually identical Insights. For information about how this works, see [Redundant Signal suppression](/docs/cse/get-started-with-cloud-siem/insight-generation-process#redundant-signal-suppression).  
 
