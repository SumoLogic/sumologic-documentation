---
title: AWS CloudTrail
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.2  
Updated: Jun 15, 2023***

Interact with AWS CloudTrail through Trails and Events.

## Actions

* **Describe Trails** (*Enrichment*) - Retrieves settings for the trail associated with the current region for an AWS account.
* **Lookup Events** (*Enrichment*) - Looks up management events captured by CloudTrail.
* **Create Trail** (*Enrichment*) - Creates a trail that specifies the settings for delivery of log data to an Amazon S3 bucket.
* **Delete Trail** (*Containment*) - Deletes a trail.
* **Start Logging** (*Enrichment*) - Starts the recording of AWS API calls and log file delivery for a trail.
* **Stop Logging** (*Enrichment*) - Suspends the recording of AWS API calls and log file delivery for the specified trail.
* **Update Trail** (*Enrichment*) - Updates the settings that specify delivery of log files.
* **List Trail** (*Enrichment*) - Lists trails that are in the current account.

## External Libraries

* [AWS CloudTrail](https://github.com/boto/boto3/blob/develop/LICENSE)

## Configure AWS CloudTrail in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

* **Label**. Enter the name you want to use for the resource.
* **Access Key ID**. Enter an [access key ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) to provide authentication. (Although AWS recommends using IAM roles with temporary security credentials instead of access keys, our AWS integrations currently support only access keys due to the need for dynamically managed credentials.)
* **Secret Access Key**. Enter the secret access key associated with the access key ID.
* **Region**. Enter your [AWS region](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html).
* **Connection Timeout (s)**. Enter the connection timeout time in seconds (for example, `180`). If connection is not made in the allotted time, then the connection is terminated.
* **Verify Server Certificate**. Select to verify that the [server certificate](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_server-certs.html) is valid.
* **Automation Engine**. Select whether to use [Cloud or Bridge execution](/docs/platform-services/automation-service/automation-service-integrations/#cloud-or-bridge-execution).
* **Proxy Options**. Select whether to use an [AWS proxy](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-proxy.html). 

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-cloudtrail-configuration.png')} style={{border:'1px solid gray'}} alt="AWS CloudTrail configuration" width="400"/>

import IntegrationsAuthAWS from '../../../../reuse/integrations-authentication-aws.md';

<IntegrationsAuthAWS/>

For information about AWS CloudTrail, see [CloudTrail documentation](https://docs.aws.amazon.com/cloudtrail/).

## Change Log

* October 1, 2019 - First upload
* March 10, 2022 - Logo
* May 12, 2023 (v1.1) - Integration refactored
* June 15, 2023 (v1.2) - Updated the integration with Environmental Variables
