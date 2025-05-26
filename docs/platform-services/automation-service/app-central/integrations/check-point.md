---
title: Check Point
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/check-point.png')} alt="check-point" width="100"/>

***Version: 1.4  
Updated: Jun 26, 2023***

Utilize Check Point to gather enrichment data and issue containment actions during incident investigations.

## Actions

* **Domain Information** (*Enrichment*) - Gather domain information.
* **IP Information** (*Enrichment*) - Gather IP information.
* **User Attributes** (*Enrichment*) - Gather user attributes for a specific user account.
* **Show Access rule-base** (*Enrichment*) - Get access rule-base.
* **Show Threat rule-base** (*Enrichment*) - Get threat rule-base.
* **Block IP** (*Containment*) - Block the specified IP address.
* **Unblock IP** (*Containment*) - Unblock the specified IP address.
* **Block Domain** (*Containment*) - Block a specific domain.
* **Unblock Domain** (*Containment*) - Unblock a specific domain.
* **Unlock User** (*Containment*) - Unlock a specific user account.
* **Block Port** (*Containment*) - Block a specific port.
* **Unblock Port** (*Containment*) - Unblock a specific port.
* **Add Rule** (*Containment*) - Add a new rule.
* **Delete Rule** (*Containment*) - Delete an existing rule.
* **Add Threat Rule** (*Containment*) - Add a new threat rule.
* **Delete Threat Rule** (*Containment*) - Delete an existing threat rule.
* **Add Host To Specific Group** (*Containment*) - Add host to a group.
* **Assign Global** (*Containment*) - Assign global policy.
* **Install Policy** (*Containment*) - Install a specific policy.
* **Show Access Rule** *(Enrichment)* - Get access rule.

## Category

Network Security

## Configure Check Point in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/check-point/check-point-configuration.png')} style={{border:'1px solid gray'}} alt="Check-Point configuration" width="400"/>

For information about Check Point, see [Check Point documentation](https://sc1.checkpoint.com/documents/latest/api_reference/index.html).

## Change Log

* February 10, 2020 - First upload
* May 15, 2020 - New Actions added:
	+ Block Port
	+ Add Rule
	+ Delete Rule
	+ Add Threat Rule
	+ Delete Threat Rule
* September 7, 2021- New actions added
	+ Add Host To Specific Group
	+ Assign Global
	+ Install Policy
* November 22, 2022 - Integration refactored
	+ Arg.url changed to arg.server in integration file and actions
	+ Added verify, timeout and proxy\_url
	+ Added REQUIRED as help where needed
	+ Changed type of list to text, where incident\_artifacts: true
* November 30, 2022 - new action Show Access Rule added
* June 23, 2023 (v1.4)
	+ Updated the integration with Environmental Variables
	+ Renamed from Check Point OIF to Check Point
