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

## Change Log
 
* March 8, 2024 - First upload
