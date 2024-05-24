---
title: Sumo Logic Cloud SIEM Internal
description: ''
tags: []
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sumo-logic.png')} alt="sumo-logic-cloud-siem-internal" width="100"/>

***Version: 1.15  
Updated: Apr 5, 2024***

Utilize Cloud SIEM entities to correlate Signals and Insights through Sumo Logic system calls

## Actions

* **Add Entity Enrichment** (*Notification*) - Add enrichments to Entity.
* **Add Insight Comment** (*Notification*) - Add comment to Insight.
* **Add Insight Enrichment** (*Notification*) - Add enrichments to Insight.
* **Add Match List Item** (*Notification*) - Add Item to Match List.
* **Add Signal Enrichment** (*Notification*) - Add enrichments to Signal.
* **Add Tag to Entity** (*Notification*) - Add tag to the Entity.
* **Add Tag to Insight** (*Notification*) - Add tag to the Insight.
* **Delete Match List Item** (*Notification*) - Delete Item from Match List.
* **Get Entity** (*Enrichment*) - Get Entity details.
* **Get Insight** (*Enrichment*) - Get Insight details.
* **Get Signal** (*Enrichment*) - Get Signal details.
* **Insight Output Mapping** *(Enrichment)* - Parsing the output of a **Get Insight** action.
* **Remove Tag from Entity** (*Notification*) - Remove tag from Entity.
* **Remove Tag from Insight** (*Notification*) - Remove tag from Insight.
* **Update Entity Criticality** (*Notification*) - Update the Entity Criticality.
* **Update Insight Assignee** (*Notification*) - Update the insight Assignee.
* **Update Insight Status** (*Notification*) - Update the insight status.
* **Update Match List** (*Notification*) - Update Match List.
* **Update Match List Item** (*Notification*) - Update Item in Match List.
* **Verify Entity Type** (*Enrichment*) - Check the Entity Type.

## Change Log

* September 20, 2023 - First Upload
* October 13, 2023 (v1.13)
    + Added new action: Insight Output Mapping
* November 24, 2023 (v1.14)
    + Extended output mapping for Get Signal action
* April 5, 2024 (v1.15)
    + The integration formerly known as "CSE Tools" has been renamed to "Sumo Logic Cloud SIEM Internal"
