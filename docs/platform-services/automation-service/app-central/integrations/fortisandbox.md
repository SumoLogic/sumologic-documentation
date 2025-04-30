---
title: FortiSandbox
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/fortisandbox.png')} alt="fortisandbox" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Fortinet FortiSandbox is a detection tool with threat prevention capabilities, with the integration actions can be utilized to the technology.

## Actions

* **Upload a File** *(Containment)* - On-demand submit for filesize < 20MB.
* **Upload Large File** *(Containment)* - On-demand submit for filesize > 20MB.
* **Upload a URL File***(Containment)* - On-demand submit URL.
* **Query URL Rating** *(Enrichment)* - Query URL Rating.
* **Cancel a Job Submission** *(Containment)* - Cancel a submission.
* **Get AV Rescan Results** *(Enrichment)* - Get AV results.
* **Add or Remove from Blacklist or Whitelist** *(Containment)* - Allow user to add/delete checksums to allow/block (white/black) list.
* **Mark a Sample** *(Containment)* - Mark a sample as false negative/false positive.

## Configure FortiSandbox in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about FortiSandbox, see [FortiSandbox documentation](https://docs.fortinet.com/product/fortisandbox/5.0).

## Change Log

* April 28, 2021 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
