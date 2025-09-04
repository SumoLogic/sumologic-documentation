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
* <AWSRegions/>
* **URL**. Enter your [AWS CloudWatch Logs URL](https://docs.aws.amazon.com/general/latest/gr/cwl_region.html), for example, `logs.us-east-1.amazonaws.com`.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-cloudwatchlogs-configuration.png')} style={{border:'1px solid gray'}} alt="AWS CloudWatch Logs configuration" width="400"/>

<IntegrationsAuthAWS/>

For information about AWS CloudWatch Logs, see [CloudWatch Logs documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html).

## Change Log

* October 16, 2019 - First upload
* March 10, 2022 - Logo
* June 15, 2023 (v1.2) - Updated the integration with Environmental Variables
