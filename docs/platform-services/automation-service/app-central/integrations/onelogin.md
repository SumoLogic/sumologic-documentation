---
title: OneLogin
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/onelogin.png')} alt="onelogin" width="100"/>

***Version: 1.5  
Updated: April 30, 2026***

OneLogin streamlines identity management, enabling secure and audited access to critical systems.  
This integration enables user management and secure app access with MFA and event monitoring.

## Actions

* **Create User** _(Containment)_ - Create a new user in OneLogin.
* **Delete User** _(Containment)_ - Permanently delete a user from OneLogin.
* **List Apps** _(Enrichment)_ - Get a list of all Apps in a OneLogin account.
* **List Enrolled Authentication Factors** _(Enrichment)_ - Get a list of authentication factors registered to a particular user for multifactor authentication (MFA).
* **List Events** _(Enrichment)_ - Get a list of events.
* **List Groups** _(Enrichment)_ - Get a list of groups that are available in your account.
* **List Roles** _(Enrichment)_ - Get a list of roles.
* **List Users** _(Enrichment)_ - Get a list of users in a OneLogin account.
* **Remove a Factor** _(Containment)_ - Remove an enrolled factor from a user.
* **Update User** _(Containment)_ - Update the attributes of a user in OneLogin.

## Configure OneLogin in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your [OneLogin URL](https://support.onelogin.com/kb/4266967/onelogin-domains-and-ip-addresses).

* **Client ID**. Enter a OneLogin [client ID](https://developers.onelogin.com/api-docs/1/getting-started/working-with-api-credentials).

* **Client Secret**. Enter the secret corresponding to the client ID.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/onelogin-configuration.png')} style={{border:'1px solid gray'}} alt="OneLogin configuration" width="400"/>

For information about OneLogin, see [OneLogin documentation](https://developers.onelogin.com/quickstart).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.5 | April 30, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.4 | March 7, 2024 | <ul><li>Added new actions: **List Enrolled Authentication Factors**, **Remove a Factor**, and **Update User**.</li><li>Renamed the **List Groups** action.</li><li>Made other minor improvements and fixes.</li></ul> |
| v1.2 | June 15, 2023 | Updated the integration with Environmental Variables. |
| v1.1 | March 1, 2021 | Initial release of the OneLogin integration. |

## Additional resources

For OneLogin, Sumo Logic offers the [OneLogin source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/onelogin-source/) and the [OneLogin app](/docs/integrations/saml/onelogin/) to collect and visualize your OneLogin data.