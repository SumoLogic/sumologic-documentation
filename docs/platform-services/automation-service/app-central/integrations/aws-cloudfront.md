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

<IntegrationsAuth/>

* **Label**. Enter the name you want to use for the resource.
* **AWS Region**. Enter your [AWS region](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html).
* **Service Name**. Enter `AWS CloudFront`.
* **Access Key ID**. Enter an [access key ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) to provide authentication. (Although AWS recommends using IAM roles with temporary security credentials instead of access keys, our AWS integrations currently support only access keys due to the need for dynamically managed credentials.)
* **Secret Access Key**. Enter the secret access key associated with the access key ID.
* **Connection Timeout (s)**. Enter the connection timeout time in minutes (for example, `1`). If connection is not made in the alloted time, then the connection is terminated.
* **Automation Engine**. Select whether to use [Cloud or Bridge execution](/docs/platform-services/automation-service/automation-service-integrations/#cloud-or-bridge-execution).

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-cloudfront-configuration.png')} style={{border:'1px solid gray'}} alt="AWS CloudFront configuration" width="400"/>

import IntegrationsAuthAWS from '../../../../reuse/integrations-authentication-aws.md';

<IntegrationsAuthAWS/>

For information about AWS CloudFront, see [CloudFront documentation](https://docs.aws.amazon.com/cloudfront/).

## Change Log

* November 10, 2022 - First upload
* April 14, 2023 (v1.1)
	+ Updated integration: (Updated the integration Fields with Environmental Variables)
* June 15, 2023 (v1.3) - Updated the integration with Environmental Variables
