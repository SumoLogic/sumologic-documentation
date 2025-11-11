---
title: Palo Alto Networks Panorama V2
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/palo-alto-networks-panorama-v2.png')} alt="palo-alto-networks-panorama-v2" width="100"/>

***Version: 2.5  
Updated: May 29, 2024***

Utilize Palo Alto Panorama to list current applications and issue containment actions during incident investigation.

## Actions

* **List Tags** (*Enrichment*) - List all available tags.
* **List Dynamic User Groups** (*Enrichment*) - List all dynamic user groups.
* **List Connected Devices** (*Enrichment*) - List all connected devices.
* **List Firewall User Attributes** (*Enrichment*) - List firewall user attributes.
* **List Application** (*Enrichment*) - Pull a list of current applications and associated ports.
* **List Address** (*Enrichment*) - List an address.
* **List Service** (*Enrichment*) - List a service.
* **Get Policy Rules** (*Enrichment*) - Get policy rules.
* **Get Firewall User Group Members** (*Enrichment*) - Get a list of all members of a firewall user group.
* **Get Address Groups** (*Enrichment*) - Get address groups.
* **Get Service Groups** (*Enrichment*) - Get service groups.
* **Get URL Category** (*Enrichment*) - Get URL categories.
* **Get URL Filter** (*Enrichment*) - Get URL filter.
* **Get Devices** (*Enrichment*) - Get all devices.
* **Create Tag** (*Containment*) - Create a new tag.
* **Create Dynamic User Group** (*Containment*) - Create a new dynamic user group.
* **Create Policy Rule** (*Containment*) - Create a new policy rule.
* **Create Address Group** ( *Containment*) - Create a new address group.
* **Create Address** ( *Containment* ) - Create a new address.
* **Create Service Group** ( *Containment* ) - Create a service group.
* **Create Service** (*Containment* ) - Create a service.
* **Create Tag** (*Containment* ) - Create a tag.
* **Create URL Category** (*Containment* ) - Create a URL category.
* **Create URL Filter** (*Containment* ) - Create URL filter.
* **Commit** (*Containment*) - Commit a change.
* **Delete Address Group** (*Containment* ) - Delete an address group.
* **Delete Address** (*Containment* ) - Delete an address.
* **Delete Policy Rule** (*Containment* ) - Delete a policy rule.
* **Delete Service Group** (*Containment* ) - Delete a service group.
* **Delete Service** (*Containment* ) - Delete a service.
* **Delete URL Category** (*Containment* ) - Delete a URL category.
* **Delete URL Filter** (*Containment* ) - Delete a URL filter.
* **Register Tag For Users** (*Containment*) - Register a tag for users.
* **Unregister Tag For User** (*Containment*) - Unregister a tag for a user.
* **Unregister All Tags For User** (*Containment*) - Unregister all tags for a user.
* **Move Policy Rule** (*Containment*) - Move an existing policy rule.
* **Update Policy Rule** ( *Containment* ) - Update a policy rule.
* **Update URL Category** ( *Containment* ) - Update a URL category.

## Notes

**Dynamic User Groups**

* The following actions must be committed to the firewall:
	+ Create Tag
	+ List Tags
	+ List Devices Group (Device Group - Location)
	+ Create Dynamic User Group (Match/Filter is only based on Tags)
	+ List Dynamic User Groups
	+ Create Policy Rule (Possibility to Add Dynamic User Group as Source User)
	+ Commit
	+ Get Policy Rules
* The following actions will be redirected to Firewall through Panorama, with no need to commit:
	+ List Connected Devices (to get the serial number)
	+ List Firewall User Attributes (List local Firewall users of Active Directory)
	+ Register Tag For Users (include/add any user Dynamically to Dynamic User Groups using a tag)
	+ Get Firewall User Group Members (Get Dynamic User Groups Members of Firewall or any local user group of the Firewall)
	+ Unregister Tag For User (Remove a user from a tag, it means, will remove users from Dynamic User Groups if the tag is already associated with it)
	+ Unregister All Tags For User (remove a user from all the tags and it will be removed from all the Dynamic User Groups)

## External Libraries

* [xmltodict](https://github.com/martinblech/xmltodict)

## Configure Palo Alto Networks Panorama V2 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter the [API URL](https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-panorama-api/get-started-with-the-pan-os-xml-api/explore-the-api/use-the-api-browser) for your instance of Palo Alto Networks Panorama, for example, `https://192.168.0.10`

* **API Key**. Enter an [API key](https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-panorama-api/get-started-with-the-pan-os-xml-api/get-your-api-key#idca192ed7-45df-4992-a0f7-41ebe94fbdac) for Palo Alto Networks Panorama.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/palo-alto-networks-panorama-configuration.png')} style={{border:'1px solid gray'}} alt="Palo Alto Networks Panorama V2 configuration" width="400"/>

For information about Palo Alto Networks Panorama, see [Palo Alto Networks Panorama documentation](https://docs.paloaltonetworks.com/panorama).

## Change Log

* January 14, 2020 - First upload
* May 22, 2020 - Added support for Dynamic User Groups
* July 21, 2023 (v2.2) - Updated the integration with Environmental Variables
* September 4, 2023 (v2.3) - Fixed a bug where if the timeout was not specified, an error would occur
* September 19, 2023 (v2.4) - Versioning
* May 29, 2024 (v2.5) - Docker updated
