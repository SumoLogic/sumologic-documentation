---
title: McAfee ESM
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/mcafee-esm.png')} alt="mcafee-esm" width="100"/>

***Version: 1.1  
Updated: Jul 11, 2023***

Work with McAfee ESM Events, Alarms, and Watchlists.

**Actions:**

* **Get Filter Fields** (*Enrichment*) - Get a list of valid filter fields.
* **Get Raw Logs From Event ELM ELS** (*Enrichment*) - Get the raw logs pertaining to an event.
* **Get Watchlists** (*Enrichment*) - Get a list of watchlists.
* **List Correlated Events** (*Enrichment*) - LIst events which are correlated with the Event ID.
* **List Users** (*Enrichment*) - Get a list of users.
* **Search Into McAfee ESM Alarms** (*Enrichment*) - Search Alarms.
* **Search Into McAfee ESM Events** (*Enrichment*) - Search Events.
* **Acknowledge Alarm** (*Containment*) - Acknowledge an Alarm.
* **Add To Watchlist** (*Containment*) - Add a value to a watchlist.
* **Remove From Watchlist** (*Containment*) - Remove a value from a watchlist.
* **Search McAfee ESM Alarm Daemon** (*Daemon*) - Daemon for searching alarms.
* **Get Select Fields** (*Enrichment*) - Get a list of select fields.

## Configure McAfee ESM in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Enter your McAfee ESM server URL.

* **Username**. Enter the username for a McAfee ESM admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.

* **McAfee Timezone (Daemon)**. Select your timezone.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/mcafee-esm-configuration.png')} style={{border:'1px solid gray'}} alt="McAfee ESM configuration" width="400"/>

For information about McAfee ESM, see [McAfee Enterprise Security Manager documentation](https://docs.trellix.com/bundle/enterprise-security-manager-11.5.x-product-guide/page/GUID-7E4DE7F5-C6BB-4C1B-8EDB-E92F53D144EF.html).

## Change Log

* July 4, 2019 - First upload
* August 5, 2019 - Supported Version Updated
* December 2, 2021 - Actions updated (Added logout session to each action)
* July 11, 2023 (v1.1) - Updated the integration with Environmental Variables
