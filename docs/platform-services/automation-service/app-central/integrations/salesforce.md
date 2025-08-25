---
title: Salesforce
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/salesforce.png')} alt="salesforce" width="70"/>

***Version: 1.2  
Updated: Jun 22, 2023***

Query data and utilize actions in Salesforce.

## Actions

* **Create Account Record** *(Containment)* - Create a record for a specific account.
* **Get Account Details** *(Enrichment)* - Get details for an account.
* **Get Campaign Details** *(Enrichment)* - Get details for a specific campaign.
* **Get Contact Details** *(Enrichment)* - Get details for a contact.
* **Get Lead Details** *(Enrichment)* - Get details for a lead.
* **Get List Objects** *(Enrichment)* - Get list of objects.
* **Send Email** *(Containment)* - Send an email.
* **String Search** *(Enrichment)* - Search for a specific string.
* **Update Account Record** *(Containment)* - Update a record for an account.

## Configure Salesforce in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Host**. Enter your Salesforce [host URL](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest_resources.htm), for example, `https://login.salesforce.com/`.

* **Client ID**. Enter a Salesforce [client ID](https://help.salesforce.com/s/articleView?id=cc.b2c_generate_api_client_id.htm&type=5).

* **Client Secret**. Enter the secret corresponding to the client ID.

* **User Email**. Enter the email used for login by a [Salesforce admin user](https://help.salesforce.com/s/articleView?id=platform.integration_user.htm&type=5). This email will provide authentication for the integration.

* **Password**. Enter the password of the admin user.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/salesforce-configuration.png')} style={{border:'1px solid gray'}} alt="Salesforce configuration" width="400"/>

For information about Salesforce, see [Salesforce documentation](https://help.salesforce.com/s/products).

## Change Log

* August 17, 2021 - First upload
* June 22, 2023 (v1.1) - Updated the integration with Environmental Variables
* June 22, 2023 (v1.2) - Changed Send Email action type to Notification
