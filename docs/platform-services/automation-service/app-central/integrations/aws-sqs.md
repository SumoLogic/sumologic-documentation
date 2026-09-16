---
title: AWS SQS
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.3  
Updated: August 19, 2025***

Using the integration with SQS, you can gather current queues, add a new queue, delete and purge existing queues during an active investigation.

## Actions

* **List Queues** (*Enrichment*) - List of all queues (Max 1,000 queues).
* **Get Queue URL** (*Enrichment*) - Returns the URL of an existing Amazon SQS queue.
* **Create Queue** (*Containment*) - Creates a new standard or FIFO queue.
* **Delete Queue** (*Containment*) - Deletes the queue specified by the *QueueUrl*, regardless of the queue's contents.
* **Purge Queue** (*Containment*) - Deletes the messages in a queue specified by the *QueueURL* parameter.
* **Send Message** (*Notification*) - Delivers a message to the specified queue.

## External Libraries

* [AWS SQS](https://github.com/boto/boto3/blob/develop/LICENSE)

## Configure AWS SQS in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationsAuthAWS from '../../../../reuse/integrations-authentication-aws.md';
import AWSRegions from '../../../../reuse/automation-service/aws/region.md';
import AWSAccesskey from '../../../../reuse/automation-service/aws/access-key.md';
import AWSSecret from '../../../../reuse/automation-service/aws/secret.md';
import AWSIAMRole from '../../../../reuse/automation-service/aws/iam-role.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';
import IAMConfiguration from '../../../../reuse/automation-service/aws/iam-configuration.md';

<IntegrationsAuth/>

* <IntegrationLabel/>
* <AWSAccesskey/>
* <AWSSecret/>
* <AWSIAMRole/>
* <AWSRegions/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-sqs-configuration.png')} style={{border:'1px solid gray'}} alt="AWS SQS configuration" width="400"/>

For information about AWS SQS, see [SQS documentation](https://docs.aws.amazon.com/sqs/).

<IntegrationsAuthAWS/>

### AWS IAM role-based access

<IAMConfiguration/>

## Limitations

Local [Automation Bridge](/docs/platform-services/automation-service/automation-service-bridge/) is not supported in this version.

## Required Permissions
```
  sqs:ListQueues
  sqs:GetQueueUrl
  sqs:CreateQueue
  sqs:DeleteQueue
  sqs:PurgeQueue
  sqs:SendMessage
```

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.3 | August 19, 2025 | Added support for IAM role authentication. Users can now authenticate using an AWS IAM Role in addition to access key–based authentication. |
| v1.2 | June 15, 2023 | Updated the integration with Environmental Variables. |
| | March 10, 2022 | Updated the logo in AWS SQS integration. |
| | January 16, 2020 | Initial release of the AWS SQS integration. |
