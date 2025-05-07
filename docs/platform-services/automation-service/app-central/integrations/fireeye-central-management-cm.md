---
title: FireEye Central Management (CM)
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/fireeye-central-management-cm.png')} alt="fireeye-central-management-cm" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Centralized device and intelligence management to correlate data across attack vectors.

## Actions

* **Get Alert Info** (*Enrichment*) - Query FireEye CM for alert details.
* **Get ATI Details** (*Enrichment*) - Query FireEye Advanced Threat Intelligence for intelligence data.
* **Get Event Info** (*Enrichment*) - Get information from previously generated event.
* **Add Snort Rule** (*Containment*) - Add a new Snort rule.
* **Add YARA Rule** (*Containment*) - Add a new YARA rule.
* **Acknowledge Alert** (*Containment*) - Notate previously generated alert.

## Configure FireEye Central Management (CM) in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Trellix Central Management (formerly FireEye Central Management), see [Trellix documentation](https://docs.trellix.com/bundle/fx_10.0.x_sag/page/UUID-feae882c-4d05-175b-652f-f7c504e95bb4.html).

## Change Log

* June 21, 2019 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
