---
title: VMWare vSphere
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/vmware-vsphere.png)

Version: 1.4  
Updated: Sep 19, 2023

Utilize and manipulate virtual machines during an incident investigation with VMWare vSphere.

## Actions

* **Get Events** (*Enrichment*) - Gather events from vSphere
* **Get Snapshots** (*Enrichment*) - Get VM snapshots
* **Get VMs** (*Enrichment*) - Get list of available virtual machine
* **Create Snapshot** (C*ontainment*) - Create a new snapshot
* **Hard Reboot** (C*ontainment*) - Execute a hard reboot of a system
* **Power Off** (C*ontainment*) - Power off a system
* **Power On** (C*ontainment*) - Power on a system
* **Revert To Snapshot** (C*ontainment*) - Roll back to a previous snapshot
* **Soft Reboot** (C*ontainment*) - Execute a soft reboot of a system
* **Suspend** (C*ontainment*) - Suspend a virtual machine

## External libraries

* [VMWare vSphere](https://github.com/vmware/pyvmomi/blob/master/LICENSE.txt)

## Change Log

* August 30, 2019 - First upload
* September 6, 2019 - Added link to VMWare vSphere external library
* August 17, 2023 (v1.2) - Updated the integration with Environmental Variables
* September 4, 2023 (v1.3) - Fixed a bug where if the timeout was not specified, an error would occur
* September 19, 2023 (v1.4) - Versioning
