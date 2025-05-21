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
import IntegrationsAuthAWS from '../../../../reuse/integrations-authentication-aws.md';
import AWSRegions from '../../../../reuse/automation-service/aws/region.md';
import AWSAccesskey from '../../../../reuse/automation-service/aws/access-key.md';
import AWSSecret from '../../../../reuse/automation-service/aws/secret.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>

* <IntegrationLabel/>
* <AWSAccesskey/>
* <AWSSecret/>
* **Session Token**. Enter the session token if you are using [temporary credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_use-resources.html).
* <AWSRegions/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-private-certificate-authority-configuration.png')} style={{border:'1px solid gray'}} alt="AWS Private Certificate Authority configuration" width="400"/>

<IntegrationsAuthAWS/>

For information about AWS Private Certificate Authority, see [AWS Private Certificate Authority documentation](https://docs.aws.amazon.com/privateca/).

## Change Log
 
* March 8, 2024 - First upload
