---
title: AWS S3
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.2  
Updated: Jun 28, 2023***

Interact with AWS S3 buckets, objects, and policies.

## Actions

* **Bucket Policy** (*Enrichment*) - Applies an Amazon S3 bucket policy to an Amazon S3 bucket.
* **Download File** (*Enrichment*) - Download S3 bucket file.
* **List Buckets** (*Enrichment*) - List S3 buckets.
* **List Objects** (*Enrichment*) - List all objects in an S3 bucket.
* **Create Bucket** (*Containment*) - Create a new S3 bucket.
* **Delete Bucket** (*Containment*) - Delete an existing S3 bucket.
* **Delete Bucket Policy** (*Containment*) - Delete an S3 bucket policy.
* **Delete Object From Bucket** (*Containment*) - Delete an object from an S3 bucket.
* **Put Bucket Policy** (*Containment*) - Assign a policy to an S3 bucket.
* **Upload File To S3 Object** (*Containment*) - Upload a file to an S3 object.

## External libraries

* [AWS S3](https://github.com/boto/boto3/blob/develop/LICENSE)

## Configure AWS S3 in Automation Service and Cloud SOAR

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
* **URL**. Enter your [Amazon S3 URL](https://docs.aws.amazon.com/general/latest/gr/s3.html), for example, `s3.us-east-1.amazonaws.com`.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-s3-configuration.png')} style={{border:'1px solid gray'}} alt="AWS S3 configuration" width="400"/>

<IntegrationsAuthAWS/>

## Change Log

* October 3, 2019 - First upload
* June 21, 2023 (v1.1) - Updated the integration with Environmental Variables
* June 28, 2023 (v1.2) - Visibility of the Resource fields changed
