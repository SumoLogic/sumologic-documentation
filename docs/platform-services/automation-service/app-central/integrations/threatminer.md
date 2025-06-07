---
title: ThreatMiner
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/threatminer.png')} alt="threatminer" width="100"/>

***Version: 1.1  
Updated: Jul 13, 2023***

Search DNS records for enrichment data with Cloud SOAR integration with ThreatMiner.

## Actions

* **Search DNS Records** (*Enrichment*) - Search for DNS records.
* **Search DNS Records V2** (*Enrichment*) - Search for DNS records without saving attachments.

## Notes

* Results of DNS Record search can be saved in .csv file format.

## Configure ThreatMiner in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Enter your ThreatMiner [server URL](https://www.threatminer.org/api.php), for example, `https://api.threatminer.org/v2/`.

* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/threatminer-configuration.png')} style={{border:'1px solid gray'}} alt="ThreatMiner configuration" width="400"/>

For information about ThreatMiner, see the [ThreatMiner website](https://www.threatminer.org/index.php).

## Change Log

* June 19, 2020 - First upload
* July 13, 2023 (v1.1)
	+ Updated the integration with Environmental Variables
	+ Changed fields visibility
	+ Added new action: Search DNS Records V2
