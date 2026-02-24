---
title: Cisco Cyber Vision
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cisco-cyber-vision.png')} alt="cisco-cyber-vision" width="70"/>

***Version: 1.2  
Updated: Jul 13, 2023***

Cisco Cyber Vision can delete, set and retrieve allowing ICS with dynamic monitoring on hosts.

## Actions

* **Delete Custom Name** (*Containment*) - Delete a Custom Name based on Type and Value.
* **Get Host** (*Enrichment*) - Get Host using Cyber Vision.
* **Set Custom Name** (*Containment*) - Set a Custom Name based on Type, Value, and Name.
* **Get Flow** (*Enrichment*) - Retrieve a specific flow.
* **List Flows** (*Enrichment*) - List all flows.
* **Get Component Flow** (*Enrichment*) - List flow between components.
* **Last Seen Time** (*Enrichment*) - Last seen time of a machine.
* **Add Component Note** (*Notification*) - Add component details to a note.
* **List Components** (*Enrichment*) - List all components.
* **Save Flow Details** (*Containment*) - Save component Details as attachment.
* **Last Active Time** *(Enrichment*) - Returns the number of days of the last activity.

## Configure Cisco Cyber Vision in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Host**. Enter the name of your Cisco Cyber Vision host.

* **Token**. Enter a Cisco Cyber Vision [token](https://www.cisco.com/c/en/us/td/docs/security/cyber_vision/Release-5-2-0/b-cisco-cyber-vision-administration-guide-release-5-2-0/m-configure-cisco-cyber-vision.html#topic_5340).
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cisco/cisco-cyber-vision-configuration.png')} style={{border:'1px solid gray'}} alt="Cisco Cyber Vision configuration" width="400"/>

For information about Cisco Cyber Vision, see [Cisco Cyber Vision documentation](https://www.cisco.com/c/en/us/support/security/cyber-vision/products-user-guide-list.html).

## Change Log

* December 23, 2020 - First upload
* March 10, 2021 - Actions updated
* July 13, 2023 (v1.2)
	+ Updated the integration with Environmental Variables
	+ Changed fields visibility
