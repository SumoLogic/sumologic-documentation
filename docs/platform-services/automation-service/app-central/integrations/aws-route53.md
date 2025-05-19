---
title: AWS Route 53
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.1  
Updated: Jun 21, 2023***

Interact with DNS records through AWS Route 53.

## Actions

* **Create Record** (*Enrichment*) - Creates a resource record set that has the specified values.
* **List Hosted Zones** (*Enrichment*) - Retrieves a list of the public and private hosted zones that are associated with the current AWS account.
* **List Resource Records Sets** (*Enrichment*) - Lists the resource record sets in a specified hosted zone.
* **Test DNS Answer** (*Enrichment*) - Gets the value that Amazon Route 53 returns in response to a DNS request for a specified record name and type.
* **Delete Record** (*Containment*) - Deletes an existing resource record set that has the specified values.
* **Upsert Record** (*Containment*) - If a resource record set does not already exist, AWS creates it. If a resource set does exist, Route 53 updates it with the values in the request.

## External Libraries

* [AWS Route 53](https://github.com/boto/boto3/blob/develop/LICENSE)

## Configure AWS Route 53 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

* **Label**. Enter the name you want to use for the resource.
* **URL**. Enter your [AWS Route 53 URL](https://docs.aws.amazon.com/general/latest/gr/r53.html), for example, `route53.amazonaws.com`.
* **Access Key**. Enter an [access key ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) to provide authentication. (Although AWS recommends using IAM roles with temporary security credentials instead of access keys, our AWS integrations currently support only access keys due to the need for dynamically managed credentials.)
* **Secret Key**. Enter the secret access key associated with the access key ID.
* **Region**. Enter your [AWS region](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html).
* **Automation engine**. Select whether to use [Cloud or Bridge execution](/docs/platform-services/automation-service/automation-service-integrations/#cloud-or-bridge-execution).
* **Proxy Options**. Select whether to use an [AWS proxy](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-proxy.html).

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-route53-configuration.png')} style={{border:'1px solid gray'}} alt="AWS Route 53 configuration" width="400"/>

import IntegrationsAuthAWS from '../../../../reuse/integrations-authentication-aws.md';

<IntegrationsAuthAWS/>

For information about AWS Route 53, see [Route 53 documentation](https://docs.aws.amazon.com/route53/).

## Change Log

* December 24, 2019 - First upload
* June 21, 2023 (v1.1) - Updated the integration with Environmental Variables
