---
title: Opswat Metadefender
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/opswat-metadefender.png')} alt="opswat-metadefender" width="100"/>

***Version: 1.1  
Updated: Jul 07, 2023***

MetaDefender is a cybersecurity platform for preventing and detecting cybersecurity threats on multiple data channels. 

## Actions

* **IP Reputation** (*Enrichment*) - Retrieve information about given observable (IPv4 + IPv6) from CIF server.
* **URL Reputation** (*Enrichment*) - Retrieve information about given observable (URL) from CIF server.
* **Domain Reputation** (*Enrichment*) - Retrieve information about a given fully qualified domain name (FQDN) from CIF server.
* **Get Application Info** (*Enrichment*) - OPSWAT MetaAccess application information.
* **Scan File** (*Enrichment*) - Scanning a file by file upload and retrieve scan status and results after uploading a file.
* **Detonate File** (*Enrichment*) - Scan with sandbox and get the result of the sandbox scan (Dynamic analysis).
* **Get Hash Report** (*Enrichment*) - Look up a hash by MD5, SHA1, or SHA256.

## Configure Opswat Metadefender in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/opswat-metadefender-configuration.png')} style={{border:'1px solid gray'}} alt="Opswat Metadefender configuration" width="400"/>

For information about Opswat Metadefender, see [Opswat Metadefender documentation](https://www.opswat.com/docs/mdcore).

## Change Log

* May 11, 2021 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
