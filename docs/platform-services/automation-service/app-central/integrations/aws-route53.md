---
title: AWS Route53
description: ''
tags: []
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.1  
Updated: Jun 21, 2023***

Interact with DNS records through AWS Route53.

## Actions

* **Create Record** (*Enrichment*) - Creates a resource record set that has the specified values.
* **List Hosted Zones** (*Enrichment*) - Retrieves a list of the public and private hosted zones that are associated with the current AWS account.
* **List Resource Records Sets** (*Enrichment*) - Lists the resource record sets in a specified hosted zone.
* **Test DNS Answer** (*Enrichment*) - Gets the value that Amazon Route 53 returns in response to a DNS request for a specified record name and type.
* **Delete Record** (*Containment*) - Deletes an existing resource record set that has the specified values.
* **Upsert Record** (*Containment*) - If a resource record set does not already exist, AWS creates it. If a resource set does exist, Route 53 updates it with the values in the request.

## External Libraries

* [AWS Route 53](https://github.com/boto/boto3/blob/develop/LICENSE)

## Change Log

* December 24, 2019 - First upload
* June 21, 2023 (v1.1) - Updated the integration with Environmental Variables
