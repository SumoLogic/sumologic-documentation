---
title: AWS Lambda
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.0  
Updated: Aug 13, 2026***

Interact with AWS Lambda functions, including listing, inspecting, and invoking them directly from automation playbooks.

## Actions

* **Get Function** *(Enrichment)*. Retrieves configuration and code details for a specific Lambda function, including runtime, handler, memory, and state.
* **Invoke Function** *(Custom)*. Invokes a Lambda function synchronously or asynchronously with an optional JSON payload and returns the status code and response.
* **List Functions** *(Enrichment)*. Lists Lambda functions in the configured region with optional pagination and Lambda@Edge filtering.

## External Libraries

* [AWS Lambda](https://github.com/boto/boto3/blob/develop/LICENSE)

## Configure AWS Lambda in Automation Service and Cloud SOAR

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

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-lambda-configuration.png')} style={{border:'1px solid gray'}} alt="AWS Lambda configuration" width="400"/>

<IntegrationsAuthAWS/>

### AWS IAM role-based access

<IAMConfiguration/>

## Required Permissions

```
lambda:ListFunctions
lambda:GetFunction
lambda:InvokeFunction
```

## Change Log

* August 13, 2026 (v1.0) - First upload
