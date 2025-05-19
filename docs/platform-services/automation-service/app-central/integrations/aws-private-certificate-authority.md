---
title: AWS Private Certificate Authority
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.0  
Updated: Mar 8, 2024***

AWS Private CA enables creation of private certificate authority (CA) hierarchies, including root and subordinate CAs, without the investment and maintenance costs of operating an on-premises CA. Your private CAs can issue end-entity X.509 certificates useful in scenarios including:

* Creating encrypted TLS communication channels
* Authenticating users, computers, API endpoints, and IoT devices
* Cryptographically signing code
* Implementing Online Certificate Status Protocol (OCSP) for obtaining certificate revocation status

## Actions

* **List Certificate Authorities** *(Enrichment)* - Lists the private certificate authorities that you created.
* **Issue Certificate** *(Containment)* - Uses your private certificate authority (CA), or one that has been shared with you, to issue a client certificate.
* **Get Certificate** *(Enrichment)* - Retrieves a certificate from your private CA or one that has been shared with you.

## External Libraries

* [AWS Private Certificate Authority](https://github.com/boto/boto3/blob/develop/LICENSE)

## Configure AWS Private Certificate Authority in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

* **Label**. Enter the name you want to use for the resource.
* **Access Key ID**. Enter an [access key ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) to provide authentication. (Although AWS recommends using IAM roles with temporary security credentials instead of access keys, our AWS integrations currently support only access keys due to the need for dynamically managed credentials.)
* **Secret Access Key**. Enter the secret access key associated with the access key ID.
* **Session Token**. Enter the session token if you are using [temporary credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_use-resources.html).
* **AWS Region**. Enter your [AWS region](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html).
* **Connection Timeout (s)**. Enter the connection timeout time in seconds (for example, `180`). If connection is not made in the alloted time, then the connection is terminated.
* **Verify Server Certificate**. Select to verify that the [server certificate](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_server-certs.html) is valid.
* **Automation engine**. Select whether to use [Cloud or Bridge execution](/docs/platform-services/automation-service/automation-service-integrations/#cloud-or-bridge-execution).
* **Proxy Options**. Select whether to use an [AWS proxy](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-proxy.html). 

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-private-certificate-authority-configuration.png')} style={{border:'1px solid gray'}} alt="AWS Private Certificate Authority configuration" width="400"/>

import IntegrationsAuthAWS from '../../../../reuse/integrations-authentication-aws.md';

<IntegrationsAuthAWS/>

For information about AWS Private Certificate Authority, see [AWS Private Certificate Authority documentation](https://docs.aws.amazon.com/privateca/).

## Change Log
 
* March 8, 2024 - First upload
