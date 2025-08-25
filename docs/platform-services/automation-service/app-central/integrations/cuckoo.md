---
title: Cuckoo
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cuckoo.png')} alt="cuckoo" width="100"/>

***Version: 1.4  
Updated: Jul 06, 2023***

Utilize Cuckoo sandbox to detonate potentially malicious files and URLs during an active investigation.

## Actions

* **Detonate File** (*Enrichment*) - Submit file for analysis.
* **Detonate URL** (*Enrichment*) - Submit URL for analysis.
* **Get Task Status** (*Enrichment*) - Get status for a specific Task.
* **Get URL Report** (*Enrichment*) - Get report for a specific URL.
* **Get File Report** (*Enrichment*) - Get report for a specific file.

## Notes

* After submitting (detonation), task has three phases. It can be pending, analyzing, or reported status.

## Configure Cuckoo in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API Port**. Enter the [Cuckoo API](https://cuckoo.readthedocs.io/en/latest/usage/api/) port.

* **URL**. Enter the Cuckoo API URL.

* **API Key (Token)**. Enter the Cuckoo API key.

* **Username**. Enter the username of the Cuckoo admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cuckoo/cuckoo-configuration.png')} style={{border:'1px solid gray'}} alt="Cuckoo configuration" width="400"/>

For information about Cuckoo, see [Cuckoo documentation](https://cuckoo.readthedocs.io/en/latest/usage/api/).

## Change Log

* September 19, 2019 - First upload
* March 19, 2021 - Actions updated
* July 6, 2023 (v1.4)
	+ Updated the integration with Environmental Variables
	+ Integration renamed from Cuckoo OIF to Cuckoo
