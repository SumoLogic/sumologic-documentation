---
title: Sumo Logic Rules Tuning
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sumo-logic.png')} alt="sumo-logic-cloud-siem" width="100"/>

***Version: 1.0  
Updated: Mar 4, 2026***


Rule tuning expressions are a powerful feature, allowing users to extend a rule’s match expression by appending additional match logic. This enables extending rules without having to duplicate an existing rule for customization, also missing out on possible future improvements from the Sumo Logic Threat Labs team; this feature is a key tool in customizing Sumo Logic’s OOTB rules to individual organizations.

## Actions

* **Create Rule Tuning Expression** *(Containment)* - Create a Rule Tuning Expression.
* **Delete Rule Tuning Expression** *(Containment)* - Delete a Rule Tuning Expression.
* **Get Rule Tuning Expression** *(Enrichment)* - Get a Rule Tuning Expression.
* **Update Rule Tuning Expression** *(Containment)* - Update a Rule Tuning Expression.


## Sumo Logic Rules Tuning configuration

[Create an access key](/docs/manage/security/access-keys/#create-an-access-key) and copy the resulting **Access ID** and **Access Key**. Store the ID and access key (temporally) into a text editor.

:::note
The ID and key won't be available again once you close the confirmation screen.
:::

## Configure Sumo Logic Rules Tuning in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';
import SumoLogicAPIURL from '../../../../reuse/automation-service/sumo-logic-api-url.md';
import CloudSOARAPIURL from '../../../../reuse/automation-service/cloud-soar-api-url.md';
import AccessID from '../../../../reuse/automation-service/access-id.md';
import AccessKey from '../../../../reuse/automation-service/access-key.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* <SumoLogicAPIURL/>
* <AccessID/>
* <AccessKey/>
* <IntegrationTimeout/>
* <IntegrationCertificate/>

* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/sumo-logic-rules-tuning-configuration.png')} style={{border:'1px solid gray'}} alt="Sumo Logic Cloud SIEM configuration" width="400"/>

For detailed API documentation, see [Sumo Logic APIs](/docs/api/).

## Category

SIEM

## Change Log

* March 4, 2026 - First Upload
