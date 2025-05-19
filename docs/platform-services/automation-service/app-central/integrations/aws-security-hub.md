---
title: AWS Security Hub
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.3  
Updated: Feb 28, 2024***

Interact with AWS Security Hub through Insights and Findings.

## Actions

* **Batch Import Finding** (*Enrichment*) - Import a batch of findings.
* **Create Insight** (*Containment*) - Create a new insight with the specified information.
* **Delete Insight** (*Containment*) - Delete the specified insight.
* **Get Findings** (*Enrichment*) - Get findings matching the specified query.
* **Get Insight Results** (*Enrichment*) - Get results for the specified insight.
* **Get Insights** (*Enrichment*) - Get insights matching the specified query.
* **List Enabled Products** (*Enrichment*) - Get a list of SecurityHub enabled products.
* **Update Finding** (*Containment*) - Update a finding with the specified information.
* **Update Insight** (*Containment*) - Update the specified insight.

## Configure AWS Security Hub in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

import IntegrationsAuthAWS from '../../../../reuse/integrations-authentication-aws.md';

<IntegrationsAuthAWS/>

* **Label**. Enter the name you want to use for the resource.
* **Host**. Enter your [Security Hub URL](https://docs.aws.amazon.com/general/latest/gr/sechub.html), for example, `securityhub.us-east-1.amazonaws.com`.
* **AWS Region**. Enter your [AWS region](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html).
* **Service Name**. Enter `AWS Security Hub`.
* **Access Key**. Enter an [access key ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) to provide authentication. (Although AWS recommends using IAM roles with temporary security credentials instead of access keys, our AWS integrations currently support only access keys due to the need for dynamically managed credentials.)
* **Secret Key**. Enter the secret access key associated with the access key ID.
* **Timeout connection (sec)**. Enter the connection timeout time in seconds (for example, `180`). If connection is not made in the alloted time, then the connection is terminated.
* **Automation engine**. Select whether to use [Cloud or Bridge execution](/docs/platform-services/automation-service/automation-service-integrations/#cloud-or-bridge-execution).
* **Proxy Options**. Select whether to use an [AWS proxy](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-proxy.html).

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-security-hub-configuration.png')} style={{border:'1px solid gray'}} alt="AWS Security Hub configuration" width="400"/>

For information about AWS Security Hub, see [AWS Security Hub documentation](https://docs.aws.amazon.com/securityhub/).

## Change Log

* February 28, 2019 - First upload
* March 10, 2022 - Logo
* June 19, 2023 (v1.2) - Updated the integration with Environmental Variables
* February 28, 2023 (v1.3) - Updated code for compatibility with Python 3.12
