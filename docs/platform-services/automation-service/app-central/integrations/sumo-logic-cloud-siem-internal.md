---
title: Sumo Logic Cloud SIEM Internal
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sumo-logic.png')} alt="Sumo Logic icon" width="100"/>

***Version: 1.18  
Updated: September 7, 2026***

This [automation integration](/docs/platform-services/automation-service/app-central/integrations/) utilizes Cloud SIEM entities to correlate signals and insights through Sumo Logic system calls. Because this integration operates internally with Sumo Logic, no additional authentication is needed. (The [Sumo Logic Cloud SIEM](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-cloud-siem/) automation integration requires additional authentication.) 

For information about Cloud SIEM, see [Get Started with Cloud SIEM](/docs/cse/get-started-with-cloud-siem/).

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

## Configure Sumo Logic Cloud SIEM Internal in Automation Service and Cloud SOAR

No configuration is needed. Sumo Logic Cloud SIEM Internal executes without additional authentication.

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.18 | September 7, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.17 | July 4, 2025 | Fixed the beta change behavior and modified the hint for the **Insight Output Mapping** action for clarity. |
| v1.16 | July 3, 2025 | Tested the **Insight Output Mapping** action for a beta change. |
| v1.15 | April 5, 2024 | Renamed the integration from "CSE Tools" to "Sumo Logic Cloud SIEM Internal." |
| v1.14 | November 24, 2023 | Extended output mapping for the **Get Signal** action. |
| v1.13 | October 13, 2023 | Added a new action: **Insight Output Mapping**. |
| | September 20, 2023 | Initial release of the Sumo Logic Cloud SIEM Internal integration. |

