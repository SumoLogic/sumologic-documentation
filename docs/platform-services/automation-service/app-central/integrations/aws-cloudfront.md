---
title: AWS CloudFront
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.3  
Updated: Jun 15, 2023***

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
import AWSRegion from '../../../../reuse/automation-service/aws/region.md';
import AWSAccesskey from '../../../../reuse/automation-service/aws/access-key-and-secret.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>

<IntegrationLabel/>
<AWSRegion/>
* **Service Name**. Enter `AWS CloudFront`.
<AWSAccesskey/>
<IntegrationTimeout/>
<IntegrationCertificate/>
<IntegrationEngine/>
<IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-cloudfront-configuration.png')} style={{border:'1px solid gray'}} alt="AWS CloudFront configuration" width="400"/>

<IntegrationsAuthAWS/>

For information about AWS CloudFront, see [CloudFront documentation](https://docs.aws.amazon.com/cloudfront/).

## Change Log

* November 10, 2022 - First upload
* April 14, 2023 (v1.1)
	+ Updated integration: (Updated the integration Fields with Environmental Variables)
* June 15, 2023 (v1.3) - Updated the integration with Environmental Variables
