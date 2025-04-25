---
title: Active Directory
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/active-directory.png')} alt="active-directory" width="100"/>

**Version: 1.3  
Updated: Dec 19, 2023**

Utilize user, group, and system information from Microsoft Active Directory.

## Actions

* **System Attributes** (*Enrichment*) - Gather system attributes.
* **User Attributes** (*Enrichment*) - Gather user attributes.
* **Group Attributes** (*Enrichment*) - Gather group attributes.
* **Users Groups** (*Enrichment*) - Gather user's groups.
* **Create User** (*Containment) - Create a new user.
* **Reset Password** (*Containment*) - Reset a user's password.
* **Set Password** (*Containment*) - Set a new password.
* **Set System Attributes** (*Containment*) - Set a system's attribute.
* **Set User Attributes** (*Containment)*- Set a user's attributes.
* **Change System OU** (*Containment*) - Change a system's organizational unit (OU).
* **Enable User** (*Containment*) - Enable a user account.
* **Disable User** (*Containment*) - Disable a user's account.
* **Remove Users From Groups** (*Containment*) - Remove users from AD group.
* **Get Groups Members** (*Containment*) - retrieve users from AD group.
* **Add Users To Groups** (*Containment*) - Add a user to a group.
* **User Attributes V2** *(Enrichment)* - Gather user attributes v2.

## External Libraries

* [LDAP3](https://github.com/cannatag/ldap3/blob/master/LICENSE.txt)

## Configure Active Directory in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* December 19, 2019 - First upload
* November 9, 2020 - Added new actions
* October 27, 2021 - Added new actions
* June 07, 2022- Updated action:
	+ User Attributes V2 (updated the output)
* July 7, 2023 (v1.2)
	+ Integration renamed from Active Directory OIF to Active Directory
	+ Updated the integration with Environmental Variables
* December 19, 2023 (v1.3)
	+ Updated action: User Attributes V2
		- Now, with the User Attributes V2 Action, users can be filtered based on their distinguishedName (DN)
