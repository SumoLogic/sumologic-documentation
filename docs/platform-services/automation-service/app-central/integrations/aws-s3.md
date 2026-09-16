---
title: AWS S3
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.4  
Updated: May 08, 2026***

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
* **URL**. Enter your [Amazon S3 URL](https://docs.aws.amazon.com/general/latest/gr/s3.html), for example, `s3.us-east-1.amazonaws.com`.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-s3-configuration.png')} style={{border:'1px solid gray'}} alt="AWS S3 configuration" width="400"/>

<IntegrationsAuthAWS/>

### AWS IAM role-based access

<IAMConfiguration/>

## Limitations

Local [Automation Bridge](/docs/platform-services/automation-service/automation-service-bridge/) is not supported in this version.

## Required Permissions
```
  s3:GetBucketPolicy
  s3:ListBucket
  s3:ListAllMyBuckets
  s3:GetObject
  s3:PutObject
  s3:CreateBucket
  s3:DeleteBucket
  s3:DeleteBucketPolicy
  s3:DeleteObject
  s3:PutBucketPolicy
```

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.4 | May 08, 2026 | <ul><li>Fixed inverted `ConfirmRemoveSelfBucketAccess` logic in the **Put Bucket Policy** action.</li><li>Made Location Constraint optional in the **Create Bucket** action, defaulting to the configured integration region.</li><li>Added proper JSON output for the **Create Bucket**, **Delete Bucket**, **Delete Bucket Policy**, **Delete Object From Bucket**, **Put Bucket Policy**, and **Upload File To S3 Object** actions.</li><li>Updated the region list, removing the legacy `EU` alias and adding missing regions.</li></ul> |
| v1.3 | August 19, 2025 | <ul><li>Added IAM Role Support. Users can now authenticate using an AWS IAM Role in addition to access key–based authentication.</li><li>Added input validation in the **Download File** action.</li></ul> |
| v1.2 | June 28, 2023 | Changed the visibility of the Resource fields. |
| v1.1 | June 21, 2023 | Updated the integration with Environmental Variables. |
| v1.0 | October 3, 2019 | Initial release of the AWS S3 integration. |
