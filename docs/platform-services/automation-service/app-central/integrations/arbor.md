---
title: Arbor
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/arbor.png')} alt="apivoid" width="90"/>

***Version: 1.4  
Updated: April 13, 2026***

Gather detail-rich data from Netscout Arbor alerts.

## Actions

* **Alert Ongoing Polling** (*Enrichment*) - Presents data on whether the alert is still active.
* **Get Alert** (*Enrichment*) - Get a specific Arbor alert.
* **List Alerts** (*Enrichment*) - Get all Arbor alerts.
* **Mitigation Ongoing Polling** (*Enrichment*) - Presents data on whether the alert is still actively being mitigated.
* **Arbor Alerts Daemon** (*Daemon*) - Automatically pass alerts to Cloud SOAR.

## Configure Arbor in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your Arbor API URL.

* **API Key**. Enter your Arbor API key.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/arbor/arbor-configuration.png')} style={{border:'1px solid gray'}} alt="Arbor configuration" width="400"/>

For information about Arbor, see [Netscout](https://www.netscout.com/arbor).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.4 | April 13, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.3 | March 4, 2024 | Updated the code for compatibility with Python 3.12. |
| v1.2 | July 13, 2023 | <ul><li>Updated the integration with environmental variables.</li><li>Changed fields visibility.</li></ul> |
| | May 22, 2020 | Initial release of the Arbor integration. |
