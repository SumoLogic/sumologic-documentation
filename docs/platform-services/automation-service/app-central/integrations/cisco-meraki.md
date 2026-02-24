---
title: Cisco Meraki
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cisco-meraki.png')} alt="cisco-meraki" width="70"/>

***Version: 1.3  
Updated: Oct 24, 2025***

 Perform a wide variety of actions within the **Cisco Meraki** ecosystem.

## Actions

* **Get Client** (*Enrichment*) - Retrieve client details connected to a specific device.
* **Get Client Policy** (*Enrichment*) - Fetch the policy configuration for a specific client.
* **Get Device Detail** (*Enrichment*) - Retrieve detailed information about a specific device.
* **Get Device Statuses** (*Enrichment*) - Get the operational statuses of all devices in an organization.
* **Get Device Uplink** (*Enrichment*) - Retrieve uplink connection details for a specific device.
* **Get Group Policies** (*Enrichment*) - List all group policies configured in a network.
* **Get Network Detail** (*Enrichment*) - Retrieve detailed configuration and metadata of a specific network.
* **Get Organization Devices** (*Enrichment*) - List devices for the specified organization.
* **Get Network List** (*Enrichment*) - Retrieve a list of all networks within an organization.
* **Get Network Traffic Status** (*Enrichment*) - Get traffic analytics for a specified network.
* **Get SSID Detail** (*Enrichment*) - Retrieve configuration details of a specific SSID.
* **Get SSIDs** (*Enrichment*) - List all SSIDs configured under a given network.
* **Get Static Route Detail** (*Enrichment*) - Retrieve detailed configuration of a specific static route.
* **Get Static Routes** (*Enrichment*) - List all static routes configured in a network.
* **Get VLAN Detail** (*Enrichment*) - Get detailed configuration of a specific VLAN.
* **Get VLANS** (*Enrichment*) - List all VLANs configured in a network.
* **Get VPN FW Rules** (*Enrichment*) - Retrieve the current VPN firewall rules for an organization.
* **Get VPN Settings** (*Enrichment*) - Retrieve site-to-site VPN settings for a specific network.
* **List Clients** (*Enrichment*) - List all client devices connected to a given network or device.
* **List Organizations** (*Enrichment*) - Retrieve a list of organizations accessible with the provided API key.
* **Add Static Route** (*Containment*) - Create and add a new static route in a specified network.
* **Update Client Policy** (*Containment*) - Modify the policy applied to a specific client.
* **Update Device** (*Containment*) - Update properties such as name, location, or tags of a device.
* **Update Static Route** (*Containment*) - Modify an existing static route configuration.
* **Update VPN Rules Of MX Network** (*Containment*) - Update VPN firewall rule sets at the organization level.
* **Update VPN Settings** (*Containment*) - Update site-to-site VPN configuration (mode, hubs, and subnets).
* **Wipe Devices** (*Containment*) - Remotely wipe one or more devices managed via Systems Manager (SM).

## Configure Cisco Meraki in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API Key**. Enter a [Cisco Meraki API key](https://developer.cisco.com/meraki/api-v1/authorization/#obtaining-your-meraki-api-key).

* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cisco/cisco-meraki-configuration.png')} style={{border:'1px solid gray'}} alt="Cisco Meraki configuration" width="400"/>

For information about Cisco Meraki, see [Cisco Meraki documentation](https://developer.cisco.com/meraki/api-v1/authorization/#authorization).

## Change Log

* February 28, 2019 - First upload
* May 5, 2023 (v1.1) - Integration refactored
* June 26, 2023 (v1.1) - Removed unnecessary empty lines and other little changes
* October 24, 2025 (v1.3) - The Cisco Meraki integration has been fully upgraded to align with the latest Meraki Dashboard API (v1) and SDK (v2.0.3)
