---
title: Imperva WAF
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/imperva-waf.png')} alt="intelligence" width="80"/>

***Version: 1.1  
Updated: Jun 26, 2023***

Imperva WAF offers web application security firewall, providing protection against the most sophisticated security threats. As a cloud-based WAF, it ensures that your website is always protected against any type of application layer hacking attempt.

## Actions

* **List Sites** *(Enrichment)* - Retrieves a list of all sites.

## Configure Imperva WAF in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter the Imperva WAF URL, for example, `https://my.imperva.com/`

* **API ID**. Enter an Imperva WAF [API ID](https://docs.imperva.com/bundle/cloud-application-security/page/settings/api-keys.htm).

* **API Key**. Enter the key associated with the API ID.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/imperva-waf-configuration.png')} style={{border:'1px solid gray'}} alt="Imperva WAF configuration" width="400"/>

For information about Imperva WAF, see [Imperva documentation](https://docs.imperva.com/).

## Change Log

* October 28, 2022 - First upload
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
