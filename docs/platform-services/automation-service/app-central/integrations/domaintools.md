---
title: DomainTools
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/domaintools.png')} alt="domaintools" width="100"/>

***Version: 1.2  
Updated: Jun 14, 2023***

DomainTools is the global leader for internet intelligence and the first place security practitioners go when they need to know. The world's most advanced security teams use our solutions to identify external risks, investigate threats, and proactively protect their organizations in a constantly evolving threat landscape. DomainTools constantly monitors the Internet and brings together the most comprehensive and trusted domain, website and DNS data to provide immediate context and machine-learning driven risk analytics delivered in near real-time. Visit domaintools.com to experience firsthand why DomainTools is the first stop for advanced security teams when they need to know.  

## Actions

* **Domain Reputation** (*Enrichment*) - Get domain reputation.
* **Email Reputation** (*Enrichment*) - Get email address reputation.
* **IP Reputation** (*Enrichment*) - Get IP address reputation.

## External Libraries

[DomainTools Python API](https://github.com/DomainTools/python_api/blob/master/LICENSE)

## Category

Threat Intelligence-Reputation

## Configure DomainTools in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Username**. Enter the username of a DomainTools admin user authorized to provide authentication for the integration. 

* **API Key**. Enter a DomainTools API key.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/domaintools-configuration.png')} style={{border:'1px solid gray'}} alt="DomainTools configuration" width="400"/>

For information about DomainTools, see [DomainTools documentation](https://docs.domaintools.com/).

## Change Log

* December 19, 2018 - First upload
* March 15, 2023 (v1.1)
	+ Updated integration: (Updated the integration Fields with Environmental Variables and improved error handling)
* June 14, 2023 (v1.2) - Updated the integration with Environmental Variables
