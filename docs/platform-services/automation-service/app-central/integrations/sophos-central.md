---
title: Sophos Central
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sophos-central.png')} alt="sophos-central" width="80"/>

***Version: 1.1  
Updated: Jul 11, 2023***

Utilize Sophos Central enrichment data during incident investigations.

## Actions

* **Get Alerts** (*Enrichment*) - Gather Sophos Central alerts.
* **Get Endpoints** (*Enrichment*) - Gather all endpoints.
* **Get Features** (*Enrichment*) - Gather all features.
* **Get Hashes** (*Enrichment*) - Gather a list of all observed hashes.
* **Get Licenses** (*Enrichment*) - Gather a list of all licenses.
* **Get Locations** (*Enrichment*) - Gather a list of all locations.
* **Get Events** (*Enrichment*) - Gather Sophos Central events.

## Configure Sophos Central in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your[ Sophos API URL](https://docs.sophos.com/central/customer/help/en-us/ManageYourProducts/GlobalSettings/APICredentials/ThirdPartyAccess/index.html), for example, `https://api.central.sophos.com`.

* **API Key**. Enter your [legacy Sophos Central API key]((https://docs.sophos.com/central/customer/help/en-us/ManageYourProducts/GlobalSettings/ApiTokenManagement/index.html)).

* **Token**. Enter your [Sophos Central token](https://docs.sophos.com/central/customer/help/en-us/ManageYourProducts/GlobalSettings/ApiTokenManagement/index.html).
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/sophos-central-configuration.png')} style={{border:'1px solid gray'}} alt="Sophos Central configuration" width="400"/>

For information about Sophos Central, see [Sophos Central documentation](https://docs.sophos.com/central/customer/help/en-us/index.html).

## Change Log

* March 6, 2020 - First upload
* July 11, 2023 (v1.1) - Updated the integration with Environmental Variables
