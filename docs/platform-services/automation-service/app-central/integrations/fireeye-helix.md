---
title: FireEye Helix
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/fireeye-helix.png')} alt="fireeye-helix" width="100"/>

***Version: 1.2  
Updated: Jul 13, 2023***

Query FireEye Helix to gather enrichment data during an incident investigation.

## Actions

* **List Alerts** (*Enrichment*) - Gather a list of all Helix alerts.
* **Get Alert** (*Enrichment*) - Gather information on a specific alert.
* **Search Into Helix** (*Enrichment*) - Query into Helix alerts and events.
* **List Events** (*Enrichment*) - Gather a list of all Helix events.
* **List Alert Events** (*Enrichment*) - Gather all events associated with a specific alert.
* **Get Event** (*Enrichment*) - Gather information on a specific event.
* **Get Lists** (*Enrichment*) - Gather all Helix lists within a specific time period.
* **List Alerts Fields** (*Enrichment*) - List all available alert fields.
* **List Cases** (*Enrichment*) - Gather all Helix cases within a specific time period.
* **List Incidents** (*Enrichment*) - List all incidents within a specific time period.
* **List Rules** (*Enrichment*) - List all Helix rules within a specific time period.
* **List Users** (*Enrichment*) - List all Helix users.
* **Create Alert Helix** (*Notification*) - Create a new Helix alert.
* **Update Alert Helix** (*Notification*) - Update a specific Helix alert.
* **Update Case** (*Notification*) - Update a specific case.
* **Close Alert Helix** (*Notification*) - Close an existing Helix alert.
* **FireEye Helix Alerts Daemon** (*Daemon*) - Automatically gather Helix alerts.

## Configure FireEye Helix in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Endpoint**. Enter the FireEye Helix endpoint URL.

* **API Key**. Enter a FireEye Helix [API key](https://docs.trellix.com/bundle/helix_pg/page/UUID-76e07a89-b6c5-6fb0-3201-34fe0b1eb717.html).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* **FireEye Helix Timezone (Daemon)**. Select your timezone.

* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/fireeye-helix-configuration.png')} style={{border:'1px solid gray'}} alt="FireEye Helix configuration" width="400"/>

For information about Trellix Helix (formerly FireEye Helix), see [Trellix Helix documentation](https://docs.trellix.com/bundle/fe-helix-enterprise-landing/page/UUID-004fd1b5-25d2-27d6-7578-ad0197c248aa.html).

## Change Log

* January 23, 2020 - First upload
* July 13, 2023 (v1.1)
	+ Updated the integration with Environmental Variables
	+ Changed fields visibility
