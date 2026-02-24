---
title: MITRE Matrix
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/mitre-matrix.png')} alt="mitre-matrix" width="100"/>

***Version: 2.2  
Updated: Jul 18, 2023***

MITRE is a globally-accessible knowledge base of adversary tactics and techniques based on real-world observations. 

## Actions

* **Get Techniques** *(Enrichment)* - Get a specific technique details by identifier.
* **Get Tactics** *(Enrichment)* - Get a specific Tactic details by identifier.
* **Get Associated Intrusions** *(Enrichment)* - Get a specific malware details by identifier.
* **Get Mitigations** *(Enrichment)* - Get mitigations details by identifier.
* **Retrieve Tactics And Techniques From CSE Insight** *(Enrichment)* - Get Tactics And Techniques From CSE Insight Tags.

## External Libraries

* [pyattck](https://github.com/swimlane/pyattck/blob/master/LICENSE.md)

## Configure MITRE Matrix in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Update MITRE ATT&CK**. Select to get the latest MITRE techniques, tactics, etc.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* **Automation Engine**. Select a bridge. (Cloud execution is not supported for this integration. For more information about cloud and bridge execution, see [Cloud or Bridge execution](/docs/platform-services/automation-service/automation-service-integrations/#cloud-or-bridge-execution).)
* **Proxy Options**. Select **Use no proxy**. Communication runs on the bridge and does not use a proxy.

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/mitre-matrix-configuration.png')} style={{border:'1px solid gray'}} alt="MITRE Matrix configuration" width="400"/>

For information about MITRE Matrix, see [MITRE Matrix documentation](https://attack.mitre.org/).

## Troubleshooting

You may receive the following error when you test the MITRE Matrix resource: <br/>`Error testing resource. An internal error occurred calling lambda function.`

The error may be caused by a 6 MB quota that Lambda has per request. For quotas, see the AWS documentation [Lambda Quotas](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html).

To work around the error, install an [automation bridge](/docs/platform-services/automation-service/automation-service-bridge/). Then in the **Automation engine** field of the MITRE Matrix integration configuration dialog, select the bridge instead of **Cloud execution**. 

## Change Log

* February 3, 2021 - First upload
* June 07, 2022 - Updated all the actions with pyattck==5.4.0
* June 26, 2023 (v2.1) - Updated the integration with Environmental Variables
* July 18, 2023 (v2.2) - Integration refactored
