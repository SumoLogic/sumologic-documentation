---
title: Lacework
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/lacework.png')} alt="lacework" width="100"/>

***Version: 1.6  
Updated: April 29, 2026***

Lacework provides end-to-end cloud security automation for AWS, Azure, and GCP with a comprehensive view of risks across cloud workloads and containers.

## Actions

* **Close Alert** *(Containment)* - Change the status of an alert to closed.
* **Cloud Activities** *(Enrichment)* - List the cloud activities for the integrated AWS cloud accounts in your Lacework instance.
* **Execute Query** *(Enrichment)* - Execute a query in Lacework.
* **Get Alert Details** *(Enrichment)* - Get details about an alert.
* **List All Report Rules** *(Enrichment)* - List all the report rules in the Lacework instance.
* **Search Alerts** *(Enrichment)* - Search alerts with filter options.
* **Search Cloud Activities** *(Enrichment)* - Search for the cloud activities for the integrated AWS cloud accounts in your Lacework instance.
* **Search Events** *(Enrichment)* - Search for evidence or observation details of individual events.
* **Search Reports Rules** *(Enrichment)* - Search all report rules in Lacework instance.

## Configure Lacework in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your Lacework URL, for example, `https://YourLacework.lacework.net`

* **Access Key ID**. Enter your Lacework [API key ID](https://docs.fortinet.com/document/lacework-forticnapp/latest/administration-guide/155000/api-keys).

* **Secret Key**. Enter the secret for the API key.

* **Token Expiration Time (s)**. Enter the token expiration time in seconds. The maximum is 86400 seconds (24 hours).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/lacework-configuration.png')} style={{border:'1px solid gray'}} alt="Lacework configuration" width="400"/>

For information about Lacework, see [Lacework documentation](https://docs.lacework.net/).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.6 | April 29, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.5 | May 2, 2024 | Added a new action: **Execute Query**. |
| v1.4 | January 26, 2024 | <ul><li>Added new actions: **Get Alert Details** and **Search Alerts**.</li><li>Fixed the endpoint in the **Close Alert** action.</li></ul> |
| v1.3 | December 14, 2023 | Added a new action: **Close Alert**. |
| v1.2 | October 5, 2023 | <ul><li>Updated the logo.</li><li>Refactored the code.</li><li>Added a new action: **Search Events**.</li><li>Changed the action type for **Search Cloud Activities** and **Search Reports Rules**.</li></ul> |
| v1.1 | July 5, 2023 | Updated the integration with Environmental Variables. |
| | July 29, 2021 | Added a new action. |
| | July 13, 2021 | Initial release of the Lacework integration. |
