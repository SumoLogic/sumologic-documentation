---
title: Neustar IP GeoPoint
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/neustar-ip-geopoint.png')} alt="neustar-ip-geopoint" width="100"/>

***Version: 1.1  
Updated: Jun 26, 2023***

IP GeoPoint to gain independent, real-time insights into each website or network visitor as they connect, based only on the IP address of their device. Designed for use in decisioning workflows, the data includes invaluable information about the location of the user – in many cases down to the postal code – as well as insights into how they are connecting to the Internet and the organization responsible for the IP address.

## Actions

* **Geolocate IP Address** *(Enrichment)* - Get the location of the provided IP Address.

## Configure Neustar IP GeoPoint in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API Key**. Enter a Neustar IP GeoPoint API key.

* **Secret Key**. Enter the secret corresponding to the API key.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/neustar-configuration.png')} style={{border:'1px solid gray'}} alt="Neustar configuration" width="400"/>

For information about Neustar, see the [Neustar website](https://www.home.neustar/).

## Change Log

* April 19, 2022 - First upload
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
