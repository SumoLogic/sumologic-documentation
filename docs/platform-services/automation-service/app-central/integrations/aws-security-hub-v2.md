---
title: AWS Security Hub V2
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.0
Updated: Nov 8, 2025***

Interact with AWS Security Hub V2 through Insights and Findings.

## Actions

* **Import Single Finding** (*Enrichment*) - Import a single finding.
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
* **Host**. Enter your [Security Hub URL](https://docs.aws.amazon.com/general/latest/gr/sechub.html), for example, `securityhub.us-east-1.amazonaws.com`.
* <AWSRegions/>
* **Service Name**. Enter `securityhub`.
* <AWSAccesskey/>
* <AWSSecret/>
* <AWSIAMRole/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-security-hub-v2-configuration.png')} style={{border:'1px solid gray'}} alt="AWS Security Hub configuration" width="400"/>

<IntegrationsAuthAWS/>

For information about AWS Security Hub, see [AWS Security Hub documentation](https://docs.aws.amazon.com/securityhub/).

### AWS IAM role-based access

<IAMConfiguration/>

## Limitations

Local [Automation Bridge](/docs/platform-services/automation-service/automation-service-bridge/) is not supported in this version.

## Change Log

* November 8, 2025 - First upload
