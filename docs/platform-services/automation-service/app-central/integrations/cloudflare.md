---
title: Cloudflare
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cloudflare.png')} alt="cloudflare" width="100"/>

***Version: 1.2  
Updated: Nov 05, 2024***

Cloudflare makes everything you connect to the Internet secure, private, fast, and reliable. With using the product you can secure your websites, APIs, and internet applications, protect corporate networks, employees, and devices.

## Actions

* **List Accounts** *(Enrichment)* - List all accounts you have ownership or verified access to.
* **List Zones** *(Enrichment)* - List your zones.
* **Validate Expression** *(Containment)* - Expression validation.
* **Create Filter** *(Containment)* - Create new filter.
* **List Filters** *(Enrichment)* - List all the filters currently defined.
* **Get Filter** *(Enrichment)* - List specified filter.
* **Update Filter** *(Containment)* - Update existing filter.
* **Create Rule List** *(Containment)* - Create a new list.
* **List Rules List** *(Enrichment)* - Get all Lists for the account.
* **Create IP List Item** *(Containment)* - Append new items to the List.
* **List List Items** *(Enrichment)* - Get all items in the List.
* **Delete List Items** *(Containment)* - Delete one or more items in a List.
* **Create Firewall Rule** *(Containment)* - Create new firewall rule.
* **List Firewall Rules** *(Enrichment)* - List all the firewall rules currently defined.
* **Get Firewall Rule** *(Enrichment)* - List specified firewall rule.
* **Update Firewall Rule** *(Containment)* - Update existing firewall rule.
* **Get Bulk Operation** *(Enrichment)* - Get the current status of an operation.

## Notes

* [Rule expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/)

## Configure Cloudflare tokens

### Cloudflare configuration for Global API key

For a [Global API Key](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/wrangler-legacy/authentication/#global-api-key):
1. Sign in in Cloudflare using your email and password.
1. Go to your profile in the left menu and select **My Profile**.
1. From the left menu select **API Tokens**.
1. Under **Global API Key** is your token.
1. Make sure you copy and save them.

### Cloudflare configuration for a custom API token

To [create a token](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/wrangler-legacy/authentication/#generate-tokens):
1. Sign in in Cloudflare using your email and password.
1. Go to your profile in the left menu and select **My Profile**.
1. From the left menu select **API Tokens**.
1. Click **Create Token** and select **Create Custom Token**.
1. Choose the necessary permissions based on your use case. For more details, check the [Permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/#account-permissions).
1. Confirm your settings, then click **Continue** and **Create Token**.
1. Copy the token securely as it will only be displayed once.

## Configure Cloudflare in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>

* <IntegrationLabel/>
* **URL**. Enter the URL for your Cloudflare instance.

* **Email**. Enter the email only when using global API token. Any valid email will work with a custom token.

* **Token Type**. Select **global** if you created a [global token](#cloudflare-configuration-for-global-api-key) above, or **custom** if created a [custom token](#cloudflare-configuration-for-a-custom-api-token). 

* **API Key**. Insert your [global or custom token](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/wrangler-legacy/authentication/#generate-tokens).
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cloudflare/cloudflare-4.png')} style={{border:'1px solid gray'}} alt="cloudflare" width="400"/>

For information about Cloudflare, see [Cloudflare documentation](https://developers.cloudflare.com/).

## Change Log

* May 5, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
* November 5, 2024 (v1.2) - Added Custom token auth in all actions
