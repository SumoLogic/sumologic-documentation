---
title: URLhaus Abuse
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/urlhaus-abuse.png')} alt="urlscan.io" width="80"/>

***Version: 1.0  
Updated: Feb 20, 2023***

Query domains, URLs, and hash values with URLhaus.

## Actions

* **Get Domain Info** (*Enrichment*) - To retrieve information about a host.
* **Get Hash Info** (*Enrichment*) - To retrieve information about a payload (*malware sample*) that URLhaus has retrieved.
* **Get URL Info** (*Enrichment*) - To retrieve information about an URL.

## Configure URLhaus Abuse in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/urlhaus-abuse-configuration.png')} style={{border:'1px solid gray'}} alt="URLhaus Abuse configuration" width="400"/>

For information about URLhause, see [URLhause documentation](https://urlhaus.abuse.ch/).

## Change Log

* April 1, 2019 - First upload
* February 20, 2023 (v1.1)
	+ Updated integration: (Updated the integration Fields with Environmental Variables)
