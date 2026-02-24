---
title: CyberArk AAM
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cyberark-aam.png')} alt="cyberark-aam" width="100"/>

***Version: 1.2  
Updated: Jul 18, 2023***

CyberArk Application Access Manager interaction for widely used application types and non-human identities. CyberArk AAM is a credentials retrieval integration. 

## Actions

* **Update Certificate** (one required field: Upload file).
* **Get Application Details** (4 required fields: APP ID, Safe, Folder, Object).

## Configure CyberArk AAM in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>

* **Server**. Enter the API URL in the form `https://<IIS_Server_Ip>` where `<IIS_Server_Ip>` is the IP address or domain name of your CyberArk AAM server.

 * **Certificate**. Enter the client certificate in Base64 encoded format. This certificate contains your public key and is used to authenticate your identity to the server. If you have a combined .pem file that includes both the Certificate and the Private Key, use this field. Field requirement conditional on CyberArk.

* **Key**. Enter the client private key in Base64 encoded format. Keep your private key confidential. It is used to securely authenticate and establish an encrypted connection. If your Private Key is included in the combined Client Certificate .pem file, leave this field empty. Field requirement conditional on CyberArk.

* **Root**. Enter the root CA certificate in Base64 encoded format. Required if your server uses a certificate not trusted by default by your system or browser. This root certificate establishes trust with the server's SSL/TLS certificate.
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cyberark-pam/cyberark-aam-configuration.png')} style={{border:'1px solid gray'}} alt="CyberArk AAM configuration" width="400"/>

For information about CyberArk, see [CyberArk documentation](https://docs.cyberark.com/portal/latest/en/docs.htm). For information about CyberArk APIs, see their [REST APIs documentation](https://docs.cyberark.com/pam-self-hosted/latest/en/content/webservices/implementing%20privileged%20account%20security%20web%20services%20.htm).

## Change Log

* October 5, 2020 - First upload
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
* July 18, 2023 (v1.2) - Code refactoring
