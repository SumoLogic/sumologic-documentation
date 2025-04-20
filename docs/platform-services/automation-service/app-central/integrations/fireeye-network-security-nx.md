---
title: FireEye Network Security (NX)
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/fireeye-network-security-nx.png')} alt="fireeye-network-security-nx" width="100"/>

***Version: 1.1  
Updated: Jul 03, 2023***

Advanced network security solution for network traffic analysis.

## Actions

* **Get Alert Info** (*Enrichment*) - Query FireEye NX for alert details.
* **Get ATI Details** (*Enrichment*) - Query FireEye Advanced Threat Intelligence for intelligence data.
* **Get Event Info**(*Enrichment*) - Get information from previously generated event.
* **Add Snort Rule** (*Containment*) - Add a new Snort rule.
* **Add YARA Rule** (*Containment*) - Add a new YARA rule.

## Configure FireEye Network Security in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* June 19, 2019 - First upload
* July 3, 2023 (v1.1) - Updated the integration with Environmental Variables
