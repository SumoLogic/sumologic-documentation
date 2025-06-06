---
title: Bitdefender GravityZone
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/bitdefender-gravityzone.png')} alt="bitdefender-gravityzone" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Layered Next-Gen Security for physical, virtual, and cloud environments provided with reports, scan, policies and details as per below.

## Actions

* **Add File To Quarantine** (*Containment*) - Creates a new task to add a file to quarantine.
* **Add To Blocklist** (*Containment*) - Add file hashes to the Blocklist.
* **Create Report** (*Notification*) - Create new Report.
* **Create Scan Task** (*Containment*) - Create new Scan Task.
* **Delete Report** (*Containment*) - Delete Report.
* **Get Endpoint List** (*Enrichment*) - Search list of available endpoints.
* **Get Report** (*Enrichment*) - Get details of a report.
* **Get Scan List** (*Enrichment*) - Search list of available scans.
* **List Blocklist Items** (*Enrichment*) - Lists all the hashes that are present in the blocklist.
* **List Companies** (*Enrichment*) - Search list of available companies.
* **List Policies** (*Enrichment*) - Search list of available policies.
* **Policy Details** (*Enrichment*) - Get details of specific policy.
* **Remove From Blocklist** (*Containment*) - Remove file hashes from Blocklist.

## Configure Bitdefender GravityZone in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/bitdefender/bitdefender-configuration.png')} style={{border:'1px solid gray'}} alt="Bitdefender Gravity Zone configuration" width="400"/>

For information about Bitdefender GravityZone, see [GravityZone documentation](https://www.bitdefender.com/business/support/en/77209-79436-welcome-to-gravityzone.html).

## Change Log

* January 22, 2021 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
