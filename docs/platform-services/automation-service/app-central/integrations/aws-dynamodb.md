---
title: AWS DynamoDB
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.0.0  
Updated: Sep 17, 2026***

Interact with [AWS DynamoDB](https://docs.aws.amazon.com/dynamodb/) tables, including retrieving table details and modifying table settings directly from automation playbooks.

## Actions

* **Describe Table** *(Enrichment)*. Returns information about a specific DynamoDB table, including its current status, provisioned throughput settings, and key schema.
* **Update Table** *(Containment)*. Modifies the provisioned throughput settings, global secondary indexes, or DynamoDB Streams settings of a specific table.

## External Libraries

* [AWS DynamoDB](https://github.com/boto/boto3/blob/develop/LICENSE)

## Configure AWS DynamoDB in Automation Service and Cloud SOAR

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
* **Authentication Type**. Select the authentication method: **Access Key + Secret Key** or **IAM Role ARN**.
* <AWSAccesskey/>
* <AWSSecret/>
* **Session Token**. Enter the session token if you are using [temporary credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_use-resources.html).
* <AWSIAMRole/>
* <AWSRegions/>
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-dynamodb-configuration.png')} style={{border:'1px solid gray', marginLeft: '1.5rem'}} alt="AWS DynamoDB configuration" width="400"/>

<IntegrationsAuthAWS/>

### AWS IAM role-based access

<IAMConfiguration/>

## Required Permissions

```
dynamodb:DescribeTable
dynamodb:UpdateTable
```

## Additional resources

For AWS DynamoDB, Sumo Logic offers the [Amazon DynamoDB app](/docs/integrations/amazon-aws/dynamodb/) to visualize your DynamoDB data.

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.0.0 | September 17, 2026 | Initial release of the AWS DynamoDB integration. |
