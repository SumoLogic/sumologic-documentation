---
title: Cisco Meraki
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cisco-meraki.png')} alt="cisco-meraki" width="70"/>

***Version: 1.2  
Updated: Jun 26, 2023***

 Perform a wide variety of actions within the **Cisco Meraki** ecosystem.

## Actions

* **Get Client** (*Enrichment*) - Get client of a device.
* **Get Client Policy** (*Enrichment*) - Get policy information for the specified client.
* **Get Device Detail** (*Enrichment*) - Get device details for the specified device.
* **Get Device Statuses** (*Enrichment*) - Get device statuses for the specified organization ID.
* **Get Device Uplink** (*Enrichment*) - Get device uplink information for the specified device.
* **Get Group Policies** (*Enrichment*) - Get group policies for the specified network.
* **Get Network Detail** (*Enrichment*) - Get network details for the specified network.
* **Get Network Devices** (*Enrichment*) - List devices for the specified network.
* **Get Network List** (*Enrichment*) - List networks for the specified organization.
* **Get Network Traffic Status** (*Enrichment*) - Get network traffic information for the specified network..
* **Get SSID Detail** (*Enrichment*) - Get detailed information for the specified SSID.
* **Get SSIDs** (*Enrichment*) - List SSIDs for the specified network.
* **Get Static Route Detail** (*Enrichment*) - Get details for the specified static route.
* **Get Static Routes** (*Enrichment*) - Get static routes for the specified network.
* **Get VLAN Detail** (*Enrichment*) - Get details for the specified VLAN.
* **Get VLANS** (*Enrichment*) - Get VLANs for the specified network.
* **Get VPN FW Rules** (*Enrichment*) - Get VPN firewall rules for the specified organization.
* **Get VPN Settings** (*Enrichment*) - Get VPN settings for the specified network.
* **List Clients** (*Enrichment*) - List the clients of a device.
* **List Organizations** (*Enrichment*) - List the organizations that the user has privileges on.
* **Add Static Route** (*Containment*) - Add a new static route.
* **Update Client Policy** (*Containment*) - Update the specified client policy.
* **Update Device** (*Containment*) - Update the specified device.
* **Update Static Route** (*Containment*) - Update the specified static route.
* **Update VPN Rules Of MX Network** (*Containment*) - Update rulesets on MX network.
* **Update VPN Settings** (*Containment*) - Update the VPN settings.
* **Wipe Devices** (*Containment*) - Wipe a device/devices.

## Configure Cisco Meraki in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Cisco Meraki, see [Cisco Meraki documentation](https://developer.cisco.com/meraki/api-v1/authorization/#authorization).

## Change Log

* February 28, 2019 - First upload
* May 5, 2023 (v1.1) - Integration refactored
* June 26, 2023 (v1.1) - Removed unnecessary empty lines and other little changes
