---
title: Anomali ThreatStream
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/anomali-threatstream.png')} alt="anomali-threatstream" width="100"/>

***Version: 1.2  
Updated: Jun 27, 2023***

Anomali ThreatStream (previously known as ThreatStream Optic) is Threat Intelligence Management that automates the collection and processing of raw data, filters out the noise, and transforms it into relevant, actionable threat intelligence for security teams. This integration allows you to pull threat intelligence from the ThreatStream platform, import observables into ThreatStream, manage threat model entities and investigations, and so on.

* **Search Into Observables** (*Enrichment*) - To retrieve threat intelligence from ThreatStream.
* **Add Observable** (*Containment*) - To import structured threat data (observables) into ThreatStream, without requiring approval of the imported data through the ThreatStream UI.
* **Update Observable Tags** (*Containment*) - Enables you to add observable tags in bulk.

## Configure Anomali ThreatStream in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>

* <IntegrationLabel/>
* **API URL**. Enter the Anomali ThreatStream API URL. The default value is `https://api.threatstream.com` 

* **Username**. Enter the username of the Anomali ThreatStream admin user authorized to provide authentication for the integration.

* **API Key**. Enter an Anomali ThreatStream API key.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/anomali/anomali-threatstream-configuration.png')} style={{border:'1px solid gray'}} alt="Anomali configuration" width="400"/>

For information about Anomali ThreatStream, see [Anomali documentation](https://www.anomali.com/resources).

## Change Log

* November 10, 2022 - First upload
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
* June 27, 2023 (v1.2) - Removed leading/trailing spaces
