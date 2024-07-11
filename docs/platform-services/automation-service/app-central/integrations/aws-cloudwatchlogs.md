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

## Change Log

* October 16, 2019 - First upload
* March 10, 2022 - Logo
* June 15, 2023 (v1.2) - Updated the integration with Environmental Variables
