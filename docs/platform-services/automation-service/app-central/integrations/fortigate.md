---
title: FortiGate
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/fortigate.png')} alt="fortigate" width="100"/>

***Version: 1.3  
Updated: April 29, 2026***

Work with Addresses, Policies and Services in Fortinet FortiGate.

## Actions

* **Get Address Groups** (*Enrichment*) - Get a address group.
* **Get Addresses** (*Enrichment*) - Get addresses.
* **Get Firewall Service** (*Enrichment*) - Get a firewall service.
* **Get Policy** (*Enrichment*) - Get a policy.
* **Get Service Groups** (*Enrichment*) - Get a service group.
* **Create Packet Capture** (*Enrichment*) - Create a new packet capture session.
* **Download Stored Packet Capture** (*Enrichment*) - Download a stored packet capture.
* **Packet Capture Action** (*Enrichment*) - Interact with a packet capture session (Start/Resume, Restart, Stop, and Delete).
* **List Packet Captures** (*Enrichment*) - List all available packet captures.
* **List Configured Packet Captures Status** (*Enrichment*) - Gather the status of a packet capture.
* **List Interfaces** (*Enrichment*) - List all available interfaces.
* **Packet Capture Polling** (*Enrichment*) - Packet capture polling.
* **Add Address** (*Containment*) - Add a new IP or FQDN to the address list (required to use address in Address Group).
* **Create Address Group** (*Containment*) - Create a new address group.
* **Create Firewall Service** (*Containment*) - Create a new firewall service.
* **Create Policy** (*Containment*) - Create a new policy.
* **Update Address Group** (*Containment*) - Update an address group.
* **Update Policy** (*Containment*) - Update a policy.

## Configure FortiGate in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Enter the server URL for your FortiGate instance.

* **Token**. Enter a FortiGate [token](https://docs.fortinet.com/document/fortigate/7.6.2/cli-reference/214143909/execute-gen-token).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/fortigate-configuration.png')} style={{border:'1px solid gray'}} alt="FortiGate configuration" width="400"/>

For information about FortiGate, see [FortiGate documentation](https://docs.fortinet.com/product/fortigate/7.6).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.3 | April 29, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.2 | July 14, 2023 | <ul><li>Refactored the code.</li><li>Changed fields visibility.</li></ul> |
| v1.1 | June 23, 2023 | Updated the integration with Environmental Variables. |
| | June 1, 2020 | Added new actions. |
| | September 19, 2019 | Added new actions. |
| | January 24, 2019 | First upload. |
