---
title: Expel Workbench
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/expel-workbench.png')} alt="expel workbench" width="100"/>

***Version: 1.0  
Updated: Jan 2, 2026***

Expel allows security analysts to follow investigations in real time, see every action taken, and communicate seamlessly with the Expel team.

## Actions

* **Add Comment** (*Containment*) - Add a comment to an existing alert in Expel Workbench.
* **Close Alert** (*Containment*) - Close an existing alert in Expel Workbench.
* **Correlate Entity with Recent Expel Alerts** (*Enrichment*) - Correlate an entity (IP, domain, or hash) with recent Expel alerts.
* **Create Alert** (*Containment*) - Create a new alert in Expel Workbench.
* **Expel Alert Count by Severity** (*Enrichment*) - Returns the count of Expel alerts by severity level.
* **List Expel Alerts** (*Enrichment*) - Returns a list of Expel alerts based on specified filters.

## Configure Expel Workbench in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Expel Workbench URL**. Enter the URL of Expel Workbench.

* **Expel API Token**. Enter the Expel API Token.

* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/expel-workbench-configuration.png')} style={{border:'1px solid gray'}} alt="expel workbench configuration" width="400"/>

For information about Expel Workbench, see [Expel Workbench documentation](https://workbench.expel.io/api/v2/docs/#tag/expel_alerts).

## Change Log

* January 2, 2026 - First upload