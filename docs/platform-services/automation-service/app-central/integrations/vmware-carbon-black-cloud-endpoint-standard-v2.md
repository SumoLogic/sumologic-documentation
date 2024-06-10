---
title: VMware Carbon Black Cloud Endpoint Standard V2
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/vmware-carbon-black-cloud-endpoint-standard-v2.png')} alt="vmware-carbon-black-cloud-endpoint-standard-v2" width="70"/>

***Version: 2.2  
Updated: Mar 4, 2024***

VMware Carbon Black Cloud Endpoint Standard Integration allows security operators to collect information and take action on remote endpoints in real-time using API V6.

## Actions

* **Carbon Black Cloud Alerts Daemon** (*Daemon*) - Daemon to automatically gather alerts.
* **Delete File** (*Containment*) - Delete a File from a device.
* **Get Alert** (*Enrichment*) - Get a specific Alert.
* **Get Device** (*Enrichment*) - Retrieve info about a device.
* **Get Device Quarantine Status** (*Enrichment*) - Get a specific Device Quarantine Status.
* **Get Device Vulnerability** (*Enrichment*) - Get a specific Device Vulnerability.
* **Get Group Alerts** (*Enrichment*) - Get a specific Group of Alerts.
* **Quarantine** (*Containment*) - Quarantine the specified device within Carbon Black Cloud.
* **Search Process** (*Enrichment* ) - Queries all events using input search criteria and returns a list of processes.
* **Terminate Process** (*Containment*) - Terminate process on a device.

## Change Log

* February 3, 2022 - First upload
* July 11, 2023 (v2.1) - Updated the integration with Environmental Variables
* March 4, 2024 (v2.2) - Updated code for compatibility with Python 3.12
