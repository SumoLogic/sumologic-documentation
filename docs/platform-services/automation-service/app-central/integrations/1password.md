---
title: 1Password
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/1Password.png')} alt="1password" width="80"/>

***Version: 1.1  
Updated: Mar 17, 2026***

1Password's User Management API using OAuth2 authentication. It supports user management operations including listing, retrieving, suspending, and reactivating users.

## Actions

* **List Users** *(Enrichment)* - Retrieves a list of all users in the 1Password account.
* **Get User** *(Enrichment)* - Retrieves detailed information about a specific user.
* **Suspend User** *(Containment)* - Suspends a user account in 1Password.
* **Reactivate User** *(Containment)* - Reactivates a previously suspended user account.

## 1Password configuration

1. Login to your 1Password Portal.
2. Go to **Integrations** > **Create OAuth2 Client**.
3. Enter the name of the OAuth2 client, for example, `Cloud SOAR Integration`.
4. In the **Redirect URI** field, for example, `https://<url>/auth/callback`.
5. Click **Create** to create the OAuth2 client.
6. After the client is created, note down the **Client ID** and **Client Secret**.
7. Make sure the OAuth2 client has the following permissions:
   * `Get users`
   * `List users`
   * `Suspend users`
   * `Reactivate users`
8. Find the **Account UUID**.

## Configure 1Password in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API Base URL**. Enter your 1Password API URL, for example, `https://api.1password.com`

* **Client ID**. Enter the Client ID.
* **Client Secret**. Enter the Client Secret.
* **Account UUID**. Enter the Account UUID.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/1password/1password-configuration.png')} style={{border:'1px solid gray'}} alt="1Password configuration" width="400"/> 

For information about 1Password, see [1Password documentation](https://support.1password.com/).

## Category

Identity and Access Management

## Change Log

* **Mar 17, 2026** - First Upload.