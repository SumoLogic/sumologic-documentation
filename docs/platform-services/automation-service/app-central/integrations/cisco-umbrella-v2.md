---
title: Cisco Umbrella V2
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cisco-umbrella-v2.png')} alt="cisco-umbrella-v2" width="70"/>

***Version: 1.3  
Updated: Jul 03, 2023***

**Cisco Umbrella** is cloud-delivered enterprise network security which provides users with defense against cybersecurity threats.

## Actions

* **List Destination Lists** (*Enrichment*) - Get the Destination Lists.
* **Create Destination List** (*Containment*) - Create a Destination List.
* **List Users** (*Enrichment*) - List the users in the organization.

## Configure Cisco Umbrella V2 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter the the API URL for your Cisco Umbrella V2 instance, for example, `https://api.umbrella.com`

* **API Key**. Enter an [API key](https://developer.cisco.com/docs/cloud-security/umbrella-api-authentication/) for Cisco Umbrella V2.

* **API Secret**. Enter the secret for the API key.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cisco/cisco-umbrella-v2-configuration.png')} style={{border:'1px solid gray'}} alt="Cisco Umbrella V2 configuration" width="400"/>

For information about Cisco Umbrella, see [Cisco Umbrella documentation](https://developer.cisco.com/docs/cloud-security/umbrella-api-authentication/).

## Change Log

* September 25, 2019 - First upload
* January, 26, 2023 - Integration refactored
* May 18, 2023 (v1.2)
	+ The integration previously known as "**CISCO Umbrella OIF**" has been renamed to "**Cisco Umbrella V2**"
* July 3, 2023 (v1.3) - Removed leading/trailing spaces
