---
title: AWS SQS
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.2  
Updated: Jun 15, 2023***

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

<IntegrationsAuth/>

For information about AWS SQS, see [SQS documentation](https://docs.aws.amazon.com/sqs/).

## Change Log

* January 16, 2020 - First upload
* March 10, 2022 - Logo
* June 15, 2023 (v1.2) - Updated the integration with Environmental Variables
