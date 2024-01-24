---
title: CylanceProtect
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/cylanceprotect.png)

Version: 1.2  
Updated: Nov 03, 2023

Query CylanceProtect, enrich data and contain threats through devices, zones, policies, global lists and more.

## Actions

* **Get Device** (*Enrichment*) - Get information regarding the specified device
* **List Device Threats** (*Enrichment*) - List threats for the specified device
* **List Devices** (*Enrichment*) - Get a list of devices
* **Get Global List** (*Enrichment*) - Get a global list for the specified list type ID
* **List Policies** (*Enrichment*) - Get a list of policies
* **Get Policy** (*Enrichment*) - Get information regarding the specified policy
* **Get Threat** (*Enrichment*) - Get threat information for the specified SHA256 hash
* **List Threat Devices** (*Notification*) - Get a list of devices the specified threat has been observed on
* **Get Threat Download URL** (*Enrichment*) - Get the download URL for the specified threat
* **List Threats** (*Enrichment*) - Get a list of threats
* **Get Zone** (*Enrichment*) - Get information regarding the specified zone
* **Get Device Zone** (*Enrichment*) - Get zone for the specified Device
* **List Zones** (*Enrichment*) - Get a list of zones
* **Add to Global List** (*Containment*) - Add the specified hash to a global list
* **Delete from Global List** (*Containment*) - Delete the specified hash from a global list
* **Update Device Threat** (*Containment*) - Update a device threat with the specified information

## CylanceProtect Configuration

To retrieve the API Credentials, please refer to the following [guide](https://docs.blackberry.com/en/unified-endpoint-security/blackberry-ues/Cylance-API-user-guide/Application_Management/To_Add_an_Application).

![](/img/platform-services/automation-service/app-central/integrations/cylanceprotect/cylanceprotect-1.png)

![](/img/platform-services/automation-service/app-central/integrations/cylanceprotect/cylanceprotect-2.png)

API URL:

The Auth API will be accessed via the following base endpoint: 

North America: *https://protectapi.cylance.com/*

US Government: *https://protectapi.us.cylance.com/*

All Other Regions: *https://protectapi-{region-code}.cylance.com/*

![](/img/platform-services/automation-service/app-central/integrations/cylanceprotect/cylanceprotect-3.png)

## External Libraries

* [Cylance Protect](https://github.com/jpadilla/pyjwt/blob/master/LICENSE)

## Change Log

* February 6, 2019 - First upload
* September 6, 2019 - Added link to Cylance Protect external library
* November 3, 2023 (v1.2)
	+ Updated the integration with Environmental Variables
	+ Improved error handling
	+ Removed leading/trailing spaces
	+ Code Refactored
	+ The following actions has been renamed
		- Get Device Threats *to* List Device Threats
		- Get Devices *to* List Devices
		- Get Policies *to* List Policies
		- Get Threat Devices *to* List Threat Devices
		- Get Threats *to* List Threats
		- Get Zone Devices *to* Get Device Zone
		- Get Zones *to* List Zones
