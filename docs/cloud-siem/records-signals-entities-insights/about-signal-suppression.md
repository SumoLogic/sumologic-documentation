---
id: about-signal-suppression
---

# About Signal Suppression

In CSE, a *suppressed Signal* is a Signal that CSE’s Insight algorithm will exclude from the Insight generation process. In other words, a suppressed Signal does not contribute to or become a part of an Insight. Some suppression of Signals is automatic, as described below in [Automatic suppression of redundant Signals](./About_Signal_Suppression.md "About Signal Suppression"). CSE also has features that allow you to suppress Signals for a specific
[Entity](03View_and_Manage_Entities.md "View and Manage Entities"), indicator, or [Network Block](../Administration/Create_and_Use_Network_Blocks.md "Create and Use Network Blocks").

This topic describes the various ways that Signals can get suppressed.

## Suppress by entity

You can suppress an Entity on its **Details** page in the CSE UI using the suppression slider. 

![suppression-slider.png](/img/cloud-siem-enterprise/suppression-slider.png)

You can suppress multiple Entities at once on the **Entities** page in the CSE UI. Note that in the  screenshot below, the row for an Entity that is currently suppressed contains a **Suppressed** indicator.

![entity-page.png](/img/cloud-siem-enterprise/entity-page.png)

When you checkmark one or more Entities, the **Update Suppression** button appears. When you click it you’re prompted to set the suppression state for the select Entities. You can also create a .csv file with your suppression changes, and use the **Import Metadata** button to upload it to CSE. For details, see the [View and Manage Entities](03View_and_Manage_Entities.md "View and Manage Entities") topic. You can see what Entities are currently suppressed on the **Suppressed Entities** page, available from the content menu. 

![suppressed-entities-page.png](/img/cloud-siem-enterprise/suppressed-entities-page.png)

## Suppress by indicator

Signals can be suppressed based on the presence of a suppressed indicator in any of the Records associated with a Signal. You create lists of indicators, which are things like IPs, hostnames, URLs, domains, and so. You can set a TTL (time to live) after which an indicator will be unsuppressed. You can create these lists on the **Suppressed Lists** page, available from the content menu. 

![suppressed-lists.png](/img/cloud-siem-enterprise/suppressed-lists.png)

## Suppress by Network Block

You can suppress Signals on all of the IP addresses in a Network Block. You can see on the Network Blocks page whether or not Signals are suppressed for IPs in the block.

![network-block-page.png](/img/cloud-siem-enterprise/network-block-page.png)

For more information see [Create and Use Network Blocks](../Administration/Create_and_Use_Network_Blocks.md "Create and Use Network Blocks").

## Automatic suppression of redundant Signals

CSE suppresses redundant Signals to prevent the generation of multiple, virtually identical Insights. For information about how this works, see [Redundant Signal suppression](00Insight_Generation_Process.md "Insight Generation Process") in the *Insight Generation Process* topic.  
 
