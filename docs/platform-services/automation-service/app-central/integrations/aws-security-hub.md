---
title: AWS Security Hub
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.5  
Updated: April 27, 2026***

Interact with AWS Security Hub through Insights and Findings.

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
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>

* <IntegrationLabel/>
* **Host**. Enter your [Security Hub URL](https://docs.aws.amazon.com/general/latest/gr/sechub.html), for example, `securityhub.us-east-1.amazonaws.com`.
* <AWSRegions/>
* **Service Name**. Enter `AWS Security Hub`.
* <AWSAccesskey/>
* <AWSSecret/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-security-hub-configuration.png')} style={{border:'1px solid gray'}} alt="AWS Security Hub configuration" width="400"/>

<IntegrationsAuthAWS/>

For information about AWS Security Hub, see [AWS Security Hub documentation](https://docs.aws.amazon.com/securityhub/).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.5 | April 27, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.4 | August 28, 2025 | <ul><li>Renamed the `Batch Import Finding` action to **Import Single Finding**.</li><li>Renamed the `List Enable Products` action to **List Enabled Products**.</li><li>Updated hints for all actions.</li></ul> |
| v1.2 | June 19, 2023 | Updated the integration with Environmental Variables. |
| v1.3 | February 28, 2023 | Updated code for compatibility with Python 3.12. |
| v1.1 | March 10, 2022 | Updated the logo in AWS Security Hub integration. |
| v1.0 | February 28, 2019 | Initial release of the AWS Security Hub integration. |
