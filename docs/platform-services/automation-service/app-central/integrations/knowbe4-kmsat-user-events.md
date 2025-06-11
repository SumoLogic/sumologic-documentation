---
title: KnowBe4 KMSAT - User Events
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/knowbe4-kmsat-user-events.png')} alt="knowbe4-kmsat-user-events" width="100"/>

***Version: 1.1  
Updated: Jun 26, 2023***

KnowBe4 KMSAT is a security platform for security awareness training and simulated phishing attacks. KnowBe4 KMSAT User Event API helps you tailor security awareness training based on custom user risk events.

## Actions

* **Get Event Status** *(Enrichment)* - Retrieve status of a specific event.
* **List Event Statuses** *(Enrichment)* - Retrieve statuses of previously executed events.
* **Get Event** *(Enrichment)* - Retrieve data about a specific event.
* **List Events** *(Enrichment)* - Retrieve data about all events.
* **Get Event Type** *(Enrichment)* - Retrieve data about a specific event type.
* **List Event Types** *(Enrichment)* - Retrieve data about all event types.
* **Create Event** *(Containment)* - Create a new event.
* **Delete Event** *(Containment)* - Delete an existing event.

## Configure KnowBe4 KMSAT - User Events in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter the [events base URL](https://developer.knowbe4.com/rest/userEvents#tag/Base-URL) for the KnowBe4 server that is closest to your geographic location.

* **API Key**. Enter your KnowBe4 KMSAT [API key](https://developer.knowbe4.com/events/).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/knowbe4-kmsat-user-configuration.png')} style={{border:'1px solid gray'}} alt="KnowBe4 KMSAT User Events configuration" width="400"/>

For information about KnowBe4 user events, see [KnowBe4 user event documentation](https://support.knowbe4.com/hc/en-us/articles/360024863474-User-Event-API-Overview).

## Change Log

* February 6, 2023 - First upload
* June 26, 2023 (v1.1) - Removed unnecessary empty lines and other little changes
