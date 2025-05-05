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

import IntegrationsAuthAWS from '../../../../reuse/integrations-authentication-aws.md';

<IntegrationsAuthAWS/>

For information about AWS Security Hub, see [AWS Security Hub documentation](https://docs.aws.amazon.com/securityhub/).

## Change Log

* February 28, 2019 - First upload
* March 10, 2022 - Logo
* June 19, 2023 (v1.2) - Updated the integration with Environmental Variables
* February 28, 2023 (v1.3) - Updated code for compatibility with Python 3.12
