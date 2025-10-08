---
title: Splunk
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/splunk.png')} alt="splunk" width="70"/>

***Version: 1.3
Updated: Sep 18, 2025***

Search and send events with Splunk.

## Actions

* **Search Into Events Splunk** (*Enrichment*) - Search Splunk events.
* **Send Splunk Events** (*Notification*) - Send an event to Splunk.
* **Splunk Events Daemon** (*Daemon*) - Daemon to gather new Splunk events.
* **Splunk Alerts Daemon** (*Daemon*) - Daemon to gather new Splunk alerts.
* **Update Notable Event** (*Notification*) - Update a notable (important) event in Splunk.

## Notes

* ***Important***: Change the line `\_indextime>0000000000` to indicate the time in Epoch format you wish to begin creating incidents from in the Splunk Events Daemon action.
* Only default fields, such as `[].\_raw`, `[].host`, and `[].source` are included in the Search Into Splunk Events and Splunk Events Daemon actions.   
To use any custom fields from Splunk within Cloud SOAR, make sure they are added to these action files.

## Configure Splunk in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Protocol**. Enter your protocol:
   * **HTTP**
   * **HTTPS**

* **Splunk Host**. Enter the [hostname of your Splunk instance](https://help.splunk.com/en/splunk-enterprise/get-started/get-data-in/9.3/configure-host-values/set-a-default-host-for-a-splunk-platform-instance).

* **Splunk API Port**. Enter your [Splunk API port](https://docs.splunk.com/Documentation/SplunkCloud/latest/RESTTUT/RESTandCloud), for example,`8089`. 

* **Authentication Type**. Select the authentication type:
   * **Username and Password (Basic Authentication)**
   * **Bearer Token (Authentication Token)**

* **Token**. Enter your [Splunk token](https://dev.splunk.com/observability/docs/apibasics/authentication_basics#Obtain-tokens). Required only if you selected **Bearer Token (Authentication Token)**.

* **Splunk Username**. Enter the username of a Splunk admin user authorized to authenticate the integration. Required only if you selected **Username and Password (Basic Authentication)**

* **Splunk Password**. Enter the password for the Splunk user. Required only if you selected **Username and Password (Basic Authentication)**

* **Splunk Timezone (Daemon)**. Select your timezone.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/splunk-configuration.png')} style={{border:'1px solid gray'}} alt="Splunk configuration" width="400"/>

For information about Splunk, see [Splunk documentation](https://docs.splunk.com/Documentation).

## Change Log

* May 5, 2019 - First upload
* June 4, 2019 - Search Into Events Daemon updated
* June 19, 2019 - Search Into Events Daemon updated
* December 19, 2019 - Splunk Alerts Daemon Added
* February 21, 2020 - Updated Splunk Events Daemon
* March 9, 2021 - New action added
* March 25, 2021 - Updated authentication (Authentication Token and Basic Authentication available)
* July 13, 2023 (v1.2)
	+ Updated the integration with Environmental Variables
	+ Integration renamed from Splunk OIF to Splunk
	+ Changed fields visibility
	+ Changed Daemon compatibility (Splunk Alerts Daemon)
* September 18, 2025 (v1.3)
    + Improved timezone handling in alert queries.
    + Improved URL encoding to handle reserved characters.
