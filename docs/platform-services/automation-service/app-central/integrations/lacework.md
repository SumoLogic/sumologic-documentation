---
title: Lacework
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/lacework.png')} alt="lacework" width="100"/>

***Version: 1.5  
Updated: May 2, 2024***

Lacework provides end-to-end cloud security automation for AWS, Azure, and GCP with a comprehensive view of risks across cloud workloads and containers.

## Actions

* **Close Alert** *(Containment)* - Change the status of an alert to closed.
* **Cloud Activities** *(Enrichment)* - List the cloud activities for the integrated AWS cloud accounts in your Lacework instance.
* **Execute Query** *(Enrichment)* - Execute a query in Lacework.
* **Get Alert Details** *(Enrichment)* - Get details about an alert.
* **List All Report Rules** *(Enrichment)* - List all the report rules in the Lacework instance.
* **Search Alerts** *(Enrichment)* - Search alerts with filter options.
* **Search Cloud Activities** *(Enrichment)* - Search for the cloud activities for the integrated AWS cloud accounts in your Lacework instance.
* **Search Events** *(Enrichment)* - Search for evidence or observation details of individual events.
* **Search Reports Rules** *(Enrichment)* - Search all report rules in Lacework instance.

## Configure Lacework in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Lacework, see [Lacework documentation](https://docs.lacework.net/).

## Change Log

* July 13, 2021 - First upload
* July 29, 2021 - New action added
* July 5, 2023 (v1.1) - Updated the integration with Environmental Variables
* October 5, 2023 (v1.2)
    + New logo
    + Code refactoring
    + Added new action: Search Events
    + Changed action type for:
        - Search Cloud Activities
        - Search Reports Rules
* December 14, 2023 (v1.3) - added new action: Close Alert
* January 26, 2024 (v1.4)
    + Added 2 new actions: Get Alert Details, Search Alerts
    + Fixed endpoint in Close Alert action
* May 2, 2024 (v1.5)
    + New action: Execute Query
