---
title: AWS CloudWatchLogs
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.2  
Updated: Jun 15, 2023***

Interact with AWS CloudWatch through Groups, Streams, Metric Filters, and Retention Policies.

## Actions

* **Describe Log Groups** (*Enrichment*) - Lists the specified log groups.
* **Describe Log Streams** (*Enrichment*) - Lists the specified log groups.
* **Describe Metric Filter** (*Enrichment*) -Lists the specified metric filters.
* **Filter Log Events** (*Enrichment*) - Lists log events from the specified log group.
* **Create Log Group** (*Containment*) - Creates a log group with the specified name.
* **Create Log Stream** (*Containment*) - Creates a log stream for the specified log group.
* **Put Log Events** (*Containment*) - Uploads a batch of log events to the specified log stream.
* **Put Metric Filter** (*Containment*) - Creates or updates a metric filter and associates it with the specified log group.
* **Put Retention Policy** (*Containment*) - Sets the retention of the specified log group.
* **Delete Log Group** (*Containment*) - Deletes the specified log group and permanently deletes all the archived log events associated with the log group.
* **Delete Log Stream** (*Containment*) - Deletes the specified log stream and permanently deletes all the archived log events associated with the log stream.
* **Delete Metric Filter** (*Containment*) - Deletes the specified metric filter.

## External Libraries

* [AWS CloudWatch](https://github.com/boto/boto3/blob/develop/LICENSE)

## Configure AWS CloudWatch Logs in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

* **Label**. Enter the name you want to use for the resource.
* **Access Key**. Enter an [access key ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) to provide authentication. (Although AWS recommends using IAM roles with temporary security credentials instead of access keys, our AWS integrations currently support only access keys due to the need for dynamically managed credentials.)
* **Secret Key**. Enter the secret access key associated with the access key ID.
* **Region**. Enter your [AWS region](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html).
* **URL**. Enter your [AWS CloudWatch Logs URL](https://docs.aws.amazon.com/general/latest/gr/cwl_region.html), for example, `logs.us-east-1.amazonaws.com`.
* **Automation Engine**. Select whether to use [Cloud or Bridge execution](/docs/platform-services/automation-service/automation-service-integrations/#cloud-or-bridge-execution).
* **Proxy Options**. Select whether to use an [AWS proxy](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-proxy.html). 

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-cloudwatchlogs-configuration.png')} style={{border:'1px solid gray'}} alt="AWS CloudWatch Logs configuration" width="400"/>

import IntegrationsAuthAWS from '../../../../reuse/integrations-authentication-aws.md';

<IntegrationsAuthAWS/>

For information about AWS CloudWatch Logs, see [CloudWatch Logs documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html).

## Change Log

* October 16, 2019 - First upload
* March 10, 2022 - Logo
* June 15, 2023 (v1.2) - Updated the integration with Environmental Variables
