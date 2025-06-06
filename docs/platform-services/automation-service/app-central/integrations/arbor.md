---
title: Arbor
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/arbor.png')} alt="apivoid" width="90"/>

***Version: 1.3  
Updated: Mar 4, 2024***

Gather detail-rich data from Netscout Arbor alerts.

## Actions

* **Alert Ongoing Polling** (*Enrichment*) - Presents data on whether the alert is still active.
* **Get Alert** (*Enrichment*) - Get a specific Arbor alert.
* **List Alerts** (*Enrichment*) - Get all Arbor alerts.
* **Mitigation Ongoing Polling** (*Enrichment*) - Presents data on whether the alert is still actively being mitigated.
* **Arbor Alerts Daemon** (*Daemon*) - Automatically pass alerts to Cloud SOAR.

## Configure Arbor in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/arbor/arbor-configuration.png')} style={{border:'1px solid gray'}} alt="Arbor configuration" width="400"/>

For information about Arbor, see [Netscout](https://www.netscout.com/arbor).

## Change Log

* May 22, 2020 - First upload
* July 13, 2023 (v1.2)
    + Updated the integration with Environmental Variables
    + Changed fields visibility
* March 4, 2024 (v1.3) - Updated code for compatibility with Python 3.12
