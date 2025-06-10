---
title: Stellar Cyber Starlight
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/stellar-cyber-starlight.png')} alt="stellar-cyber-starlight" width="100"/>

***Version: 1.1  
Updated: Jul 03, 2023***

Query Starlight events during active incident investigations with Cloud SOAR tegration with Stellar Cyber Starlight.

## Actions

* **Search Into Events Starlight** (*Enrichment*) - Search into Starlight events.

## Configure Stellar Cyber Starlight in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **IP/Hostname**. Enter your Stellar Cyber Starlight host address.

* **Port**. Enter your Stellar Cyber Starlight [port](https://docs.stellarcyber.ai/prod-docs/5.1.x/Configure/Ports/Firewall-Ports-for-Parsers.htm). 

* **Index**. Enter your Stellar Cyber Starlight [index](https://docs.stellarcyber.ai/5.1.1/Common/Understanding-Indices.htm).

* **Username**. Enter the username of a Stellar Cyber Starlight admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/stellar-cyber-starlight-configuration.png')} style={{border:'1px solid gray'}} alt="Stellar Cyber Starlight configuration" width="400"/>

For information about Stellar Cyber, see [Stellar Cyber documentation](https://docs.stellarcyber.ai/5.3.x/Home.htm).

## Change Log

* September 3, 2020 - First upload
* July 3, 2023 (v1.1) - Updated the integration with Environmental Variables
