---
title: FireEye Network Security (NX)
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/fireeye-network-security-nx.png')} alt="fireeye-network-security-nx" width="100"/>

***Version: 1.1  
Updated: Jul 03, 2023***

Advanced network security solution for network traffic analysis.

## Actions

* **Get Alert Info** (*Enrichment*) - Query FireEye NX for alert details.
* **Get ATI Details** (*Enrichment*) - Query FireEye Advanced Threat Intelligence for intelligence data.
* **Get Event Info**(*Enrichment*) - Get information from previously generated event.
* **Add Snort Rule** (*Containment*) - Add a new Snort rule.
* **Add YARA Rule** (*Containment*) - Add a new YARA rule.

## Configure FireEye Network Security in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Enter the server URL for your FireEye Network Security instance.

* **Username**. Enter the username of a FireEye Network Security admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/fireeye-network-security-configuration.png')} style={{border:'1px solid gray'}} alt="FireEye Network Security configuration" width="400"/>

For information about Trellix Network Security (formerly FireEye Network Security), see [Trellix Network Security (NX) documentation](https://docs.trellix.com/bundle/fe-network-security-landing/page/UUID-58265fe8-a08e-3442-855b-72d3a36262b5.html).

## Change Log

* June 19, 2019 - First upload
* July 3, 2023 (v1.1) - Updated the integration with Environmental Variables
