---
title: Delinea
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/delinea.png')} alt="Delinea icon" width="80"/>

***Version: 1.0  
Updated: Apr 20, 2026***

Delinea Secret Server is an enterprise-grade password management solution designed to help organizations securely store, manage, and control access to privileged credentials.
It aims to improve the security of sensitive data, reduce the risk of data breaches, and streamline the password management process.

## Actions

* **Get Secret Details** (*Enrichment*) - Retrieve the details of a specific secret from Delinea Secret Server.
* **Check in Secret** (*Containment*) - Check in a specific secret to Delinea Secret Server, making it available for use again.
* **Check out Secret** (*Containment*) - Check out a specific secret from Delinea Secret Server, preventing others from using it until it is checked back in.
* **Expire Secret** (*Containment*) - Expire a specific secret in Delinea Secret Server, rendering it invalid for future use.
* **Delete Secret** (*Containment*) - Delete a specific secret from Delinea Secret Server, permanently removing it from the system.


## Configure Delinea in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
<IntegrationLabel/>

* **API URL**. Enter your [Delinea API URL](https://updates.thycotic.net/secretserver/restapiguide), for example, `https://<domain>.secretservercloud.com/`.

* **Client ID**. Enter your client ID, which is the unique identifier for your Delinea application. You can find this in your Delinea account settings or application dashboard.
* **Client Secret**. Enter your client secret, which is a confidential key used to authenticate your application with Delinea. This can also be found in your Delinea account settings or application dashboard.

* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/Delinea-configurations.png')} style={{border:'1px solid gray'}} alt="Delinea-configuration" width="400"/>


For information about Delinea, see [Delinea documentation](https://updates.thycotic.net/secretserver/restapiguide).

## Change Log

* April 20, 2026 - First upload