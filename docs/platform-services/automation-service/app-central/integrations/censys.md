---
title: Censys
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/censys.png')} alt="censys" width="100"/>

***Version: 1.1  
Updated: Jul 11, 2023***

Search Censys for enrichment data during active investigation.

## Actions

* **Search IP** (*Enrichment*) - Gather information about a specific IP address.
* **Search URL** (*Enrichment*) - Gather information about a specific URL.
* **Search Certificate** (*Enrichment*) - Gather information about a specific certificate.
* **View IP** (*Enrichment*) - Gather greater detailed data on a specific IP address.
* **View URL** (*Enrichment*) - Gather greater detailed data on a specific website.
* **View Certificate** (*Enrichment*) - Gather greater detailed data on a specific certificate.

## Configure Censys in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/censys-v2/censys-configuration.png')} style={{border:'1px solid gray'}} alt="Censys configuration" width="400"/>

For information about Censys, see [Censys documentation](https://docs.censys.com/docs).

## Change Log

* January 31, 2020 - First upload
* July 11, 2023 (v1.1) - Updated the integration with Environmental Variables
