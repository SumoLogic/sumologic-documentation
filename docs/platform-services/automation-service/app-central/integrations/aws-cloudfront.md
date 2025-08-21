---
title: AWS CloudFront
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.4  
Updated: July 29, 2025***

Amazon CloudFront integrates with AWS Identity and Access Management (IAM), a service that lets your organization do the following:

* Create users and groups under your organization's AWS account.
* Easily share your AWS account resources among the users in the account.
* Assign unique security credentials to each user.
* Granularly control user access to services and resources.

## Actions

* **List Origin Access Identities** (*Enrichment*) - Lists origin access identities.
* **Get Origin Access Identity** (*Enrichment*) - Get the information about an origin access identity.

## Configure AWS CloudFront in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationsAuthAWS from '../../../../reuse/integrations-authentication-aws.md';
import IAMConfiguration from '../../../../reuse/automation-service/aws/iam-configuration.md';
import AWSRegions from '../../../../reuse/automation-service/aws/region.md';
import AWSAccesskey from '../../../../reuse/automation-service/aws/access-key.md';
import AWSSecret from '../../../../reuse/automation-service/aws/secret.md';
import AWSIAMRole from '../../../../reuse/automation-service/aws/iam-role.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>

* <IntegrationLabel/>
* <AWSRegions/>
* **Service Name**. Enter `AWS CloudFront`.
* <AWSAccesskey/>
* <AWSSecret/>
* <AWSIAMRole/>
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-cloudfront-configuration.png')} style={{border:'1px solid gray'}} alt="AWS CloudFront configuration" width="400"/>

For information about AWS CloudFront, see [CloudFront documentation](https://docs.aws.amazon.com/cloudfront/).

<IntegrationsAuthAWS/>

### AWS IAM role-based access

<IAMConfiguration/>

## Required Permissions
```
  cloudfront:ListCloudFrontOriginAccessIdentities
  cloudfront:GetCloudFrontOriginAccessIdentity
```

## Change Log

* November 10, 2022 - First upload
* April 14, 2023 (v1.1)
	+ Updated integration: (Updated the integration Fields with Environmental Variables)
* June 15, 2023 (v1.3) - Updated the integration with Environmental Variables
* July 29, 2025 (v1.4) - Added support for IAM role authentication - Users can now authenticate using an AWS IAM Role in addition to access key–based authentication.
